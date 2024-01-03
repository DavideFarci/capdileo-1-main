<script>
import { state } from "../state";
import axios from "axios";
import sh from "../components/SHeader.vue";
export default {
  components: { sh },
  data() {
    return {
      initialDates: [],
      currentDate: "",
      calendar: {},
      dayTimes: [], // Fasce orarie per il giorno selezionato
      selectedMonth: "",
      reservationValues: {
        anno: "",
        mese: "",
        giorno: "",
        orario: "",
      },
      dateId: null, // id della data scelta
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

      for (let i = 0; i < arrDates.length; i++) {
        switch (arrDates[i].day_w) {
          case 1:
            arrDates[i].day_w = "Lun";
            break;
          case 2:
            arrDates[i].day_w = "Mar";
            break;
          case 3:
            arrDates[i].day_w = "Mer";
            break;
          case 4:
            arrDates[i].day_w = "Gio";
            break;
          case 5:
            arrDates[i].day_w = "Ven";
            break;
          case 6:
            arrDates[i].day_w = "Sab";
            break;
          case 7:
            arrDates[i].day_w = "Dom";
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
          name: "Davide",
          phone: "1234567890",
          n_person: "3",
          message: "siamo in 3",
          date_id: this.dateId,
        };
        const response = await axios.post(
          state.baseUrl + "api/reservations",
          reservation
        );
      } catch (error) {
        console.log(
          "Errore durante la richiesta di prenotazione, messaggio: " +
            error.message
        );
      }
    },

    // estraggo l'id della data scelta per fare la richiesta
    async findIdRequest() {
      const mese = this.monthNamesInNumber();
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
        // Aggiungi l'orario all'array
        grouped[item.day].times.push({ time: item.time });
        grouped[item.day].day_w = item.day_w;
      });

      return grouped;
    },

    // Settare la var. globale = fasce orarie del giorno selezionato
    getTimes(day, arrTimes) {
      this.dayTimes = [];
      this.reservationValues.giorno = day;
      arrTimes.forEach((item) => {
        this.dayTimes.push(item.time);
      });
    },

    // Si occupa anche di SETTARE IL MESE E L'ANNO della richiesta
    showSelectedMonth(index) {
      this.selectedMonth = index;
      const year = new Date();
      this.reservationValues.anno = year.getFullYear();
      this.reservationValues.mese = index;
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
  },
};
</script>

<template>
  <div class="menu">
    <sh />
    <div class="top-menu">
      <h1>Prenota il tuo tavolo</h1>
      <div class="month_calendar">
        <div>
          <!-- Nome del mese  -->
          <h2>Seleziona il mese</h2>
          <h3
            v-for="(month, monthIndex) in calendar"
            :key="monthIndex"
            class="month"
            @click="showSelectedMonth(monthIndex)"
          >
            {{ monthIndex }}
          </h3>
        </div>

        <!-- Calendario del mese  -->
        <div>
          <h2>Seleziona il giorno</h2>
          <template v-for="(month, monthIndex) in calendar" :key="monthIndex">
            <div
              :class="{
                day_grid: true,
                active_month: monthIndex === reservationValues.mese,
              }"
            >
              <div
                v-for="(day, dayIndex) in groupByDay(month)"
                :key="dayIndex"
                @click="getTimes(dayIndex, day.times)"
                class="item"
              >
                <span>{{ day.day_w }}</span>
                <span>{{ dayIndex }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <ul>
        <li><h2>Seleziona la fascia oraria</h2></li>
        <li
          v-for="(time, i) in dayTimes"
          :key="i"
          class="time"
          @click="() => (this.reservationValues.orario = time)"
        >
          {{ time }}
        </li>
      </ul>
      <div>
        <h2>La tua prenotazione</h2>
        <ul>
          <li>{{ reservationValues.giorno }}</li>
          <li>{{ reservationValues.mese }}</li>
          <li>{{ reservationValues.orario }}</li>
        </ul>
      </div>
      <button class="toReserve" @click="getReservationRequest">Prenota</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

.month_calendar {
  display: flex;
  gap: 2rem;
}

.day_grid.active_month {
  // opacity: 1;
  // transition: opacity 500ms ease-in-out;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  color: white;
  border: 1px solid white;
  padding: 10px;
  max-width: 34rem;
}
.day_grid {
  // opacity: 0;
  // user-select: none;
  display: none;
}
.item {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
}

.month {
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.toReserve {
  padding: 0.5rem 2rem;
  background-color: rgb(170, 12, 12);
  border-radius: 10px;
}
.toReserve:hover {
  background-color: rgb(121, 18, 18);
}

.time {
  padding: 4px 8px;
  cursor: pointer;
}
</style>
