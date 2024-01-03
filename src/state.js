import { reactive } from "vue";

export const state = reactive({
  sideMenuValue: 0,
  sideCartValue: 1,
  infomenu: 0,
  arrCart: [],
  arrId: [],
  arrQt: [],
  totCart: 0,
  //setting:[],
  setting: [{ status: 1 }, { status: 1 }, { status: 1 }],
  actvPage: 1,
  // baseUrl: 'https://db.dashboardristorante.it/',
  baseUrl: "http://127.0.0.1:8000/",
  getImageUrl(image) {
    return image
      ? this.baseUrl + "public/storage/" + image
      : this.baseUrl + "public/storage/default.png";
  },
  fakemenu: [
    [
      {
        img: "../../public/pizza-alto.png",
        titolo: "LA REGINA",
        ingredienti: "pomodoro, mozzarella di bufala campana, pesto della casa",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "PARMIGIANA",
        ingredienti:
          "pomodoro, mozzarella fior di latte, melanzane grigliate, parmigiano, pesto della casa",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "TRENTINA",
        ingredienti:
          "mozzarella fior di latte, rucola, carne salada trentina, scaglie di grana",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "AMATRICIANA",
        ingredienti:
          "mozzarella fior di latte, salsiccia e pecorino su passata di pomodoro cotta con ventricina piccante, pancetta marchigiana e salsa di peperoncini freschi",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "ACCIUGA",
        ingredienti:
          "pomodoro, mozzarella di bufala campana, acciughe del mar cantabrico, foglie del cappero, origano",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "ARROSTINO",
        ingredienti:
          "mozzarella fior di latte, stracciatella, rucola, arrosto di tacchino in porchetta marchigiano",
        prezzo: "8,00€",
      },
      {
        img: "../../public/pizza-alto.png",
        titolo: "BRONTESE",
        ingredienti:
          "mozzarella fior di latte, stracciatella di burrata, mortadella, granella di pistacchi e pesto di pistacchi della casa",
        prezzo: "8,00€",
      },
    ],
    [
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "MARINARA",
        ingredienti: "pomodoro, origano, aglio",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "MARGHERITA",
        ingredienti: "pomodoro, mozzarella fior di latte, basilico",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "SALSICCIA",
        ingredienti: "pomodoro, mozzarella fior di latte, salsiccia",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "WÜRSTEL",
        ingredienti: "pomodoro, mozzarella fior di latte, würstel",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "DIAVOLA",
        ingredienti: "pomodoro, mozzarella fior di latte, ventricina piccante",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "CAPRICCIOSA",
        ingredienti:
          "pomodoro, mozzarella fior di latte, carciofini, funghi, olive nere",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "4 STAGIONI",
        ingredienti:
          "pomodoro, mozzarella fior di latte, carciofini, funghi, olive nere ?? ??",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "LA TEDESCA",
        ingredienti: "pomodoro, mozzarella fior di latte, patate, würstel",
        prezzo: "8,00€",
      },
    ],
    [
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "FORNARINA",
        ingredienti: "cipolla o rosmarino",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "CASERECCIA",
        ingredienti: "mozzarella, patate, salsiccia, rosmarino",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "GREEN POWER",
        ingredienti: "mozzarella, verdure di stagione",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "4 FORMAGG",
        ingredienti: "mozzarella, gorgonzola, pecorino, grana",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "RADICCHIO",
        ingredienti: "mozzarella, radicchio, gorgonzola, noci",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "ADIGE",
        ingredienti: "mozzarella, speck, noci, gorgonzola",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "TARTUFATA",
        ingredienti: "mozzarella, cotto, funghi, salsa tartufata",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "NORCINA",
        ingredienti:
          "mozzarella fior di latte, salsiccia, salsa tartufata, noci, pecorino",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "GENOVESE",
        ingredienti:
          "mozzarella fior di latte, pesto di basilico, pomodorino ciliegino, pinoli",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "PESTO AFFUMICATO",
        ingredienti:
          "mozzarella, pesto di basilico, pomodorino giallo, pancetta affumicata",
        prezzo: "8,00€",
      },
      {
        img: "/src/assets/img/pizza-alto.png",
        titolo: "BOSCAIOLA",
        ingredienti:
          "mozzarella, funghi, pancetta, cipolla, olive nere, pomodorino ciliegino",
        prezzo: "8,00€",
      },
    ],
  ],
  defaultTimes: [
    {
      id: 1,
      time_slot: "00:00",
      visible: 1,
    },
    {
      id: 2,
      time_slot: "00:20",
      visible: 1,
    },
    {
      id: 3,
      time_slot: "00:40",
      visible: 1,
    },
    {
      id: 4,
      time_slot: "01:00",
      visible: 1,
    },
    {
      id: 5,
      time_slot: "01:20",
      visible: 1,
    },
    {
      id: 6,
      time_slot: "01:40",
      visible: 1,
    },
    {
      id: 7,
      time_slot: "02:00",
      visible: 1,
    },
    {
      id: 8,
      time_slot: "02:20",
      visible: 1,
    },
    {
      id: 9,
      time_slot: "02:40",
      visible: 1,
    },
    {
      id: 10,
      time_slot: "03:00",
      visible: 1,
    },
    {
      id: 11,
      time_slot: "03:20",
      visible: 1,
    },
    {
      id: 12,
      time_slot: "03:40",
      visible: 1,
    },
    {
      id: 13,
      time_slot: "04:00",
      visible: 1,
    },
    {
      id: 14,
      time_slot: "04:20",
      visible: 1,
    },
    {
      id: 15,
      time_slot: "04:40",
      visible: 1,
    },
    {
      id: 16,
      time_slot: "05:40",
      visible: 1,
    },
    {
      id: 17,
      time_slot: "05:20",
      visible: 1,
    },
    {
      id: 18,
      time_slot: "05:40",
      visible: 1,
    },
    {
      id: 19,
      time_slot: "06:00",
      visible: 1,
    },
    {
      id: 20,
      time_slot: "06:20",
      visible: 1,
    },
    {
      id: 21,
      time_slot: "06:40",
      visible: 1,
    },
    {
      id: 22,
      time_slot: "07:00",
      visible: 1,
    },
    {
      id: 23,
      time_slot: "07:20",
      visible: 1,
    },
    {
      id: 24,
      time_slot: "07:40",
      visible: 1,
    },
    {
      id: 25,
      time_slot: "08:00",
      visible: 1,
    },
    {
      id: 26,
      time_slot: "08:20",
      visible: 1,
    },
    {
      id: 27,
      time_slot: "08:40",
      visible: 1,
    },
    {
      id: 28,
      time_slot: "09:00",
      visible: 1,
    },
    {
      id: 29,
      time_slot: "09:20",
      visible: 1,
    },
    {
      id: 30,
      time_slot: "09:40",
      visible: 1,
    },
    {
      id: 31,
      time_slot: "10:00",
      visible: 1,
    },
    {
      id: 32,
      time_slot: "10:20",
      visible: 1,
    },
    {
      id: 33,
      time_slot: "10:40",
      visible: 1,
    },
    {
      id: 34,
      time_slot: "11:00",
      visible: 1,
    },
    {
      id: 35,
      time_slot: "11:20",
      visible: 1,
    },
    {
      id: 36,
      time_slot: "11:40",
      visible: 1,
    },
    {
      id: 37,
      time_slot: "12:00",
      visible: 1,
    },
    {
      id: 38,
      time_slot: "12:20",
      visible: 1,
    },
    {
      id: 39,
      time_slot: "12:40",
      visible: 0,
    },
    {
      id: 40,
      time_slot: "13:00",
      visible: 0,
    },
    {
      id: 41,
      time_slot: "13:20",
      visible: 1,
    },
    {
      id: 42,
      time_slot: "13:40",
      visible: 1,
    },
    {
      id: 43,
      time_slot: "14:00",
      visible: 1,
    },
    {
      id: 44,
      time_slot: "14:20",
      visible: 1,
    },
    {
      id: 45,
      time_slot: "14:40",
      visible: 1,
    },
    {
      id: 46,
      time_slot: "15:00",
      visible: 1,
    },
    {
      id: 47,
      time_slot: "15:20",
      visible: 1,
    },
    {
      id: 48,
      time_slot: "15:40",
      visible: 1,
    },
    {
      id: 49,
      time_slot: "16:00",
      visible: 1,
    },
    {
      id: 50,
      time_slot: "16:20",
      visible: 1,
    },
    {
      id: 51,
      time_slot: "16:40",
      visible: 1,
    },
    {
      id: 52,
      time_slot: "17:00",
      visible: 1,
    },
    {
      id: 53,
      time_slot: "17:20",
      visible: 1,
    },
    {
      id: 54,
      time_slot: "17:40",
      visible: 1,
    },
    {
      id: 55,
      time_slot: "18:00",
      visible: 1,
    },
    {
      id: 56,
      time_slot: "18:20",
      visible: 1,
    },
    {
      id: 57,
      time_slot: "18:40",
      visible: 1,
    },
    {
      id: 58,
      time_slot: "19:00",
      visible: 1,
    },
    {
      id: 59,
      time_slot: "19:20",
      visible: 1,
    },
    {
      id: 60,
      time_slot: "19:40",
      visible: 1,
    },
    {
      id: 61,
      time_slot: "20:00",
      visible: 1,
    },
    {
      id: 62,
      time_slot: "20:20",
      visible: 1,
    },
    {
      id: 63,
      time_slot: "20:40",
      visible: 0,
    },
    {
      id: 64,
      time_slot: "21:00",
      visible: 0,
    },
    {
      id: 65,
      time_slot: "21:20",
      visible: 1,
    },
    {
      id: 66,
      time_slot: "21:40",
      visible: 1,
    },
    {
      id: 67,
      time_slot: "22:00",
      visible: 1,
    },
    {
      id: 68,
      time_slot: "22:20",
      visible: 1,
    },
    {
      id: 69,
      time_slot: "22:40",
      visible: 1,
    },
    {
      id: 70,
      time_slot: "23:00",
      visible: 1,
    },
    {
      id: 71,
      time_slot: "23:20",
      visible: 1,
    },
    {
      id: 72,
      time_slot: "23:40",
      visible: 1,
    },
  ],
  openside() {
    if (this.sideMenuValue) {
      this.sideMenuValue = 0;
    } else {
      this.sideMenuValue = 1;
    }
  },
  updateActvPage(page) {
    this.sideMenuValue = 0;
    this.actvPage = page;
  },
  infoside() {
    if (this.infomenu) {
      this.infomenu = 0;
    } else {
      this.infomenu = 1;
    }
  },
});
