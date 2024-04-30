<script>
import { state } from "../state.js";
import axios from "axios";

export default {
  data() {
    return {
      state,
      ferie : false,
      fromto : []
     
    };
  },
  async created() {
    const settings = await axios.get(state.baseUrl + "api/setting", {});
    this.state.setting = settings.data.results;
    if (this.state.setting[2].status) {
      this.ferie = false;
    }
    if (this.state.setting[2].status) {
      this.ferie = true;
      this.fromto.push(this.state.setting[2].from)
      this.fromto.push(this.state.setting[2].to)
    }
  },
};
</script>

<template>
  <header v-if="!state.sideMenuValue && state.actvPage!== 1" class="hd">
    <div class="btn-menu" @click="state.openside">menu</div>
    <img src="../assets/img/logoblack.png" alt="" class="logo">
    <p v-if=" ferie">altro Siamo chiusi dal {{fromto[0] }} al {{ fromto[1] }}</p>
  </header>

  <div v-if="!state.sideMenuValue && state.actvPage == 1" class="header-home">
    <div class="btn-menu" @click="state.openside">menu</div>
    <div class="overlay">

      <img src="../assets/img/logoblack.png" alt="" class="logo">
    </div>

    <p v-if=" ferie">home Siamo chiusi dal {{fromto[0] }} al {{ fromto[1] }}</p>
  </div>
</template>
<!-- 


<span>16:00 - 22:00</span> -->
<style lang="scss" scoped>
@use "../assets/styles/general.scss" as *;
header {
  padding: 10px 20px;
  background-color: $c-header;
  width: 100% !important;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: flex-start;
  p{
    width: 100%;
    text-align: center;
  }
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
  img{
    width: clamp(35px, 15%, 65px);
    filter: invert(100);
    
  }
}
.header-home {
  height: 85px;
  padding: 10px 20px;
  background-color: $c-header;
  margin-left: 1rem;
 // width: 70%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: flex-start;
  p{
    width: 100%;
    text-align: center;
    margin-top: -10px;
  }
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
    background-color: $c-header;
    margin-top: -10px;
    font-weight: bolder;
    width: fit-content;
    padding: 1rem 1rem 1rem;
    border-radius: 0 0 20px 20px;

  
  }
  .overlay{
    @include dfc;
    width: 100%;
    height: 100%;

    img{
      height: 100%;
      filter: invert(100);
      
    }
  }
}
@media (max-width: $bp1) {
  header, .header-home{
    width: 100%;
    justify-content: space-between !important;
  }
  
  .btn-menu {
    display: block !important;
  }
  h1{
    margin-left:0 !important
  }
  .header-home{
    border-bottom: 3px solid rgba(178, 178, 178, 0.524);
    background-image: url('../assets/img/pizza-olio.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    flex-direction: column;
    align-items: center;
    background-color: $c-header;
    height: 45vh;
    margin: 0 !important;
    img{
      margin-top: -5%;
      height: auto !important;
      width: clamp(100px, 75vw, 450px );

      
    }
    .btn-menu{
      align-self: flex-start !important;
      background-color: black;
      border: 2px solid white;
      border-top: 0px;
      box-shadow: 0 1px 6px rgba(255, 255, 255, 0.578);
    }
  }
  .overlay{
    top: 60px;
    left: 0;
    height: 60% !important;
    background-color: rgba(0, 0, 0, 0.476);
    box-shadow: 0 0 10px black;
   
    position: absolute;
  }
  
}
</style>
