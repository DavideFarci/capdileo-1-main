
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
  <div class="header">
    <div class="btn-menu" @click="state.openside">Menu</div>
    <div class="cont">
      <div class="center">
        <img src="../assets/img/logoblack.png" alt="" class="logo">
        

      </div>
      <div class="par" v-if="state.setting[2].status" >
        Finalmente un po di riposo anche per noi.. siamo in ferie dal {{ state.setting[2].from }} e torneremo il  {{ state.setting[2].to }}
      </div>
    </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/styles/general.scss' as *;
.btn-menu{
  display: none;
  margin-left: 10px;
  text-transform: uppercase;
  
  color: $c-white;
  border: 2px solid white;
  border-top: none;
  font-weight: bolder;
  width: fit-content;
  padding: .8rem 2rem 1rem;
  border-radius: 0 0 20px 20px ;
    
  position: absolute;
  left: 10px;
  top: 0px;
  z-index: 20;

}
.header{
  margin-left: 2rem;
  height: auto;
  display: flex;
  z-index: 100;
  .cont{
    @include dfc;
    height: 100%;
    width: 100%;
    .center{
      @include dfc;
      justify-content: flex-end;
      margin: 3rem;
      width: 100%;
      .logo{
        filter: invert(100);
        width: clamp(100px, 30%, 150px);
      } 
    }
  }
}
.par{
  color: white;
  text-shadow: 2px 2px 6px black;
  padding-bottom: 5px;
  width: 95%;
  text-align: center;
}

@media (max-width:$bp1) {
  
  .btn-menu{
    display: block;
  }
  .header{
    margin: 0;
  }
  
}
@media (max-width:$bp3){
  .logo{
    filter: invert(100);
    width: clamp(400px, 50%, 450px) !important;
  }
  .header{
    background-image: url('../assets/img/pizza-espansa.png');
    background-position: center;
    background-size: cover;
    justify-content: center;
    .cont{
      height: 83%;
      
  
      backdrop-filter: blur(5px);
    }
    .center{
      justify-content: center!important;
    }
    .img{
      display: none!important;
   
    }
  }
}



</style>
