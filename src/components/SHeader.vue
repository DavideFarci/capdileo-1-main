<script>
import { state } from "../state.js";

export default {
  data() {
    return {
      state,
    };
  },
};
</script>

<template>
  <header v-if="!state.sideMenuValue" class="hd">
    <div class="btn-menu" @click="state.openside">menu</div>
    <h1>Il Capriccio di Leo</h1>
  </header>
</template>
<!-- 


<span>16:00 - 22:00</span> -->
<style lang="scss" scoped>
@use "../assets/styles/general.scss" as *;
header {
  position: fixed;
  padding: 10px 20px;
  background-color: $c-header;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  h1 {
    // max-width:150px;
    margin-left:40%;
    text-align: center;
    font-size: 30px;
    color: white;
    font-family: "Playball", cursive;
    text-shadow: -3px -3px 15px black;
  }
  .btn-menu {
    display: none;

    text-transform: uppercase;
    background-color: $c-footer-nav;
    margin-top: -10px;
    font-weight: bolder;
    width: fit-content;
    padding: 1rem 1rem 1rem;
    border-radius: 0 0 20px 20px;

  
  }
}
@media (max-width: $bp1) {
  .btn-menu {
    display: block !important;
  }
  h1{
    margin-left:0 !important
  }
}
</style>
