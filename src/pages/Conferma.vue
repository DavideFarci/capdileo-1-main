<script>
import { state } from "../state.js";
import axios from "axios";
import sh from '../components/SHeader.vue'

export default {
  components:{sh},
  
  data() {
    return {
      state,

      arrTimesSlot: [],
      arrTimesSlotApi: [],

      name: "",
      phone: "",
      idate:'',
      timeSlot: "",


      nameError: "",
      phoneError: "",
      timeError: "",
      dateError: "",
      cartError: "",

      isValid: true,
      loading: false,
      succes: false,
      DeltaMinuti: 39,
    };
  },
  methods: {
    getTimesSlots() {
      axios.get(this.state.baseUrl + "api/time").then((response) => {
        this.arrTimesSlotApi = response.data.results;
      });

    },
    getPrice(cent) {
      let num = parseFloat(cent);
      num = num / 100;
      num = "€" + num;

      return num;
    },

    order_validations() {
       this.isValid = true;

      if (!this.name) {
        this.nameError = "Il campo 'nome' è richiesto!";
        this.isValid = false;
      } else if (this.name.length < 2) {
        this.nameError = "Il campo 'nome' è troppo corto!";
        this.isValid = false;
      } else if (this.name.length > 50) {
        this.nameError = "Il campo 'name' non può superare i 50 caratteri!";
        this.isValid = false;
      }

      if (!this.phone) {
        this.phoneError = "Il campo 'N° 'telefono' è richiesto!";
        this.isValid = false;
      }
      // modificare quando verrà cambiato il tipo di dato per il telefono (numerico)
      else if (this.phone.length !== 10) {
        this.phoneError = "Il campo 'N° 'telefono' deve essere di 10 cifre!";
        this.isValid = false;
      }

      if (!this.idate) {
        this.dateError = "Seleziona una data!" ;
        this.isValid = false;
      }
      if (!this.timeSlot) {
        this.timeError = "Seleziona una fascia oraria!";
        this.isValid = false;
      }
      if (!this.state.arrId.length) {
        this.cartError = "IL tuo carrello è vuoto torna nella sezione: ";
        this.isValid = false;
      }

      if (!this.isValid) {
        return;
      }
    },

    sendOrder() {
      this.phoneError = "";
      this.nameError = "";
      this.dateError = "";
      this.timeError = "";
      this.isValid = true;
      this.order_validations();
      console.log(this.timeSlot);
      if (this.isValid) {
        this.loading = true;
        let data = {
          name: this.name,
          phone: this.phone,
          date: this.idate,
          time: this.timeSlot,
          arrId: JSON.stringify(this.state.arrId),
          arrQt: JSON.stringify(this.state.arrQt),
        };

        console.log(data);

        console.log(JSON.stringify(this.state.arrQt));
        axios.post(state.baseUrl + "api/orders", data)
        .then((response) => {
          this.success = response;
          this.loading = false;
        });
        this.name = "";
        this.phone = "";
        this.idate = "";
        this.timeSlot = "";
        this.state.arrId= [];
        this.state.arrQt= [];
        this.state.arrCart= [];
        this.arrTimesSlot= [];
        this.arrTimesSlotApi= [];
      }
    },

    removeItem(title) {
      this.state.arrCart.forEach((element, i) => {
        if (element.title == title) {
          if (element.counter >= 0) {
            element.counter--;
            element.totprice -= element.price;
            this.state.arrQt[i]--;
          }
          if (element.counter == 0) {
            let nwi = i - 1;
            this.state.arrId.splice(i, 1);
            this.state.arrQt.splice(i, 1);
            let newarrCart = this.state.arrCart.filter((element) => {
              return element.title !== title;
            });
            this.state.arrCart = [];
            this.state.arrCart = newarrCart;
          }
        }
      });
    },

    inputTime(time, id){
      this.arrTimesSlot.forEach((element, i) => {
        if(element.id == 'active'){
          element.id = i + 1
        }
        
      });
      this.arrTimesSlot.forEach((element, i) => {
        if(element.id == id){
          element.id = 'active'
        }
        
      });
      this.timeSlot = time;
      
    },

    checkData(i){
      let oggi = new Date()
      let di = new Date(i)
      
      if(di.getDate() == oggi.getDate() && di.getMonth() == oggi.getMonth() && di.getFullYear() == oggi.getFullYear() ){
        this.arrTimesSlot =[];
        this.getTimesSlots()
        console.log('oggi')
        
        let oraOggi = parseInt(oggi.getHours());
        let minOggi = parseInt(oggi.getMinutes());
        
        console.log('foreach')
        
        this.arrTimesSlotApi.forEach(element => {
          let ora     = parseInt(element.time_slot.slice(0,2));
          let min     = parseInt(element.time_slot.slice(3,5));
          
          
          if(oraOggi == ora && this.DeltaMinuti + minOggi < min ){
            console.log('true')
            
          }
          else if((ora == oraOggi + 1) && ((60 - minOggi + min) > this.DeltaMinuti)){
            
            this.arrTimesSlot.push(element)
          }
          else if(ora > oraOggi + 1){
            this.arrTimesSlot.push(element)
          }
          
        });
      }
      else if(Date.parse(di) > Date.now()){
        this.arrTimesSlot = [];
        console.log('domani')
        this.arrTimesSlot= this.state.defaultTimes
        
      }
      else {
        
        this.arrTimesSlot = [];
        console.log('scrivi un giorno accettabile')
        
        
      }
      
    }
  },
  created() {
   
    this.getTimesSlots()
  },
};
</script>

<template>
 <div class="prenota">
    <sh/>
    <div class="prenota-cont">

      <h1>Prenota il tuo Asporto</h1>

      <div class="cart">
        <div class="top-cart">
          <svg   xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>
          <div class="state.totcart">
            {{ getPrice(state.totCart)}}
          </div>

        </div>
        <div :class="state.sideCartValue ? 'content-cart' : 'ccoff'" >
          <div class="span" v-if="!state.arrCart.length && !state.sideCartValue">Il carrello è vuoto</div>
          <router-link :to="{ name: 'prenota' } "  v-if="!state.arrCart.length && !state.sideCartValue">Torna ad ORDINA D'ASPORTO</router-link>
          <div v-for="item in state.arrCart" :class="state.sideCartValue ?  'item-off' : 'item-on'" :key="item.id">
            <div>{{ item.title }}</div>
            <div>* {{ item.counter }}</div>
            <div>{{ getPrice(item.totprice) }}</div>
            <svg :class="state.sideCartValue ?  'sub-item-off' : 'sub-item-on'" @click="removeItem(item.title)"  style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="current-color" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="white"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="white"></path> </svg>
          </div>
          
        </div>
      </div>
      <div v-if="cartError" class="carterror">
        <span id="cartError">{{ cartError }}</span> 
        <span>
          <router-link :to="{ name: 'prenota' }" >ORDINA D'ASPORTO</router-link>

        </span>
        
      </div>
      
      <form class="form" id="demo-form" >

        <div class="sec-form">
          <label for="name">Nome e Cognome</label>
          <input v-model="name" type="text" placeholder="Nome e Cognome" id="name" />
          <div v-if="nameError" id="nameError">{{ nameError }}</div>
        </div>
        <div class="sec-form">
          <label for="phone">Numero di telefono</label>
          <input
            v-model="phone"
            type="text"
            onkeypress="return /[0-9]/i.test(event.key)"
            placeholder="N° telefono"
            id="phone"
          />
          <div v-if="phoneError" id="phoneError">{{ phoneError }}</div>
        </div>
        <div class="sec-form"> 
          <label for="date">Inserisci una data</label>
          <input type="date" v-model="idate" @input="checkData(idate)" id="">
          <div v-if="dateError" id="dateError">{{ dateError }}</div>
        </div>
        <div class="sec-form">
          <span>Seleziona un orario</span>
            <div class="center-orari">
              <div v-for="time in arrTimesSlot" :key="time.time_slot" >
                <div v-if="time.visible" class="badge" :class="time.id == 'active' ? 'actv' : ''" @click="inputTime(time.time_slot, time.id)"  >{{ time.time_slot }} </div>
              </div>
            </div>
            <div v-if="timeError" id="timeError">{{ timeError }}</div>
        </div>
        
  
        <button v-if="!loading"
        class="btn-send"           
        @click.prevent="sendOrder"       
        data-action='submit'>conferma</button>
  
      </form>
    </div>
  </div>
    <div v-if="loading" class="loop cubes">
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
      <div class="item cubes"></div>
    </div>

    
  </template>
  <!-- <form  action="http://127.0.0.1:8000/api/orders" method="POST">
    <button class="g-recaptcha" data-sitekey="6Ld254ooAAAAAPDhJAkgpIIaJe09mlZxpuDULufz" data-callback='onSubmit'
    data-action='submit'>Submit</button>
  </form> -->

<style scoped lang="scss">
@use "../assets/styles/general.scss" as *;


.prenota-cont::-webkit-scrollbar{
      
      width: 10px;
      height: 10px;
      
  }

.prenota-cont::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: $c-header;
    
}
.prenota-cont::-webkit-scrollbar-track {
    border-radius: 20px;
    background: rgba(52, 4, 7, 0.786);
    
}
.prenota-cont::-webkit-scrollbar-thumb:hover {
    border-radius: 20px;
    background-color: $c-nav-link;
    border: 2px solid $c-header;
    
}
.hd{box-shadow: 10px 10px 10px black; }

@media (max-width:$bp1) {.prenota{ width: 100% !important;}}
.prenota{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 70%;

  .prenota-cont{
    overflow: auto;
    height: 100%;
    padding: 1rem 1rem ;
    h1{
      text-align: center;
      text-transform: uppercase;
      padding: 1rem;
      font-size: 30px;
    }
    
    .cart{
      color: $c-nav-link;
    
      border: 1px solid $c-nav-link;
      background-color: $c-header;
      max-width: 450px;
      width: 100%;
      padding: .4rem;
      margin: 0 auto;
      border-radius: 4px;
      .top-cart{
        padding: .2rem;
        @include dfc;
        justify-content: space-between;
      }
    }
    
    
  }
  
  
}
.form{
  max-width: 450px;
  width: 100%;
  margin:  2rem auto;
  @include dfc;
  flex-direction: column;
  gap: 1rem;
  .sec-form{
  border-radius: 4px;
  width: 100%;
  border: 1px solid $c-nav-link;
  background-color: $c-footer-nav;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  input{
    background-color: #fe425200;
    border: 1px solid $c-nav-link;
    color: $c-nav-link;
    padding: 1rem;
    border-radius: .4em
  }
}
::-webkit-calendar-picker-indicator{
  color: white;
  background-color: $c-nav-link;
  border-radius: 2px;
  padding: 3px;
  
}
.btn-send{
      border: 1px solid $c-nav-link;
      background-color: $c-header;
      max-width: 450px;
      width: 100%;
      padding: .4rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 20px;
      margin-top: 10px;
      border-radius: .4em;
    }

.center-orari{
  @include dfc;
  flex-wrap: wrap;
}
.badge{
  border: 2px solid white;
  border-radius: 300px;
  width: 70px;
  text-align: center;
  padding: 5px ;
  margin: 5px;
}
.badge-off{
  background-color: rgb(210, 32, 19);
  padding: 5px 10px;
  margin: 5px;
}
}

.content-cart{
  height: 0;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  transition: all .2s linear ;
}
.ccoff{
  padding: 2rem;
  height: 100%;
  display: block;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all .2s linear ;
  
  
}
.item-off{
  opacity: 0;
  display: flex;
  justify-content: space-between;
  transition: all .2s linear .2s;
  
}
.item-on{
  display: flex;
  justify-content: space-between;
  height: auto;
  opacity: 1;
  transition: all .2s linear .2s;
  div{
    width: 45%;
  }
  svg{
    width: 10%;
  }
  
}

@media (max-width:$bp2) {
  .card{
    width: 95% !important;
  }
}

.actv{
  color: $c-header;
  background-color: white !important;;
}



::placeholder {
  opacity: 1;
  color: $c-nav-link;
}

#nameError,
#phoneError,
#timeError,
#cartError,
#dateError {
  text-align: center;
  font-size: 0.8em;
  color: red;
  margin-top: 0.3rem;
}

.carterror{
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: .3rem;

}















.btn_loading {
  cursor: wait;
}
//loader
.cubes {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
}

.loop {
  transform: rotateX(-35deg) rotateY(-45deg) translateZ(1.5625em);
}

@keyframes s {
  to {
    transform: scale3d(0.2, 0.2, 0.2);
  }
}

.item {
  margin: -1.5625em;
  width: 3.125em;
  height: 3.125em;
  transform-origin: 50% 50% -1.5625em;
  box-shadow: 0 0 0.125em currentColor;
  background: currentColor;
  animation: s 0.6s cubic-bezier(0.45, 0.03, 0.51, 0.95) infinite alternate;
}

.item:before,
.item:after {
  position: absolute;
  width: inherit;
  height: inherit;
  transform-origin: 0 100%;
  box-shadow: inherit;
  background: currentColor;
  content: "";
}

.item:before {
  bottom: 100%;
  transform: rotateX(90deg);
}

.item:after {
  left: 100%;
  transform: rotateY(90deg);
}

.item:nth-child(1) {
  margin-top: 6.25em;
  color: #fe1e52;
  animation-delay: -1.2s;
}

.item:nth-child(1):before {
  color: #ff6488;
}

.item:nth-child(1):after {
  color: #ff416d;
}

.item:nth-child(2) {
  margin-top: 3.125em;
  color: #fe4252;
  animation-delay: -1s;
}

.item:nth-child(2):before {
  color: #ff8892;
}

.item:nth-child(2):after {
  color: #ff6572;
}

.item:nth-child(3) {
  margin-top: 0em;
  color: #fe6553;
  animation-delay: -0.8s;
}

.item:nth-child(3):before {
  color: #ffa499;
}

.item:nth-child(3):after {
  color: #ff8476;
}

.item:nth-child(4) {
  margin-top: -3.125em;
  color: #fe8953;
  animation-delay: -0.6s;
}

.item:nth-child(4):before {
  color: #ffb999;
}

.item:nth-child(4):after {
  color: #ffa176;
}

.item:nth-child(5) {
  margin-top: -6.25em;
  color: #feac54;
  animation-delay: -0.4s;
}

.item:nth-child(5):before {
  color: #ffce9a;
}

.item:nth-child(5):after {
  color: #ffbd77;
}

.item:nth-child(6) {
  margin-top: -9.375em;
  color: #fed054;
  animation-delay: -0.2s;
}

.item:nth-child(6):before {
  color: #ffe49a;
}

.item:nth-child(6):after {
  color: #ffda77;
}



</style>
