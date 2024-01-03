
<script >
  import {state} from '../state.js';

 export default{
  data(){
    return{
      state,
    }
  },
  methods: {
    
    }
 }
</script>


<template>
  <div class="nav">
    <div class="top">
      <router-link :to="{ name: 'home' }" :class="state.actvPage == 1 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(1)" >home</router-link>
      <router-link :to="{ name: 'menu' }" :class="state.actvPage == 2 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(2)" >menu</router-link>
      <router-link :to="{ name: 'chi-siamo' }" :class="state.actvPage == 3 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(3)" >chi siamo?</router-link>
      <router-link :to="{ name: 'contatti' }" :class="state.actvPage == 4 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(4)" >contatti</router-link>
      <router-link :to="{ name: 'prenota' }" :class="state.actvPage == 5 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(5)" >Ordina d'Asporto</router-link>
      <router-link :to="{ name: 'prenotaServizio' }" :class="state.actvPage == 6 ? 'active-link' : '' " class="nav-link" @click="state.updateActvPage(6)" >Prenota tavolo</router-link>
    </div>
    <div class="bottom-footer">
      <div class="sec-1">
        <h4>Dove puoi trovarci</h4>
        <p>Borghetto | via borghetto 69</p>
      </div>
      <div class="sec-2">
        <h4>Orari d'apertura</h4>
        <div class="cont-giorni">
          <span>lunedì</span>
          <span>martedì</span>
          <span>giovedì</span>
          <span>venerdì</span>
          <span>sabato</span>
          <span>domenica</span>
        </div>
        <div class="cont-orari">
          <span class="time" >chiusi</span>         
          <span class="time" >16:00 - 22:00</span>
          <span class="time" >16:00 - 22:00</span>
          <span class="time" >16:00 - 22:00</span>
          <span class="time" >16:00 - 22:00</span>
          <span class="time" >16:00 - 22:00</span>
        </div>

      </div>
      <div class="sec-3">
        Capriccio di leo S.r.l, PI: 1231231231231, privacy policy, product by FUTURE+
      </div>
    </div>
  </div>
  
  <div :class="state.sideMenuValue ? 'nav-mb-on' : 'nav-mb-off'">
    <div :class="state.sideMenuValue ? 'burger-close-on' : 'burger-close-off'" @click="state.openside">
      <div class="line"  :class="state.infomenu ?   'menu-off': 'active-link' "></div>
      <div class="line l1" :class="state.infomenu ?   'menu-off': 'active-link' "></div>
    </div>
    <div :class="state.sideMenuValue ? 'top-on' : 'top-off'">
      <router-link :to="{ name: 'home' }" :class="state.infomenu ?   'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(1)" >home</router-link>
      <router-link :to="{ name: 'menu' }" :class="state.infomenu ? 'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(2)" >menu</router-link>
      <router-link :to="{ name: 'chi-siamo' }" :class="state.infomenu ? 'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(3)" >chi siamo?</router-link>
      <router-link :to="{ name: 'contatti' }" :class="state.infomenu ? 'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(4)" >contatti</router-link>
      <router-link :to="{ name: 'prenota' }" :class="state.infomenu ? 'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(5)" >Ordina d'Asporto</router-link>
      <router-link :to="{ name: 'prenotaServizio' }" :class="state.infomenu ? 'menu-off': 'active-link' " class="nav-link" @click="state.updateActvPage(6)" >Prenota tavolo</router-link>
      <div class="nav-link info"  :class="state.infomenu ? 'info-on' : 'info-off'">
        <div :class="state.infomenu ? 'top-info-on' : 'top-info-off'" >
          <h4 @click="state.infoside">info</h4>
          <span  @click="state.infoside" :class="state.infomenu ? 'info-btn' : 'info-n'">+</span>
        </div>

        <div :class="state.infomenu ? 'main-info-on' : 'main-info-off'">

          <div class="sec-1">
            <h4>Dove puoi trovarci</h4>
            <p>Borghetto | via borghetto 69</p>
          </div>

          <div class="sec-2">
            <h4>Orari d'apertura</h4>
            <div class="cont-giorni">
                <span>lunedì</span>
                <span>martedì</span>
                <span>giovedì</span>
                <span>venerdì</span>
                <span>sabato</span>
                <span>domenica</span>
            </div>
            <div class="cont-orari">
              <span class="time" >chiusi</span>         
              <span class="time" >16:00 - 22:00</span>
              <span class="time" >16:00 - 22:00</span>
              <span class="time" >16:00 - 22:00</span>
              <span class="time" >16:00 - 22:00</span>
              <span class="time" >16:00 - 22:00</span>
            </div>
          </div>

        </div>

        <div :class="state.infomenu ? 'sec-3' : 'sec-3-off'" >
          Capriccio di leo S.r.l, PI: 1231231231231, privacy policy, product by FUTURE+
        </div>

      </div>
    </div>

  </div>
</template>
<!-- 


<span>16:00 - 22:00</span> -->
<style lang="scss" scoped>
@use '../assets/styles/general.scss' as *;
.nav-link.info{


  .top-info-on{
    padding: 10px;
    width:100%;
    @include dfc;
    justify-content: space-between;
  }
  .top-info-off{
    @include dfc;
    
  }
}

.info-btn{
  transform: rotateZ(765deg);
  font-size:40px;
  padding:20px;
  transition: all .2s linear;
  
}
.info-on{
height:100%;
background-color:$c-footer-nav;
width:100%;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all .2s linear;
}
info-off{
  height:0%;
  transition: all 1s linear;

}


.main-info-off{
  display: none;
}
.main-info-on{
  @include dfc;
  flex-direction: column;
  justify-content: space-between;
  text-align:center;
  gap: 25px;
  .sec-1{

      @include dfj;
      flex-direction: column;
      gap: 10px;
      width: 100%;


      h4{
        font-size:20px;

      }
      p{
        font-size:16px;
      }
    }
  .sec-2{
    @include dfj;
    flex-wrap: wrap;
    gap: .6rem;
    width: 100%;
    justify-content: space-around;
    h4{
      
      width: 100%;
      padding-bottom:20px;
      font-size: 20px;
    }
    .cont-giorni, .cont-orari{
      font-size: 15px;
      @include dfj;
      flex-direction: column;
      gap: .3rem;
      text-align: left;
      text-transform: uppercase;
      
      .time{
        text-align: center;
      }
    }

  }
  
}
.sec-3{
  background-color: rgba(0, 0, 0, 0.43);
  font-size: 10px;
  padding: 10px;
}
.sec-3-off{
  display: none;
}


.menu-off{
  display:none;
}



.nav{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100vh;
  background-color: $c-nav;
  width: 30%;
  text-align: center;
  .top{
    @include dfc;
    justify-content: space-around;
    width: 100%;
    padding: 2rem;
    height: 60%;
    flex-direction: column;
    gap: 1rem;
    
    .nav-link{
      max-width: 150px;
      text-transform: uppercase;
     
      color: $c-nav-link;
      font-family: 'Gabarito', cursive;
      font-size: 1.8rem;
    }
    .active-link{
      color: $c-white;
    }
  }
  .bottom-footer *{
    color: $c-f-t;
  }
  .bottom-footer{
    @include dfa;
    flex-direction: column;
    justify-content: space-between;
    padding-top:7%;
    text-shadow: 1px 1px 8px black;
    height: 40%;
    width: 100%;
    background-color: $c-footer-nav;
    .sec-1{
      @include dfj;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    .sec-2{
      @include dfa;
      flex-wrap: wrap;
      gap:1rem;
      width: 100%;
      justify-content: space-around;
      h4{
        
        width: 100%;
        
      }
      .cont-giorni, .cont-orari{
        font-size: 11px;
        @include dfj;
        flex-direction: column;
        gap: .5rem;
        text-align: left;
        text-transform: uppercase;
        
        .time{
          text-align: center;
        }
      }

    }
    .sec-3{
      background-color: rgba(0, 0, 0, 0.43);
      font-size: 8px;
      padding: 10px;
    }
    
  }
}
.nav-mb-on{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: $c-nav;
  width: 100%;
  height: 100%;
  transition: all .3s linear;
}
.burger-close-on{
  transition: all 1s linear 2s;
  position: absolute;
  top: 8%;
  right: 8%;
  opacity: 1;
  transform: rotateZ(0deg);
  transition: display .3s linear;
  transition: opacity 1s linear 2s;
  transition: transform 1s linear 3s;
  .line{
    background-color: white;
    height: 30px;
    width: 5px;
    transform: rotateZ(765deg);
    position: absolute;
  }
  .l1{
    transform: rotateZ(135deg)
  }
}
.burger-close-off{
  transform: rotateZ(500deg);
  
  display: none;
  opacity: 0;
  transition: display .3s linear;
  transition: opacity 1s linear 2s;
  transition: transform 1s linear 3s;
  
}
.top-on{
  @include dfc;
  height: 100%;
  justify-content: space-around;
  flex-direction: column;
  padding: 10%;
  opacity: 1 ;
  transition: display .3s linear 1s;
  transition: opacity 5s linear 2s;
  .nav-link{

    text-transform: uppercase;
    line-height: 2rem;
    color: $c-nav-link;
    font-family: 'Gabarito', cursive;
    font-size: 1.8rem;
  }

}

.bottom-footer-on{
  display: none;
}
.nav-mb-off{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: $c-nav;
  width: 100%;
  height: 0;
  transition: all .2s linear;


}
.top-off{
  display: none;
  opacity: 0;
  transition: display .3s linear;
  transition: opacity 1s linear 2s;


}
.bottom-footer-off{
  display: none;
}
@media (max-width:$bp1) {
  .nav{
    display: none;
  }


}
@media (max-height:825px) {
  .nav{
    .top{
      gap: 0;
      height: 50%;
    }
    .bottom-footer{
      
      height: 50%;
    }
    .nav-link{

      font-size: 1.1rem !important;
    }
  }


}
</style>


