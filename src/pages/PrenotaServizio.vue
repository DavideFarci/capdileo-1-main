<!-- FIXARE IL PROBLEMA DELL'ANNO  -->

<script>
const { log } = console;
import { state } from "../state";
import axios from "axios";
import sh from "../components/SHeader.vue";
export default {
  components: { sh },
  data() {
    return {
      currentDate: "",
      calendar: {},
      reservationValues: {
        anno: "",
        mese: "",
        giorno: "",
        orario: "",
        nome: "",
        telefono: "",
        n_persone: "",
        messaggio: "",
      },
      dayTimes: [], // Fasce orarie per il giorno selezionato
      dateId: null, // id della data scelta
      firstDayOfMonth: 1,
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

    // Elaborare i dati in arrivo e formattarli in un calendario
    getCalendar(arrDates) {
      // Sostituisco i numeri con i nomi dei mesi
      for (let i = 0; i < arrDates.length; i++) {
        switch (arrDates[i].month) {
          case 1:
            arrDates[i].month = "Gennaio";
            break;
          case 2:
            arrDates[i].month = "Febbraio";
            break;
          case 3:
            arrDates[i].month = "Marzo";
            break;
          case 4:
            arrDates[i].month = "Aprile";
            break;
          case 5:
            arrDates[i].month = "Maggio";
            break;
          case 6:
            arrDates[i].month = "Giugno";
            break;
          case 7:
            arrDates[i].month = "Luglio";
            break;
          case 8:
            arrDates[i].month = "Agosto";
            break;
          case 9:
            arrDates[i].month = "Settembre";
            break;
          case 10:
            arrDates[i].month = "Ottobre";
            break;
          case 11:
            arrDates[i].month = "Novembre";
            break;
          case 12:
            arrDates[i].month = "Dicembre";
            break;
        }
      }

      const arrMonths = {};

      // Itero sugli oggetti nell'array
      arrDates.forEach((obj) => {
        // Ottengo il valore dell'attributo 'month'
        const month = obj.month;

        // Se l'array per il mese non esiste, lo creo
        if (!arrMonths[month]) {
          arrMonths[month] = [];
        }

        arrMonths[month].push(obj);
      });

      // Convertire l'oggetto in un array di oggetti
      const _calendar = Object.entries(arrMonths).map(([month, objects]) => ({
        [month]: objects,
      }));

      // Ordinare l'array finale in base all'ordine dei mesi
      const orderedMonths = [
        "Gennaio",
        "Febbraio",
        "Marzo",
        "Aprile",
        "Maggio",
        "Giugno",
        "Luglio",
        "Agosto",
        "Settembre",
        "Ottobre",
        "Novembre",
        "Dicembre",
      ];
      _calendar.sort((a, b) => {
        const monthA = Object.keys(a)[0];
        const monthB = Object.keys(b)[0];
        return orderedMonths.indexOf(monthA) - orderedMonths.indexOf(monthB);
      });

      // Creazione dell'array finale In cui ogni elemento ha come chiave il nome del mese e come valore l'array di oggetti corrispondenti a quel mese
      const calendar = _calendar.reduce((acc, obj) => {
        const monthName = Object.keys(obj)[0];
        acc[monthName] = obj[monthName];
        return acc;
      }, {});

      return calendar;
    },

    async getReservationRequest() {
      try {
        await this.findIdRequest();
        const reservation = {
          name: this.reservationValues.nome,
          phone: this.reservationValues.telefono,
          n_person: this.reservationValues.n_persone,
          message: this.reservationValues.messaggio,
          date_id: this.dateId,
        };
        const response = await axios.post(
          state.baseUrl + "api/reservations",
          reservation
        );
      } catch (error) {
        log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
      }
    },

    // estraggo l'id della data scelta per fare la richiesta
    async findIdRequest() {
      const mese = this.monthNamesInNumber();
      try {
        const data = await axios.get(state.baseUrl + "api/dates/findDate", {
          params: {
            year: this.reservationValues.anno,
            month: mese,
            day: +this.reservationValues.giorno,
            time: this.reservationValues.orario,
          },
        });
        const { id } = data.data.results[0];

        this.dateId = id;
      } catch (error) {
        log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
      }
    },

    // Raggruppare per giorno e estrarre le fasce orarie per singoli giorni
    groupByDay(month) {
      // Creare un oggetto per raggruppare per day
      const grouped = {};
      month.forEach((item) => {
        if (!grouped[item.day]) {
          // Se non esiste la chiave day, crea un array
          grouped[item.day] = { times: [], day_w: "" };
        }
        // Aggiungi l'orario e il giorno della settimana all'array
        grouped[item.day].times.push(item.time);
        grouped[item.day].day_w = item.day_w;
      });

      return grouped;
    },

    // Settare la var. globale = fasce orarie del giorno selezionato
    getTimes(day, arrTimes) {
      this.dayTimes = [];
      this.reservationValues.giorno = day;
      arrTimes.forEach((item) => {
        this.dayTimes.push(item);
      });
    },

    // settare mese e anno per la prenotazione (per evitare problemi se siamo a fine anno)
    setMonthAndYear(month, monthIndex) {
      // Dal primo elemento del mese selezionato estraggo il valore dell'anno
      const { year } = month;
      this.reservationValues.anno = year;
      this.reservationValues.mese = monthIndex;
    },

    getFirstMonthAndYearValue() {
      const arrMonthsNames = Object.keys(this.calendar);
      this.reservationValues.mese = arrMonthsNames[0];
      // Imposto anche l'anno di reservationValues a quello corrente
      const year = new Date();
      this.reservationValues.anno = year.getFullYear();
      return arrMonthsNames[0];
    },

    // Far partire il primo giorno del mese dalla colonna del giorno corretto
    getColumnStart(month) {
      // Prendo il giorno della settimana con il quale il mese inizia
      const firstDayOfWeek = month[0].day_w;

      this.firstDayOfMonth = firstDayOfWeek;
      const gridColumnStart = this.firstDayOfMonth;

      return gridColumnStart;
    },

    // Converte mesi in numeri
    monthNamesInNumber() {
      let mese = this.reservationValues.mese;
      switch (mese) {
        case "Gennaio":
          mese = 1;
          break;
        case "Febbraio":
          mese = 2;
          break;
        case "Marzo":
          mese = 3;
          break;
        case "Aprile":
          mese = 4;
          break;
        case "Maggio":
          mese = 5;
          break;
        case "Giugno":
          mese = 6;
          break;
        case "Luglio":
          mese = 7;
          break;
        case "Agosto":
          mese = 8;
          break;
        case "Settembre":
          mese = 9;
          break;
        case "Ottobre":
          mese = 10;
          break;
        case "Novembre":
          mese = 11;
          break;
        case "Dicembre":
          mese = 12;
          break;
      }

      return mese;
    },
  },
  async created() {
    await this.getDates();
    this.getFirstMonthAndYearValue();
  },
  watch: {
    "reservationValues.mese": function () {
      if (this.reservationValues.giorno) {
        this.reservationValues.giorno = "";
      }
    },

    "reservationValues.giorno": function () {
      if (this.reservationValues.orario) {
        this.reservationValues.orario = "";
      }
    },
  },
};
</script>

<template>
  <div class="menu">
    <sh />
    <div class="top-menu">
      <h1>Prenota il tuo tavolo</h1>
      <div class="calendar_container">
        <!-- Elenco dei mesi  -->
        <div class="month">
          <h2>Seleziona il mese</h2>
          <h3
            v-for="(month, monthIndex) in calendar"
            :key="monthIndex"
            :class="{
              month_name: true,
              active: monthIndex === reservationValues.mese,
            }"
            @click="setMonthAndYear(month[0], monthIndex)"
          >
            {{ monthIndex }}
          </h3>
        </div>

        <!-- Calendario del mese selezionato -->
        <div class="month_calendar_container">
          <h2>Seleziona il giorno</h2>

          <div class="month_calendar">
            <!-- Giorni della settimana  -->
            <div class="days_w">
              <div v-for="(day_week, i) in daysWeek" :key="i" class="day_w">
                {{ day_week }}
              </div>
            </div>
            <div class="position">
              <template
                v-for="(month, monthIndex) in calendar"
                :key="monthIndex"
              >
                <Transition>
                  <!-- Vero e proprio calendario del mese  -->
                  <div
                    class="month_grid"
                    v-if="reservationValues.mese == monthIndex"
                  >
                    <div
                      v-for="(day, dayIndex) in groupByDay(month)"
                      :key="dayIndex"
                      @click="getTimes(dayIndex, day.times)"
                      :class="{
                        item: true,
                        active: dayIndex === reservationValues.giorno,
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
          </div>
        </div>
      </div>
      <!-- Fasce orarie -->
      <ul>
        <li>
          <h2>Seleziona la fascia oraria</h2>
        </li>
        <Transition>
          <div v-if="dayTimes" class="time_container">
            <li
              v-for="(time, i) in dayTimes"
              :key="i"
              @click="() => (this.reservationValues.orario = time)"
              :class="{
                time: true,
                active: time === reservationValues.orario,
              }"
            >
              {{ time }}
            </li>
          </div>
        </Transition>
      </ul>

      <!-- Form  -->
      <form>
        <!-- Nome  -->
        <label for="nome">Nome</label>
        <input type="text" id="nome" v-model="reservationValues.nome" />

        <!-- Telefono  -->
        <label for="telefono">Telefono</label>
        <input type="text" id="telefono" v-model="reservationValues.telefono" />

        <!-- N° di persone  -->
        <label for="n_persone">N° di persone</label>
        <input
          type="text"
          id="n_persone"
          v-model="reservationValues.n_persone"
        />

        <!-- Messaggio -->
        <label for="messaggio">Messaggio</label>
        <input
          type="text"
          id="messaggio"
          v-model="reservationValues.messaggio"
        />
      </form>

      <!-- Riassunto prenotazione  -->
      <div>
        <h2>La tua prenotazione</h2>
        <ul class="reservation">
          <li>
            <ul class="reservation_date">
              <li>{{ reservationValues.giorno }}</li>
              <li>{{ reservationValues.mese }}</li>
              <li>{{ reservationValues.orario }}</li>
            </ul>
          </li>
          <li>
            <span class="reservation_label">Nome: </span
            >{{ reservationValues?.nome }}
          </li>
          <li>
            <span class="reservation_label">Telefono: </span
            >{{ reservationValues?.telefono }}
          </li>
          <li>
            <span class="reservation_label">N° di persone: </span
            >{{ reservationValues?.n_persone }}
          </li>
          <li>
            <span class="reservation_label">Messaggio: </span
            >{{ reservationValues?.messaggio }}
          </li>
        </ul>
      </div>

      <button class="toReserve" @click="getReservationRequest">Prenota</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

h2 {
  margin-bottom: 1rem;
}

.calendar_container {
  display: flex;
  gap: 2rem;
  .month {
    padding-bottom: 10rem;
    .month_name {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 4px 8px;
      margin-bottom: 0.5rem;
      border: 1px solid white;
      border-radius: 10px;
    }
  }
}

.month_calendar_container {
  position: relative;
  .month_calendar {
    max-width: 34rem;
    height: 16rem;
    color: white;
    padding: 10px;
    border: 1px solid white;
    border-radius: 20px;
    .days_w {
      width: 450px;
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
      margin-bottom: 10px;
      .day_w {
        color: white;
        background-color: rgb(121, 18, 18);
        text-align: center;
        font-size: 0.9em;
        padding: 5px;
        border: 1px solid #ddd;
      }
    }
    .position {
      position: relative;
      height: 100%;
      .month_grid {
        display: grid;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        // width: 450px;
        grid-template-columns: repeat(7, 1fr);
        gap: 10px;

        .item {
          color: white;
          text-align: center;
          font-size: 0.9em;
          padding: 5px;
          border: 1px solid #ddd;
        }
      }
    }
  }
}

.toReserve {
  padding: 0.5rem 2rem;
  background-color: rgb(170, 12, 12);
  border-radius: 10px;
  &:hover {
    background-color: rgb(121, 18, 18);
  }
}

.time_container {
  display: flex;
  gap: 15px;
  margin-bottom: 2rem;
  .time {
    padding: 4px 8px;
    border: 1px solid white;
    border-radius: 10px;
    cursor: pointer;
  }
}

.reservation {
  border: 1px solid white;
  padding: 0.5rem;
  .reservation_date {
    max-width: 10rem;
    display: flex;
    gap: 0.4rem;
    padding: 0.2rem 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid white;
    border-radius: 10px;
  }
  .reservation_label {
    color: rgb(172, 172, 172);
    margin-right: 1rem;
  }
}

form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  input {
    color: black;
    max-width: 25rem;
    padding: 0.2rem;
    border-radius: 10px;
  }
}

.active {
  background-color: rgba(231, 0, 0, 0.486);
  transition: all 250ms ease-in-out;
}

// Classi di Vue
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
