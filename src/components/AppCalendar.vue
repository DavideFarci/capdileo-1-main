<script>
const { log } = console;
import { state } from "../state";
import axios from "axios";
import { monthConvert, numberInCalendar } from "../utilities/functions";
import { validateReservation } from "../assets/validations/val_prenotaServizio";
import { order_validations } from "../assets/validations/val_conferma";
import AppMessageOverlay from "./AppMessageOverlay.vue";
import AppLoader from "./AppLoader.vue";
export default {
  components: { AppMessageOverlay, AppLoader },
  props: {
    formValues: {
      type: Object,
      required: true,
    },
    inputs: {
      type: Array,
      required: true,
    },
    reservation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      state,
      currentDate: "",
      calendar: {}, // calendar = {"Gennaio" : [{objDate} ...]}, {"Febbraio" : [{objDate} ...]}, ... }
      dayTimes: [], // Fasce orarie per il giorno selezionato
      dateId: null, // ID della data scelta
      seats: "Seleziona un orario per vedere le disponibilità", // usato sia per i posti che per i pezzi
      isValid: [],
      firstDayOfMonth: 1, // Giorno della settimana con cui inizia il mese selez.
      daysWeek: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
      success: true,
      loader: false,
      loaderSeat: false,
      message: false,
    };
  },
  methods: {
    // Chiamata API
    async getDates() {
      const dates = await axios.get(state.baseUrl + "api/dates");
      this.currentDate = dates.data.data_e_ora_attuali;
      this.calendar = this.getCalendar(dates.data.results);
      this.initialDates = dates.data.results;
    },

    // Elaborare i dati in arrivo e formattarli in un calendario (obj)
    getCalendar(arrDates) {
      const _status = this.reservation ? 1 : 2;

      arrDates = arrDates.filter((day) => day.status !== _status);

      // Sostituisco i numeri con i nomi dei mesi
      for (let i = 0; i < arrDates.length; i++) {
        arrDates[i].month = monthConvert(arrDates[i].month);
      }

      const arrMonths = {};

      arrDates.forEach((obj) => {
        const month = obj.month;

        if (!arrMonths[month]) {
          arrMonths[month] = [];
        }

        arrMonths[month].push(obj);
      });

      return arrMonths;
    },

    async getRequest() {
      this.errorValidation = "";
      this.isValid = this.reservation
        ? validateReservation(this.formValues)
        : order_validations(this.formValues, this.errorValidation);

      if (this.isValid.length !== 0) {
        return;
      }
      this.message = true;
      this.loader = true;

      // Compongo la data intera con orario (formato dd/mm/yyyy hh:mm)
      const time_slot = `${numberInCalendar(
        this.formValues.giorno
      )}/${numberInCalendar(monthConvert(this.formValues.mese))}/${
        this.formValues.anno
      } ${this.formValues.orario}`;

      await this.findIdRequest();
      try {
        const _reservation = {
          name: this.formValues.nome,
          phone: this.formValues.telefono,
          email: this.formValues.email,
          n_person: this.formValues.n_persone,
          message: this.formValues.messaggio,
          date_slot: time_slot,
          date_id: this.dateId,
          privacy: this.formValues.privacy,
        };
        
        const _order = {
          name: this.formValues.nome,
          phone: this.formValues.telefono,
          email: this.formValues.email,
          message: this.formValues.messaggio,
          products: this.state.getServeCart(),
          date_slot: time_slot,
          date_id: this.dateId,
          privacy: this.formValues.privacy,
          totPrice: this.state.totCart,
        };

        // SE AVVIENE UNA PRENOTAZIONE TAVOLO
        if (this.reservation) {
          const data = await axios.post(
            state.baseUrl + "api/reservations",
            _reservation
          );
          this.loader = false;
          this.success && (this.formValues.n_persone = "");

          // SE AVVIENE UN ORDINE D'ASPORTO
        } else {
          const data = await axios.post(state.baseUrl + "api/orders", _order);
          this.loader = false;
          localStorage.clear();
          setTimeout(() => {
            this.$router.replace("/prenota");
          }, 2000);
        }

        if (this.success) {
          this.formValues.anno = "";
          this.formValues.mese = this.getFirstMonthAndYearValues();
          this.formValues.giorno = "";
          this.formValues.orario = "";
          this.formValues.nome = "";
          this.formValues.email = "";
          this.formValues.telefono = "";
          this.formValues.messaggio = "";
          this.formValues.privacy = false;
          this.state.arrCart = [];
          this.state.totCart = 0;
        }
      } catch (data) {
        if ((data.code = "ERR_NETWORK")) {
          this.loader = false;
          this.success = false;
          return;
        }
        if (data.status !== 200) {
          this.loader = false;
          this.success = false;
        }
      }
    },

    // estraggo l'id della data scelta dall'utente per fare la richiesta e sapere i posti disponibili
    async findIdRequest() {
      this.loaderSeat = true;
      const mese = monthConvert(this.formValues.mese);
      const params = {
        year: this.formValues.anno,
        month: mese,
        day: +this.formValues.giorno,
        time: this.formValues.orario,
      };
      try {
        const data = await axios.get(state.baseUrl + "api/dates/findDate", {
          params,
        });
        this.loaderSeat = false;
        if (this.reservation) {
          const { id, reserved, max_res } = data.data.results[0];
          this.dateId = id;
          // Imposto il num di posti disponibili per l'orario scelto
          this.seats = max_res - reserved;
        } else {
          const { id, reserved_pz, max_pz } = data.data.results[0];
          this.dateId = id;
          // Imposto il num di pezzi disponibili per l'orario scelto
          this.seats = max_pz - reserved_pz;
        }
      } catch (data) {
        if (data.code == "ERR_NETWORK") {
          this.loader = false;
          this.success = false;
          return;
        }
        if (!data.data.success) {
          this.loader = false;
          this.success = false;
        }
      }
    },

    // Raggruppare per giorno e estrarre fasce orarie, giorno sett e visibilità giornaliera, per i singoli giorni
    groupByDay(month) {
      const grouped = {};
      month.forEach((item) => {
        if (!grouped[item.day]) {
          // Se non esiste la chiave day, crea un array
          grouped[item.day] = {
            times: [],
            day_w: "",
            day_visible: true,
          };
        }
        // Aggiungi l'orario e il giorno della settimana all'array
        grouped[item.day].times.push({
          time: item.time,
          visible: item.visible,
        });
        grouped[item.day].day_w = item.day_w;
      });

      for (const key in grouped) {
        const el = grouped[key];
        let _day_visible = true;

        for (let z = 0; z < el.times.length; z++) {
          const element = el.times[z];
          if (!element.visible) {
            _day_visible = false;
            break; // Se uno degli elementi è visibile, non c'è bisogno di controllare gli altri
          }
        }

        el.day_visible = _day_visible;
      }

      return grouped;
    },

    // Settare la var. globale = fasce orarie del giorno selezionato
    getTimes(day, arrTimes) {
      //reset
      this.dayTimes = [];

      this.formValues.giorno = day;

      arrTimes.forEach((item) => {
        this.dayTimes.push(item);
      });
    },

    // settare mese e anno per la prenotazione (per evitare problemi se siamo a fine anno)
    setMonthAndYear(month, monthIndex) {
      const { year } = month;
      this.formValues.anno = year;
      this.formValues.mese = monthIndex;
    },

    getFirstMonthAndYearValues() {
      const arrMonthsNames = Object.keys(this.calendar);
      this.formValues.mese = arrMonthsNames[0];
      // Imposto anche l'anno di formValues a quello corrente
      const currentDate = new Date();
      this.formValues.anno = currentDate.getFullYear();
      return arrMonthsNames[0];
    },

    getSeats(time) {
      this.formValues.orario = time;
      this.findIdRequest();
    },

    // Far partire il primo giorno del mese dalla colonna del giorno corretto
    getColumnStart(month) {
      // Prendo il giorno della settimana con il quale il mese inizia
      const firstDayOfWeek = month[0].day_w;
      const gridColumnStart = firstDayOfWeek;

      return gridColumnStart;
    },

    handleInputValue(e, name) {
      const value = e.target.value;
      this.formValues[name] = value;
    },

    toggleMessage() {
      this.loader = false;
      this.message = false;
    },
  },
  async created() {
    await this.getDates();
    this.getFirstMonthAndYearValues();
  },
  watch: {
    "formValues.mese": function () {
      this.firstDayOfMonth = this.calendar[this.formValues.mese][0].day_w;
      this.dayTimes = [];
      if (this.formValues.giorno) {
        this.formValues.giorno = "";
      }
      this.seats = "Seleziona un orario per vedere le disponibilità";
    },

    "formValues.giorno": function () {
      this.seats = "Seleziona un orario per vedere le disponibilità";
      if (this.formValues.orario) {
        this.formValues.orario = "";
      }
    },
  },
};
</script>

<template>
  <h1>{{ reservation ? "Prenota il tuo tavolo" : `Procedi all'ordine` }}</h1>
  <div class="container_servizio">
    <section class="month-container">
      <h2>Seleziona il mese</h2>
      <div class="months">
        <div
          v-for="(month, monthIndex) in calendar"
          :key="monthIndex"
          :class="{
            month_name: true,
            active: monthIndex === formValues.mese,
          }"
          @click="setMonthAndYear(month[0], monthIndex)"
        >
          {{ monthIndex }}
        </div>
      </div>
    </section>

    <section class="calendar_container">
      <h2>Seleziona il giorno</h2>

      <div class="calendar">
        <!-- Giorni della settimana  -->
        <div class="days_w">
          <div v-for="(day_week, i) in daysWeek" :key="i" class="day_w">
            {{ day_week }}
          </div>
        </div>
        <template v-for="(month, monthIndex) in calendar" :key="monthIndex">
          <Transition name="calendar">
            <!-- Vero e proprio calendario del mese  -->

            <div class="day_grid" v-if="formValues.mese == monthIndex">
              <div
                v-for="(day, dayIndex) in groupByDay(month)"
                :key="dayIndex"
                @click="getTimes(dayIndex, day.times)"
                :class="{
                  day: true,
                  active: !day.day_visible || dayIndex === formValues.giorno,
                }"
                :style="{
                  gridColumnStart: day.day_w,
                }"
              >
                <div>{{ dayIndex }}</div>
              </div>
            </div>
          </Transition>
        </template>
      </div>
    </section>

    <section class="orari-fasce">
      <h2>Seleziona la fascia oraria</h2>

      <div
        :class="{
          time_container: true,
          visible: dayTimes.length !== 0,
        }"
      >
        <template v-for="(time, i) in dayTimes">
          <div
            v-if="time.visible"
            :key="i"
            @click="getSeats(time.time)"
            :class="{
              time: true,
              active: time.time === formValues.orario,
            }"
          >
            {{ time.time }}
          </div>
        </template>
      </div>
      <div
        v-if="!loaderSeat"
        :class="{
          seats: seats > 3,
          last_seats: seats <= 3,
        }"
      >
        {{ seats }}
        <span
          v-if="formValues.orario"
          :class="{
            seats: seats > 3,
            last_seats: seats <= 3,
          }"
        >
          {{ reservation ? "posti disponibili" : "pezzi disponibili" }}
        </span>
      </div>
      <app-loader v-else :show="loaderSeat" />
    </section>

    <form class="dati-cliente">
      <h2>Inserisci i tuoi dati</h2>
      <!-- Nome  -->
      <template v-for="(input, i) in inputs" :key="i">
        <label :for="input.name">{{ input.label }}</label>
        <input
          v-if="input.name !== `messaggio`"
          :name="input.name"
          :type="input.type"
          :id="input.name"
          :value="formValues[input.name]"
          @input="(e) => handleInputValue(e, input.name)"
        />
        <textarea
          v-else
          :name="input.name"
          :id="input.name"
          :value="formValues[input.name]"
          @input="(e) => handleInputValue(e, input.name)"
          cols="30"
          rows="10"
        >
        </textarea>
      </template>
      <div class="privacy">

        <div :class="formValues.privacy ? 'my-check-on' : 'my-check'" @click="formValues.privacy = !formValues.privacy" name="privacy">
          <div class="int"></div>
        </div>
        <span @click="formValues.privacy = !formValues.privacy" for="privacy"
          >Ho letto e accetto la politica sulla privacy ai sensi del Regolamento
          EU n. 679/2016</span
        >
      </div>

      <div>I campi contrassegnati con * sono obbligatori</div>
    </form>

    <section class="riepilogo">
      <h2>{{ reservation ? "La tua prenotazione" : `Il tuo ordine` }}</h2>
      <ul class="reservation">
        <li>
          <ul class="reservation_date">
            <li>{{ formValues.giorno }}</li>
            <li>{{ formValues.mese }}</li>
            <li>{{ formValues.orario }}</li>
          </ul>
        </li>
        <li>
          <span class="reservation_label">Nome: </span>{{ formValues?.nome }}
        </li>
        <li>
          <span class="reservation_label">Telefono: </span
          >{{ formValues?.telefono }}
        </li>
        <li>
          <span class="reservation_label">Email: </span>{{ formValues?.email }}
        </li>
        <li v-if="reservation">
          <span class="reservation_label">N° di persone: </span
          >{{ formValues?.n_persone }}
        </li>
        <li>
          <span class="reservation_label">Messaggio: </span
          >{{ formValues?.messaggio }}
        </li>
      </ul>
    </section>

    <div v-for="(valid, i) in isValid" :key="i" class="error">{{ valid }}</div>

    <button class="toReserv btn" @click="getRequest">Prenota</button>

    <app-message-overlay
      v-if="message"
      :booleans="{
        reservation: reservation,
        show: message,
        loader: loader,
        success: success,
      }"
      @toggle_message="toggleMessage"
    />
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

h1 {
  margin: 1rem;
  font-size: clamp(1.9rem, 6vw, 2.5rem);
}
.container_servizio {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  width: 90%;
  margin: 0 auto;

  section,
  form {
    background-color: $c-nav;
    padding: 2rem;
    h2 {
      text-transform: uppercase;
    }
  }

  .month-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .months {
      @include dfc;
      width: 100%;
      justify-content: space-between;
      .month_name {
        text-transform: uppercase;
        padding: 1rem 2rem;
        flex: 1 1 auto;
        border: solid 2px white;
        text-align: center;
      }
      .active {
        background-color: $c-footer-nav;
      }
    }
  }

  .calendar_container {
    .calendar {
      .days_w {
        display: grid;
        grid-template-columns: repeat(7, 1fr);

        .day_w {
          font-size: clamp(10px, 2vw, 20px);
          font-weight: lighter;
          padding: 1rem 0.2rem;
          border: solid 1px white;
          text-align: center;
          background-color: rgb(48, 6, 6);
        }
      }
      .day_grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        .day {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: clamp(12px, 2vw, 20px);
          padding: 1rem 0.2rem;
          border: solid 1px white;
        }
        .active {
          background-color: $c-footer-nav;
        }
      }
    }
  }

  .orari-fasce {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .time_container {
      @include dfc;
      width: 100%;
      justify-content: space-between;
      flex-wrap: wrap;
      opacity: 0;
      &.visible {
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
      }
      .time {
        text-transform: uppercase;
        padding: 1rem 2rem;
        flex: 1 1 auto;
        border: solid 2px white;
        text-align: center;
      }
      .active {
        background-color: $c-footer-nav;
      }
    }
  }

  .dati-cliente {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    label {
      margin-top: 1rem;
      text-transform: uppercase;
    }
    input {
      height: 3rem;
    }
    input,
    textarea {
      font-size: 1.4rem;
      background-color: $c-nav;
      border: 3px solid white;
      border-radius: 10px;
      padding: 10px;
    }
  }

  .riepilogo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.reservation {
  border: 1px solid white;
  padding: 1rem;
  border-radius: 15px;
  font-size: 1.5rem;
  li{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .reservation_date {
    width: 90%;
    margin: 0 auto;
    font-size: clamp(14px, 4vw, 20px);
    @include dfc;

    justify-content: space-between;
    gap: 0.2rem;
    padding: 0.7rem 2rem;
    margin-bottom: 1rem;
    border: 1px solid white;
    border-radius: 5px;
  }
  .reservation_label {
    color: rgb(172, 172, 172);
    margin-right: 1rem;
  }
}

.error {
  color: rgb(243, 59, 59);
  font-weight: 500;
}

.seats {
  color: green;
}

.last_seats {
  color: red;
}

.calendar-enter-active {
  transition: opacity 0.5s ease-in-out;
  transition-delay: 0.1s;
}

.calendar-enter-from,
.calendar-leave-from {
  opacity: 0;
}
.privacy{
display: flex;
align-content: center;
gap: 10px;
.my-check-on{
  aspect-ratio: 1;
  height: 20px;
  width: 20px;
  border: 2px solid white;
  border-radius: 4px;
  padding: 3px;
  .int{
    height: 100%;
    width: 100%;
    background-color: white;
  }
}
.my-check{
    aspect-ratio: 1;
    height: 20px;
    width: 20px;
    border: 2px solid white;
    border-radius: 4px;
  }
}
// .orari-enter-active,
// .orari-leave-active {
//   transition: opacity 0.5s ease-in-out;
//   transition-delay: 0.4s;
// }

// .orari-enter-from,
// .orari-leave-from {
//   opacity: 0;
// }

@media (max-width: $bp2) {
  .months {
    flex-direction: column !important;
    width: 100%;
    .month_name {
      width: 100%;
    }
  }
  .time_container{
    flex-direction: column !important;
    .time{
      width: 100%;
    }
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  /* -webkit-background-clip: text; */
  -webkit-text-fill-color: #ffffff;
  transition: background-color 5000s ease-in-out 0s;
  box-shadow: inset 0 0 20px 20px #23232329;
}
</style>
