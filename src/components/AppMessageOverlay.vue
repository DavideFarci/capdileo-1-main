<script>
import AppLoaderFull from "./AppLoaderFull.vue";
export default {
  components: { AppLoaderFull },
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

      <AppLoaderFull v-else />

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
</style>
