<script>
const { log } = console;
import { state } from "../state";
import axios from "axios";
import { monthConvert, numberInCalendar } from "../utilities/functions";
export default {
  props: {
    formValues: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: true,
    },
    reservation: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      currentDate: "",
      calendar: {}, // calendar = {"Gennaio" : [{..} ...]}, {"Febbraio" : [{..} ...]}, ... }
      dayTimes: [], // Fasce orarie per il giorno selezionato
      dateId: null, // ID della data scelta
      seats: "Seleziona un oraio per vedere le disponibilità", // viene usato sia per i posti che per i pezzi quindi bisogna cambiare nome
      isValid: false,
      firstDayOfMonth: 1, // Giorno della settimana con cui inizia il mese selez.
      daysWeek: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
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

    async getReservationRequest() {
      this.errors = {
        nameError: "",
        phoneError: "",
        npersonError: "",
        messageError: "",
        dateError: "",
      };

      // Compongo la data intera con orario (formato dd/mm/yyyy hh:mm)
      const time_slot = `${numberInCalendar(
        this.formValues.giorno
      )}/${numberInCalendar(monthConvert(this.formValues.mese))}/${
        this.formValues.anno
      } ${this.formValues.orario}`;

      this.isValid = validateReservation(this.formValues, this.errors);

      if (this.isValid) {
        try {
          await this.findIdRequest();
          const reservation = {
            name: this.formValues.nome,
            phone: this.formValues.telefono,
            n_person: this.formValues.n_persone,
            message: this.formValues.messaggio,
            date_slot: time_slot,
            date_id: this.dateId,
          };

          // PARLARE CON CRISTIAN DEI DATI DEL FORM

          await axios.post(state.baseUrl + "api/reservations", reservation);
        } catch (error) {
          log(
            "Errore durante la richiesta di prenotazione, messaggio: " +
              error.message
          );
        }
      }
    },

    // estraggo l'id della data scelta dall'utente per fare la richiesta e sapere i posti disponibili
    async findIdRequest() {
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
      } catch (error) {
        log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
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
      this.seats = "Seleziona un oraio per vedere le disponibilità";
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
  },
  async created() {
    await this.getDates();
    this.getFirstMonthAndYearValues();
    // log(this.formValues, this.errors, this.reservation);
  },
  watch: {
    "formValues.mese": function () {
      this.firstDayOfMonth = this.calendar[this.formValues.mese][0].day_w;
      this.dayTimes = [];
      this.seats = "Seleziona un oraio per vedere le disponibilità";
      if (this.formValues.giorno) {
        this.formValues.giorno = "";
      }
    },

    "formValues.giorno": function () {
      this.seats = "Seleziona un oraio per vedere le disponibilità";
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
          <Transition>
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
                  gridColumnStart:
                    day.day_w === firstDayOfMonth
                      ? getColumnStart(month)
                      : 'auto',
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

      <Transition>
        <div v-if="dayTimes" class="time_container">
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
      </Transition>
      <div
        v-if="seats"
        :class="{
          seats: seats > 3,
          last_seats: seats <= 3,
        }"
      >
        {{ seats }} {{ reservation ? "posti" : "pezzi" }} disponibili
      </div>

      <div v-if="errors.dateError" class="error">
        {{ errors.dateError }}
      </div>
    </section>

    <form class="dati-cliente">
      <h2>inserisci i tuoi9 dati</h2>
      <!-- Nome  -->
      <label for="nome">Nome</label>
      <span v-if="errors.nameError" class="error">{{ errors.nameError }}</span>
      <input type="text" id="nome" v-model="formValues.nome" />

      <!-- mail  -->
      <label for="mail">mail</label>
      <span v-if="errors.mailError" class="error">{{ errors.mailError }}</span>
      <input type="mail" id="mail" v-model="formValues.mail" />

      <!-- Telefono  -->
      <label for="telefono">Telefono</label>
      <span v-if="errors.phoneError" class="error">{{
        errors.phoneError
      }}</span>
      <input type="text" id="telefono" v-model="formValues.telefono" />

      <!-- N° di persone  -->
      <label for="n_persone">N° di persone</label>
      <span v-if="errors.npersonError" class="error">{{
        errors.npersonError
      }}</span>
      <input type="number" id="n_persone" v-model="formValues.n_persone" />

      <!-- Messaggio -->
      <label for="messaggio">Messaggio</label>
      <span v-if="errors.messageError" class="error">{{
        errors.messageError
      }}</span>
      <textarea
        cols="10"
        rows="10"
        id="messaggio"
        v-model="formValues.messaggio"
      ></textarea>
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
          <span class="reservation_label">N° di persone: </span
          >{{ formValues?.n_persone }}
        </li>
        <li>
          <span class="reservation_label">Messaggio: </span
          >{{ formValues?.messaggio }}
        </li>
      </ul>
    </section>

    <button class="toReserv btn" @click="getReservationRequest">Prenota</button>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

h1 {
  margin: 1rem;
  font-size: clamp(1.9rem, 6vw, 2.5rem);
}
.container_servizio {
  padding: 3rem 0;
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
          padding: 1rem;
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
          padding: 1rem;
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
      padding: 10px;
      font-size: 1.4rem;
    }
    input,
    textarea {
      background-color: $c-nav;
      border: 3px solid white;
      border-radius: 10px;
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
  padding: 1.5rem;
  border-radius: 15px;
  font-size: 1.5rem;
  .reservation_date {
    width: 80%;
    margin: 0 auto;
    @include dfc;
    justify-content: space-between;
    padding: 0.7rem 2.5rem;
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
</style>
