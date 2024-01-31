<script>
export default {
  props: {
    reservation: {
      type: Boolean,
      required: true,
    },
    show: {
      type: Boolean,
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
  },
};
</script>

<template>
  <div v-if="show" class="overlay">
    <div class="panel">
      <div class="message">
        {{
          reservation
            ? "La prenotazione è avvenuta con successo"
            : "L'ordine è avvemito con successo"
        }}
      </div>
      <button class="btn" @click="closeOverlay">chiudi</button>
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
    padding: 4rem;
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
