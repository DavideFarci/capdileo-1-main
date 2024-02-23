<script>
import sh from "../components/SHeader.vue";
import AppCalendar from "../components/AppCalendar.vue";
export default {
  components: { AppCalendar, sh },
  data() {
    return {
      reservationValues: {
        anno: "",
        mese: "",
        giorno: "",
        orario: "",
        nome: "",
        email: "",
        telefono: null,
        n_persone: "",
        messaggio: "",
        privacy: false,
      },
      inputs: [
        {
          name: "nome",
          label: "Nome *",
          type: "text",
        },
        {
          name: "email",
          label: "Email *",
          type: "email",
        },
        {
          name: "n_persone",
          label: "N° di persone *",
          type: "number",
        },
        {
          name: "telefono",
          label: "Telefono *",
          type: "text",
        },
        {
          name: "messaggio",
          label: "Messaggio",
          type: "text",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="prenota-servizio">
    <sh />
    <div class="cont">
      <h1>Prenota il tuo tavolo</h1>
      <app-calendar
        :formValues="reservationValues"
        :inputs="inputs"
        :reservation="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.prenota-servizio {
  height: 100vh;
  overflow: auto;
  .cont {
    padding: 15% 0;
  }
}
h1 {
  margin: 1rem;
  font-size: clamp(1.9rem, 6vw, 2.5rem);
}
</style>
