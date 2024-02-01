import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import ChiSiamo from "./pages/ChiSiamo.vue";
import Contatti from "./pages/Contatti.vue";
import Menu from "./pages/Menu.vue";
import Prenota from "./pages/Prenota.vue";
import Conferma from "./pages/Conferma.vue";
import PrenotaServizio from "./pages/PrenotaServizio.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/chi-siamo",
      name: "chi-siamo",
      component: ChiSiamo,
    },
    {
      path: "/contatti",
      name: "contatti",
      component: Contatti,
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu,
    },
    {
      path: "/prenota",
      name: "prenota",
      component: Prenota,
    },
    {
      path: "/prenotaServizio",
      name: "prenotaServizio",
      component: PrenotaServizio,
    },
    {
      path: "/conferma",
      name: "conferma",
      component: Conferma,
    },
  ],
});

export { router };
