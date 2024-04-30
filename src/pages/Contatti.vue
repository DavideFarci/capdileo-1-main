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

      <div class="cnt-container">
        <h1>I nostri Contatti</h1>
  
        <div class="contact">
          <div class="cnt-name">email</div>
          <a href="mailto:96leonardorocchetti@gmail.com" class="cnt">96leonardorocchetti@gmail.com</a>
        </div>    
        <div class="contact">
          <div class="cnt-name">telefono</div>
          <a href="tel:3663694915" class="cnt">+39 3663694915</a>
        </div>    
      </div>
  
      <div class="map">
        <h1>Dove trovarci</h1>
  
        <a href="https://www.google.com/maps/place/Pizzeria+Il+Capriccio+di+Leo/@43.5948219,13.2980245,17z/data=!3m1!4b1!4m6!3m5!1s0x132d9dbad592a331:0x349d7e3dd6b01160!8m2!3d43.5948219!4d13.3005994!16s%2Fg%2F11dxlc9msx?entry=ttu">
          <div class="ov"></div>
          <p>tocca per aprire google maps</p>
          <img draggable="false" src="../assets/img/googlemaps.png"  alt="">
        </a>
      </div>

      <div class="social">
        <h1>Seguici sui Social</h1>
        <div class="card">
          <a href="https://www.instagram.com/il_capriccio_di_leo/?hl=it" class="socialContainer containerOne">
            <svg class="socialSvg instagramSvg" viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path> </svg>
          </a>     
          <a href="#" class="socialContainer containerThree" title="in arrivo...">
            <svg class="socialSvg instagramSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
              <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/IlCapricciodiLeo/" class="socialContainer containerTwo">
            <svg class="socialSvg instagramSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" iewBox="0 0 16 16">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
            </svg>
          </a>
        </div>             


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
    gap: 4em;
    padding: 2rem;
    padding-top: 20%;
    text-align: center;
    h1{
      text-transform: uppercase
    }
    .cnt-container{
      @include dfc;
      flex-direction: column;
      gap: 1.5rem;
      width: clamp(300px, 60%, 450px);
      .contact{
        font-size:  clamp( 13px, 2.3vw, 17px);
        display: flex;
        overflow: hidden;
        color: $c-white;
        width: 100%;
        text-align: center;
        border-radius: 20px;
        
        .cnt-name{
          width: 30%;
       
          padding: 1em ;
          text-transform: uppercase;
          background-color: $c-red-op-med;
          
        }
        .cnt{
          color: $c-white;
          width: 70%;
          background-color: rgb(72, 49, 49);
          padding: 1em;
      
        }
      }
    }
    
  }

}

.map{
  @include dfc;
  flex-direction: column;
  gap: 2em;
  a{

    position: relative;
  }
  img{
    position: relative;
    width: 90%;
    border-radius: 30px;
    z-index: 1;
  }
  p{
    z-index: 3;
    position: absolute;
    top: 45%;
    left: 0;
    text-align: center;
    width: 100%;
    font-size: clamp(20px, 2.5vw, 28px);
    text-shadow: 3;

  }
  .ov{
    border-radius: 30px;

    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.337);
    z-index: 2;
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


.social{
  @include dfc;
  flex-direction: column;
  gap: 2em;
}
.card {
  width: fit-content;
  height: fit-content;
  background-color:rgb(72, 49, 49);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  gap: 13px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.055);
  border-radius: 100px;
}

/* for all social containers*/
.socialContainer {
  width: 52px;
  height: 52px;
  background-color: rgba(101, 15, 15, 0.563);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition-duration: .3s;
}
/* instagram*/
.containerOne:hover {
  background-color: #d62976;
  transition-duration: .3s;
}
/* twitter*/
.containerTwo:hover {
  transition-duration: .3s;
  background-color: #0e2972;
}
/* linkdin*/
.containerThree:hover {
  background-color: #55068a;
  transition-duration: .3s;
}

.socialContainer:active {
  transform: scale(0.9);
  transition-duration: .3s;
}

.socialSvg {
  width: 17px;
}

.socialSvg path {
  fill: rgb(255, 255, 255);
}

.socialContainer:hover .socialSvg {
  animation: slide-in-top 0.3s both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}


</style>
