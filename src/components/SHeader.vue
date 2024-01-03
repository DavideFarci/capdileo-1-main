
<script >
  import {state} from '../state.js';

 export default{
  data(){
    return{
      state,
    }
  },

 }
</script>


<template>
 <header class="hd">
      <h1>Il Capriccio di Leo</h1>
      <div class="btn-menu" @click="state.openside">. . .</div>
    </header>
</template>
<!-- 


<span>16:00 - 22:00</span> -->
<style lang="scss" scoped>
@use '../assets/styles/general.scss' as *;
header{
    padding: 10px 0;
    background-color: $c-header;
    width: 100%;
    z-index: 1;
    h1{
      // max-width:150px;
      // margin: 0 auto;
      text-align: center;
      font-size: 30px;
      color: white;
      font-family: 'Playball', cursive;
      text-shadow: -3px -3px 15px black;
    }
    .btn-menu{
      display: none;
      
      text-transform: uppercase;
      background-color: $c-footer-nav;
      color: $c-nav-link;
      font-weight: bolder;
      width: fit-content;
      padding: .1rem 1rem 1rem;
      border-radius: 0 0 20px 20px ;
      
      position: absolute;
      left: 6px;
      top: 0px;
      z-index: 10;
    }
    
  }
  @media (max-width:$bp1) {.btn-menu{display:block !important;}}
</style>


