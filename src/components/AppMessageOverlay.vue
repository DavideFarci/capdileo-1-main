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
    loader: Boolean,
    required: true,
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
      <div v-if="!loader" class="message">
        {{
          reservation
            ? "La prenotazione è avvenuta con successo"
            : "L'ordine è avvemito con successo"
        }}
      </div>
      <div v-else class="loader"></div>
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

.loader {
  position: relative;
  margin: 0 auto;
  width: 700px;
  height: 3px;
  background: linear-gradient(to right, transparent, $c-f-t, transparent);
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    translate: -200px 0;
    width: 150px;
    height: 100%;
    background: linear-gradient(to right, transparent, #212121, transparent);
    animation: slide 1s infinite;
  }
}

@keyframes slide {
  100% {
    translate: 300px 0;
  }
}
</style>
