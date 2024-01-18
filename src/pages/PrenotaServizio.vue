<script>
const { log } = console;
import { state } from "../state";
import axios from "axios";
import sh from "../components/SHeader.vue";
import { monthConvert, numberInCalendar } from "../utilities/functions";
import { validateReservation } from "../assets/validations/val_prenotaServizio";
export default {
  components: { sh },
  data() {
    return {
      currentDate: "",
      calendar: {}, // calendar = {"Gennaio" : [{..} ...]}, {"Febbraio" : [{..} ...]}, ... }
      reservationValues: {
        anno: "",
        mese: "",
        giorno: "",
        orario: "",
        nome: "",
        telefono: null,
        n_persone: "",
        messaggio: "",
      },
      validationErrors: {
        nameError: "",
        phoneError: "",
        npersonError: "",
        messageError: "",
        dateError: "",
      },
      dayTimes: [], // Fasce orarie per il giorno selezionato
      dateId: null, // ID della data scelta
      seats: "Seleziona un oraio per vedere le disponibilità",
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

    // Elaborare i dati in arrivo e formattarli in un calendario (oggetto)
    getCalendar(arrDates) {
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
      // Compongo la data intera con orario (formato d/m/y : 01/01/1990 12:00)
      const time_slot = `${numberInCalendar(
        this.reservationValues.giorno
      )}/${numberInCalendar(monthConvert(this.reservationValues.mese))}/${
        this.reservationValues.anno
      } ${this.reservationValues.orario}`;

      validateReservation(this.reservationValues, this.validationErrors);

      try {
        await this.findIdRequest();
        const reservation = {
          name: this.reservationValues.nome,
          phone: this.reservationValues.telefono,
          n_person: this.reservationValues.n_persone,
          message: this.reservationValues.messaggio,
          date_slot: time_slot,
          date_id: this.dateId,
        };

        await axios.post(state.baseUrl + "api/reservations", reservation);
      } catch (error) {
        log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
      }
    },

    // estraggo l'id della data scelta dall'utente per fare la richiesta
    async findIdRequest() {
      const mese = monthConvert(this.reservationValues.mese);
      const params = {
        year: this.reservationValues.anno,
        month: mese,
        day: +this.reservationValues.giorno,
        time: this.reservationValues.orario,
      };
      try {
        const data = await axios.get(state.baseUrl + "api/dates/findDate", {
          params,
        });
        const { id, reserved, max_res } = data.data.results[0];
        this.dateId = id;
        this.seats = max_res - reserved;
      } catch (error) {
        log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
      }
    },

    // Raggruppare per giorno e estrarre le fasce orarie per singoli giorni
    groupByDay(month) {
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
      //reset var. globale
      this.dayTimes = [];

      this.reservationValues.giorno = day;

      arrTimes.forEach((item) => {
        this.dayTimes.push(item);
      });
      this.seats = "Seleziona un oraio per vedere le disponibilità";
    },

    // settare mese e anno per la prenotazione (per evitare problemi se siamo a fine anno)
    setMonthAndYear(month, monthIndex) {
      const { year } = month;
      this.reservationValues.anno = year;
      this.reservationValues.mese = monthIndex;
      this.seats = "Seleziona un oraio per vedere le disponibilità";
    },

    getFirstMonthAndYearValue() {
      const arrMonthsNames = Object.keys(this.calendar);
      this.reservationValues.mese = arrMonthsNames[0];
      // Imposto anche l'anno di reservationValues a quello corrente
      const currentDate = new Date();
      this.reservationValues.anno = currentDate.getFullYear();
      return arrMonthsNames[0];
    },

    getSeats(time) {
      this.reservationValues.orario = time;
      this.findIdRequest();
    },

    // Far partire il primo giorno del mese dalla colonna del giorno corretto
    getColumnStart(month) {
      // Prendo il giorno della settimana con il quale il mese inizia
      const firstDayOfWeek = month[0].day_w;

      this.firstDayOfMonth = firstDayOfWeek;
      const gridColumnStart = this.firstDayOfMonth;

      return gridColumnStart;
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
  <div class="prenota-servizio">
    <sh />
    <h1>Prenota il tuo tavolo</h1>
    <div class="container_servizio">
      <section class="month-container">
        <h2>Seleziona il mese</h2>
        <div class="months">
          <div
            v-for="(month, monthIndex) in calendar"
            :key="monthIndex"
            :class="{
              month_name: true,
              active: monthIndex === reservationValues.mese,
            }"
            @click="setMonthAndYear(month[0], monthIndex)"
          >
            {{ monthIndex }}
          </div>
        </div>
      </section>
      <section class="calendar_container">
        <h2>Seleziona il giorno</h2>

        <!-- Giorni della settimana  -->
        <div class="days_w">
          <div v-for="(day_week, i) in daysWeek" :key="i" class="day_w">
            {{ day_week }}
          </div>
        </div>
        <div class="calendar">
          <template v-for="(month, monthIndex) in calendar" :key="monthIndex">
            <Transition>
              <!-- Vero e proprio calendario del mese  -->
              <div class="day_grid" v-if="reservationValues.mese == monthIndex">
                <div
                  v-for="(day, dayIndex) in groupByDay(month)"
                  :key="dayIndex"
                  @click="getTimes(dayIndex, day.times)"
                  :class="{
                    day: true,
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
      </section>
      <section class="orari-fasce">
        <h2>Seleziona la fascia oraria</h2>

        <Transition>
          <div v-if="dayTimes" class="time_container">
            <div
              v-for="(time, i) in dayTimes"
              :key="i"
              @click="getSeats(time)"
              :class="{
                time: true,
                active: time === reservationValues.orario,
              }"
            >
              {{ time }}
            </div>
          </div>
        </Transition>
        <div
          v-if="seats"
          :class="{
            seats: seats > 3,
            last_seats: seats <= 3,
          }"
        >
          {{ seats }} posti disponibili
        </div>

        <div v-if="validationErrors.dateError" class="error">
          {{ validationErrors.dateError }}
        </div>
      </section>
      <!-- Fasce orarie -->

      <!-- Form  -->
      <form class="dati-cliente">
        <h2>inserisci i tuoi9 dati</h2>
        <!-- Nome  -->
        <label for="nome">Nome</label>
        <span v-if="validationErrors.nameError" class="error">{{
          validationErrors.nameError
        }}</span>
        <input type="text" id="nome" v-model="reservationValues.nome" />

        <!-- mail  -->
        <label for="mail">mail</label>
        <span v-if="validationErrors.mailError" class="error">{{
          validationErrors.mailError
        }}</span>
        <input type="mail" id="mail" v-model="reservationValues.mail" />

        <!-- Telefono  -->
        <label for="telefono">Telefono</label>
        <span v-if="validationErrors.phoneError" class="error">{{
          validationErrors.phoneError
        }}</span>
        <input type="text" id="telefono" v-model="reservationValues.telefono" />

        <!-- N° di persone  -->
        <label for="n_persone">N° di persone</label>
        <span v-if="validationErrors.npersonError" class="error">{{
          validationErrors.npersonError
        }}</span>
        <input
          type="number"
          id="n_persone"
          v-model="reservationValues.n_persone"
        />

        <!-- Messaggio -->
        <label for="messaggio">Messaggio</label>
        <span v-if="validationErrors.messageError" class="error">{{
          validationErrors.messageError
        }}</span>
        <textarea
          cols="10"
          rows="10"
          id="messaggio"
          v-model="reservationValues.messaggio"
        ></textarea>
      </form>

      <!-- Riassunto prenotazione  -->
      <section class="riepilogo">
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
      </section>

      <button class="toReserv btn" @click="getReservationRequest">
        Prenota
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.prenota-servizio {
  height: 100vh;
  overflow: auto;
}
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
    .days_w {
      @include dfc;
      padding: 2rem 0;
      justify-content: space-between;
    }
    .calendar {
      border: solid 1px white;
      .day_grid {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        .day {
          padding: 1rem;
          text-align: center;
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
// h2 {
//   margin-bottom: 1rem;
// }

// .month_calendar_container {
//   display: flex;
//   gap: 2rem;
//   .month {
//     padding-bottom: 10rem;
//     .month_name {
//       display: flex;
//       flex-direction: column;
//       gap: 2rem;
//       padding: 4px 8px;
//       margin-bottom: 0.5rem;
//       border: 1px solid white;
//       border-radius: 10px;
//     }
//   }
// }

// .calendar_container {
//   position: relative;
//   .month_calendar {
//     width: 100%;

//     color: white;
//     padding: 10px;
//     border: 1px solid white;
//     border-radius: 20px;
//     .days_w {
//       width: 450px;
//       display: grid;
//       grid-template-columns: repeat(7, 1fr);
//       gap: 10px;
//       margin-bottom: 10px;
//       .day_w {
//         color: white;
//         background-color: rgb(121, 18, 18);
//         text-align: center;
//         font-size: 0.9em;
//         padding: 5px;
//         border: 1px solid #ddd;
//       }
//     }
//       .day_grid {
//         display: grid;
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;

//         grid-template-columns: repeat(7, 1fr);
//         gap: 10px;

//         .item {
//           color: white;
//           text-align: center;
//           font-size: 0.9em;
//           padding: 5px;
//           border: 1px solid #ddd;
//         }
//       }
//     }
//   }

.toReserve {
  padding: 0.5rem 2rem;
  background-color: rgb(170, 12, 12);
  border-radius: 10px;
  &:hover {
    background-color: rgb(121, 18, 18);
  }
}

// .time_container {
//   display: flex;
//   align-items: center;
//   gap: 15px;
//   margin-bottom: 2rem;
//   .time {
//     padding: 4px 8px;
//     border: 1px solid white;
//     border-radius: 10px;
//     cursor: pointer;
//   }
// }

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

// form {
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1rem;
//   input {
//     color: black;
//     max-width: 25rem;
//     padding: 0.2rem;
//     border-radius: 10px;
//   }
// }

// .active {
//   background-color: rgba(231, 0, 0, 0.486);
//   transition: all 250ms ease-in-out;
// }

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

.prenota-servizio::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.prenota-servizio::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.prenota-servizio::-webkit-scrollbar-track {
  border-radius: 20px;
  background: rgba(52, 4, 7, 0.786);
}
.prenota-servizio::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
}
.hd {
  box-shadow: 10px 10px 10px black;
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
