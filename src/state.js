import { reactive } from "vue";

export const state = reactive({
  sideMenuValue: 0,
  sideCartValue: 0,
  infomenu: 0,

  arrCart: [],
  arrVariation: [],

  totCart: 0,
  //setting:[],
  setting: [{ status: 1 }, { status: 1 }, { status: 1 }],
  actvPage: 1,
    baseUrl: 'https://db.dashboardristorante.it/',
  //baseUrl: "http://127.0.0.1:8000/",
  getImageUrl(image) {
    return this.baseUrl + 'public/storage/' + image;
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
  openside() {
    if (this.sideMenuValue) {
      this.sideMenuValue = 0;
    } else {
      this.sideMenuValue = 1;
    }
  },
  updateActvPage() {
    this.sideMenuValue = 0;
    // this.actvPage = page;
  },
  infoside() {
    if (this.infomenu) {
      this.infomenu = 0;
    } else {
      this.infomenu = 1;
    }
  },
  getServeCart() {
    let arrVar = [];
    this.arrCart.forEach((element) => {
      let newi = {
        name: element.title,
        p_id: element.p_id,
        counter: element.counter,
        deselected: element.deselected,
        addicted: element.addicted,
      };
      arrVar.push(newi);
    });

    return JSON.stringify(arrVar);
  },
  changeCouter(id, c) {
    this.arrCart.forEach((element) => {
      if (element.p_id == id) {
      }
    });
  },
});
