<script>
import AppLoader from "./AppLoader.vue";
export default {
  components: { AppLoader },
};
</script>

<template>
  <div class="overlay">
    <app-loader :show="true" />
  </div>
</template>

<style lang="scss" scoped>
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
}
</style>
