<script >
  import {state} from '../state.js'
  import sh from '../components/SHeader.vue'

  export default {
    components:{sh},
    data(){
        return{     
            state,
         //center: {lat: 51.093048, lng: 6.842120},
            
        }
    },
    created(){
      this.state.actvPage = 4;
    }
    
  }
</script>

<template>
  <div class="contatti">
    <sh/>
    <div class="cont">

      <h1>I nostri Contatti</h1>
      <div class="cnt-container">
  
        <div class="contact">
          <div class="cnt-name">email</div>
          <div class="cnt">pizzeria@gmail.com</div>
        </div>    
        <div class="contact">
          <div class="cnt-name">telefono</div>
          <a href="tel:+393334422266" class="cnt">+39 3334422266</a>
        </div>    
      </div>
  
      <div class="map">
        <h1>Dove trovarci</h1>
  
        <a href="https://www.google.com/maps/place/Pizzeria+Il+Capriccio+di+Leo/@43.5948219,13.2980245,17z/data=!3m1!4b1!4m6!3m5!1s0x132d9dbad592a331:0x349d7e3dd6b01160!8m2!3d43.5948219!4d13.3005994!16s%2Fg%2F11dxlc9msx?entry=ttu">
          <img src="../assets/img/googlemaps.png"  alt="">
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/general.scss' as *;




img{
  width: 100%;
  max-width: 600px;
}
.contatti{
  .cont{
    @include dfc;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    text-align: center;
    h1{
      text-transform: uppercase
    }
    .cnt-container{
      @include dfc;
      flex-direction: column;
      gap: 1.5rem;
      .contact{
        display: flex;
        border: 2px solid $c-white;
        color: $c-white;
        width: 320px;
        text-align: center;
        font-size: 90%;
        .cnt-name{
          width: 30%;
          border-right: 2px solid $c-white;
          padding: .5em;
          text-transform: uppercase;
          background-color: $c-red-op-med;
          
        }
        .cnt{
          color: $c-white;
          width: 70%;
          background-color: $c-black-op-med;
          padding: .5em;
      
        }
      }
    }
    
  }

}

.map{
  @include dfc;
  flex-direction: column;
  gap: 1rem;
  img{
    width: 90%;
  }
}

.btn-menu{
  display: none;
  
  text-transform: uppercase;
  background-color: $c-footer-nav;
  color: $c-nav-link;
  font-weight: bolder;
  width: fit-content;
  padding: 1rem 1rem;
  border-radius: 0 0 20px 20px ;
  
  position: absolute;
  left: 10px;
  top: 0px;

}
@media (max-width:$bp1) {.btn-menu{display:block;}}

</style>
