import { reactive } from "vue";

export const state = reactive({
  sideMenuValue: 0,
  sideCartValue: 0,
  infomenu: 0,

  arrCart: [],
  arrVariation: [],

  maxPosti: [ 0, 0 ], //q, t

  nPezzi: [ 0, 0 ], //q, t
  totCart: 0,
  setting: [],

  actvPage: 1,
  baseUrl: 'https://db.pizzeria-capricciodileo.it/',
  //baseUrl: "http://127.0.0.1:8000/",
  getImageUrl(image) {
    return this.baseUrl + "public/storage/" + image;
  },
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
