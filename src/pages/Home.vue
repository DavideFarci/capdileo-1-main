<script>
import { state } from "../state.js";
import axios from "axios";
import sHeader from "../components/SHeader.vue";
export default {
  components: { sHeader },

  data() {
    return {
      state,
      asporto: false,
      tavoli: false,
    };
  },
  methods:{
    actvpage(){
      localStorage.setItem("actvPage", 1);
      
    }
  },
  async created() {
    const settings = await axios.get(state.baseUrl + "api/setting", {});
    this.state.setting = settings.data.results;
    if (this.state.setting[0].status) {
      this.asporto = true;
    }
    if (this.state.setting[1].status) {
      this.tavoli = true;
    }
   
    this.state.actvPage = 1;
  },
};
</script>

<template>
  <div class="home">
    <sHeader class="hd" />
    <div class="main-home">
      <div class="par par-1" id="par1" >
        <div class="overlay">
          <div class="arrow">
            1
            <a @click="actvpage" href="#par2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </a>
          </div>
          <div class="t-c">
            <h2 id="h2par1">
               HAI <br> 
              <span class="s2">FAME?</span>
            </h2>
            <span
              >La serata perfetta non esist…e invece esiste eccome!
              Parte proprio dal pasto perfetto 😎
            </span>
          </div>
          <router-link :to="{ name: 'prenota' }" class="btn" v-if="asporto">Prenota asporto</router-link>
          <a href="tel:3663694915" class="btn" v-if="!asporto">Prenota asporto</a>
        </div>
      </div>
      <div class="par par-2" id="par2">
        <div class="overlay">
          <div class="arrow">
            <a @click="actvpage" href="#par1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
            </a>
            2
          </div>
          <div class="t-c">
            <h2 id="h2par3">SCOPRI IL NOSTRO MENU</h2>
            <span>
              Se ancora non hai provato le nostre sfiziosità...
            </span>
          </div>
          <router-link :to="{ name: 'menu' }" @click="state.actvPage = 2" class="btn">Menù</router-link>
        </div>
      </div>
      <!-- <div class="par par-3" id="par3" v-if="tavoli">
        <div class="overlay">
          <div class="arrow">
            <a @click="actvpage" href="#par1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
            </a>
            3
            
          </div>
          <div class="t-c">
            <h2 id="h2par2">
              <span class="s1 s1-m">PRENOTA ORA</span> IL TUO
              <span class="s2 s2-m">TAVOLO</span>
            </h2>
            <span
              >E se volessi cenare proprio da noi? Prenota subito il tuo tavolo
              ti aspettiamo a cena da noi!</span
            >
          </div>
          <router-link :to="{ name: 'prenotaServizio' }" class="btn"
            >Prenota un tavolo</router-link
          >
        </div>
      </div>      -->
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;

* {
  font-family: "Gabarito", cursive;
}

.main-home::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.main-home::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.main-home::-webkit-scrollbar-track {
  border-radius: 20px;
  background: rgba(52, 4, 7, 0.786);
}
.main-home::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
}

.home {
  position: fixed;
  bottom: 0;
  right: 0;
  overflow: hidden;
  padding-bottom: 1rem;
  height: 100%;
  .main-home {
    margin-left: 1rem;
    padding-bottom: 1rem;
    
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
    height: calc(100% - 85px);
    width: calc(100% - 2rem);
    //margin-left: 2rem;
    display: flex;
    gap: 3rem;

    .arrow {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      padding: 10px;
      gap: 0.4rem;
      font-size: clamp(25px, 3vw, 20px);
      opacity: .7;
    }
    .par {
      scroll-snap-align: start;
      flex: 1 0 auto;
      height: 100%;
      width: 100% !important;
      color: $c-white;
      //filter: grayscale(50);
      background-position: center bottom;
      background-size: cover;
      position: relative;
      .overlay {
        background: linear-gradient(rgba(0, 0, 0, 0.832), rgba(0, 0, 0, 0.359));
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;

        padding: 2rem;
        @include dfc;
        gap: 2rem;
        justify-content: space-between;
        .t-c {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 70%;
          font-size: clamp(19px, 2vw, 25px);
          h2 {
            line-height: 100%;
            max-width: 200px;
            font-size: clamp(35px, 4vw, 60px);
            .s1 {
              font-size: 115%;
            }
            .s2 {
              font-size: 140%;
            }
          }
        }
      }
    }
  }
}
.par-1 {
  background-image: url("../assets/img/pizza-4.png");
  background-position: center !important;
}
.par-2 {
  background-image: url("../assets/img/asporto.jpg");
}
.par-3 {
  background-image: url("../assets/img/pizza-olio.png");
}
@media (max-width: $bp2) {
  .home {
    padding: 0 !important;
    
  }
  .main-home {
    padding: 0 !important;
    margin: 0 !important;
    width: 100% !important;
    height: calc(100% - 45vh) !important;
  }
  .overlay {
    
    flex-direction: column !important;
    justify-content: flex-end !important; 
    .par{
      
    }
  }

  #h2par1,
  #h2par2,
  #h2par3 {
    font-size: 28px;
  }
}

</style>
