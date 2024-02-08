<script>
import { state } from "../state.js";
import axios from "axios";
import sh from "../components/SHeader.vue";
import AppCalendar from "../components/AppCalendar.vue";

export default {
  components: { sh, AppCalendar },

  data() {
    return {
      state,
      orderValues: {
        anno: "",
        mese: "",
        giorno: "",
        orario: "",
        nome: "",
        email: "",
        telefono: null,
        messaggio: "",
        privacy: false,
      },
      inputs: [
        {
          name: "nome",
          label: "Nome *",
          type: "text",
        },
        {
          name: "email",
          label: "Email *",
          type: "email",
        },
        {
          name: "telefono",
          label: "Telefono *",
          type: "text",
        },
        {
          name: "messaggio",
          label: "Messaggio",
          type: "text",
        },
      ],
      cartError: "",
      loading: false,
    };
  },
  methods: {
    removeItem(i) {
      if (this.state.arrCart[i].counter >= 0) {
        this.state.arrCart[i].counter--;
        this.state.arrCart[i].totprice =
          (this.state.arrCart[i].totprice /
            (this.state.arrCart[i].counter + 1)) *
          this.state.arrCart[i].counter;

        if (this.state.arrCart[i].counter == 0) {
          this.state.arrCart.splice(i, 1);
        }
      }
      this.getTot();

      const jsonCart = JSON.stringify(this.state.arrCart);
      localStorage.setItem("cart", jsonCart);
    },
    getTot() {
      this.state.totCart = 0;
      this.state.arrCart.forEach((element) => {
        console.log(element.totprice);
        this.state.totCart = this.state.totCart + element.totprice;
      });
    },
    getPrice(cent, sum) {
      if (sum) {
        // console.log(cent)
        // console.log(sum)
        let num1 = parseFloat(cent);

        let num = (num1 + sum) / 100;
        num = "€" + num;
        return num;
      } else {
        let num = parseFloat(cent);
        num = num / 100;
        num = "€" + num;
        return num;
      }
    },
  },
  created() {
    localStorage.getItem("cart") &&
      (this.state.arrCart = JSON.parse(localStorage.getItem("cart")));
    this.getTot;
  },
};
</script>

<template>
  <div class="prenota">
    <sh />
    <div class="prenota-cont">
      <h1>Prenota il tuo Asporto</h1>

      <div class="cart">
        <div class="top-cart" @click="opencart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
        </div>
        <div :class="state.sideCartValue ? 'content-cart' : 'ccoff'">
          <div class="" v-if="!state.arrCart.length && !state.sideCartValue">
            Il carrello è vuoto
          </div>
          <div class="top-content-cart">
            <div
              v-for="(item, i) in state.arrCart"
              :class="state.sideCartValue ? 'item-off' : 'item-on'"
              :key="item.id"
            >
              <div class="top-item">
                <h4>{{ item.title }}</h4>
                <div>* {{ item.counter }}</div>
                <div>{{ getPrice(item.totprice) }}</div>
                <svg
                  :class="state.sideCartValue ? 'sub-item-off' : 'sub-item-on'"
                  @click="removeItem(i)"
                  style="color: white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="current-color"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                    fill="white"
                  ></path>
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    fill="white"
                  ></path>
                </svg>
              </div>
              <div
                class="bottom-item"
                v-if="
                  item.deselected.length !== 0 || item.addicted.length !== 0
                "
              >
                <h3>modifiche</h3>
                <div class="removed">
                  <div class="" v-for="i in item.deselected" :key="i">
                    - {{ i }}
                  </div>
                </div>
                <div class="addicted">
                  <div class="" v-for="i in item.addicted" :key="i">
                    +{{ i }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-content-cart">
            <div class="totcart">
              <span>TOTALE:</span>
              <span>
                {{ getPrice(state.totCart) }}
              </span>
            </div>
          </div>
          <router-link :to="{ name: 'prenota' }" class="next"
            >AGGIUNGI ALTRI PRODOTTI</router-link
          >
        </div>
      </div>
      <div v-if="cartError" class="carterror">
        <span id="cartError">{{ cartError }}</span>
        <span>
          <router-link :to="{ name: 'prenota' }">ORDINA D'ASPORTO</router-link>
        </span>
      </div>

      <AppCalendar
        :formValues="orderValues"
        :inputs="inputs"
        :reservation="false"
      />
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

.prenota-cont::-webkit-scrollbar {
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
.hd {
  box-shadow: 10px 10px 10px black;
}

@media (max-width: $bp1) {
  .prenota {
    width: 100% !important;
  }
}
.prenota {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 70%;

  .prenota-cont {
    overflow: auto;
    height: 100%;
    padding: 1rem 1rem;
    padding-top: 15%;
    h1 {
      text-align: center;
      text-transform: uppercase;
      padding: 1rem;
      font-size: 30px;
    }
    .cart {
      color: $c-nav-link;

      border: 1px solid $c-nav-link;
      background-color: $c-header;
      width: 90%;
      border-radius: 4px;
      padding: 0.4rem;
      margin: 0 auto;
      .top-cart {
        padding: 0.2rem;
        @include dfc;
        justify-content: space-between;
      }
    }
    .next {
      border: 2px solid white;
      text-transform: uppercase;
      padding: 5px;
      text-align: center;
      border-radius: 5px;
    }
    .content-cart {
      height: 0;
      padding: 0rem;
      display: flex;
      flex-direction: column;
      transition: all 0.2s linear;
    }
    .ccoff {
      padding: 1rem;
      height: 100%;
      display: block;
      transition: all 0.2s linear;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      text-transform: uppercase;
      .top-content-cart {
        display: flex;
        flex-direction: column;
        gap: 2px;
        width: 100%;
      }
      .bottom-content-cart {
        .totcart {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .item-off {
      opacity: 0;
      display: flex;
      justify-content: space-between;
      transition: all 0.2s linear 0.2s;
    }
    .item-on {
      display: flex;
      flex-direction: column;
      border: 1px solid white;
      height: auto;
      opacity: 1;
      transition: all 0.2s linear 0.2s;
      gap: 1rem;
      padding: 15px;
      .top-item {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 0.5fr;
      }
      .bottom-item {
        display: flex;
        //flex-direction: column;

        flex-wrap: wrap;
        justify-content: space-between;
        // border: 2px solid rgb(11, 21, 116);
        h3 {
          width: 100%;
          text-align: center;
        }
        .removed,
        .addicted {
          text-transform: lowercase;
          padding: 5px;
          width: 48%;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        @media (max-width: $bp2) {
          .removed,
          .addicted {
            width: 100% !important;
          }
        }
        .removed {
          // border: 2px solid rgb(11, 116, 71);
        }
        .addicted {
          // border: 2px solid rgb(113, 11, 116);
        }
      }

      svg {
        width: 90%;
      }
    }
  }
}
.content-cart {
  height: 0;
  padding: 0rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s linear;
}

@media (max-width: $bp2) {
  .card {
    width: 95% !important;
  }
  .month-container {
    flex-direction: column !important;
  }
}

.actv {
  color: $c-header;
  background-color: white !important;
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

.carterror {
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 0.3rem;
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
