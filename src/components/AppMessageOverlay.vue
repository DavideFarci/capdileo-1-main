<script>
export default {
  props: {
    booleans: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeOverlay() {
      this.$emit("toggle_message");
    },
    reloadPage() {
      location.reload();
    },
  },
};
</script>

<template>
  <div v-if="booleans.show" class="overlay" @click="closeOverlay">
    <div class="panel" @click="(e) => e.stopPropagation()">
      <div v-if="!booleans.loader" class="message">
        <span v-if="booleans.success">
          {{
            booleans.reservation
              ? "La prenotazione è avvenuta con successo"
              : "L'ordine è avvenuto con successo"
          }}
        </span>
        <span v-if="!booleans.success">
          Qualcosa è andato storto, riprova!
        </span>
      </div>

      <div v-else class="loader">
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
        <div class="bar4"></div>
        <div class="bar5"></div>
        <div class="bar6"></div>
        <div class="bar7"></div>
        <div class="bar8"></div>
        <div class="bar9"></div>
      </div>

      <button v-if="booleans.success" class="btn" @click="closeOverlay">
        chiudi
      </button>
      <button v-else class="btn" @click="reloadPage">ricarica</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;
.overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.486);
  z-index: 1000;
  overflow: auto;
  .panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    background: $c-nav;
    padding: 2rem 7rem;
    border-radius: 15px;
    border: 2px solid $c-footer-nav;
    box-shadow: 0px 17px 31px 19px rgba(0, 0, 0, 0.4);
    z-index: 1000;
    .message {
      font-size: clamp(20px, 4vw, 1rem);
      font-weight: bold;
    }
  }
}

.loader {
  position: relative;
  width: 164px;
  height: 100px;
  margin: 50px auto;
}

.loader div {
  position: absolute;
  width: 10px;
  height: 30px;
  background-color: white;
  border-radius: 5px;
  animation: loader_51899 1.5s ease-in-out infinite;
}

.loader .bar1 {
  left: 0px;
  animation-delay: 0s;
}

.loader .bar2 {
  left: 20px;
  animation-delay: 0.15s;
}

.loader .bar3 {
  left: 40px;
  animation-delay: 0.3s;
}

.loader .bar4 {
  left: 60px;
  animation-delay: 0.45s;
}

.loader .bar5 {
  left: 80px;
  animation-delay: 0.6s;
}

.loader .bar6 {
  left: 100px;
  animation-delay: 0.75s;
}

.loader .bar7 {
  left: 120px;
  animation-delay: 0.9s;
}

.loader .bar8 {
  left: 140px;
  animation-delay: 1.05s;
}

.loader .bar9 {
  left: 160px;
  animation-delay: 1.2s;
}

@keyframes loader_51899 {
  0% {
    height: 30px;
    transform: translate(0, 0);
  }

  50% {
    height: 70px;
    transform: translate(0, 35px);
  }

  100% {
    height: 30px;
    transform: translate(0, 0);
  }
}
</style>
