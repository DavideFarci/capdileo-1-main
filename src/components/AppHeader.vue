
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
        <h1 id="title">Il Capriccio <br> di Leo</h1>
        <div class="img">
          <p>"la nostra storia è qualità raggiunta per essere gustata"</p>
          <div class="overlay"></div>
        </div>

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
  background-color: $c-header;
  margin-left: 2rem;
  height: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  .cont{
    @include dfc;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    
    .center{

      //height: 80%;
      padding: 0 4rem;
      @include dfc;
      justify-content: space-between;
  
      width: 100%;
  
      h1{
        
        color: white;
        font-family: 'Playball', cursive;
        font-size: 60px;
        text-shadow: -3px -3px 15px black;
        text-align: center;
      }
      
      .img{
        background-image: url('../assets/img/pizza-olio.png');
        background-size: cover;
        background-repeat: no-repeat;
        box-shadow: -7px -7px 20px black;
        position: relative;
        height: 200px;
        aspect-ratio: 1.25;
        display: flex;
        padding: 5%;
        text-align: center;
        align-items: flex-end;
        p{
          position: relative;
          z-index: 3;

        }
        .overlay{
          background-color: rgba(0, 0, 0, 0.495);
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        //height: 80px;
      }
    }
  }
  
}
.par{
  color: white;
  text-shadow: 2px 2px 6px black;
  padding-bottom: 1em;
  width: 80%;
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
@media (max-width:$bp2){
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

@media (max-width:$bp3) {
  
  #title{
    font-size: 50px;
  }
  
}


</style>
