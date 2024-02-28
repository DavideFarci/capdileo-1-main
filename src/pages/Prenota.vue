<script>
import { state } from "../state.js";
import axios from "axios";
import sh from "../components/SHeader.vue";

export default {
  components: { sh },

  data() {
    return {
      state,
      arrProduct: [],
      arrCategory: [],
      categoryId: 0,
      name: "",
      phone: "",
      time: "",
      actvcat: 1,
      arrIngredient: [],
      selectedItem: {
        name: "",
        id: "",
        image: "",
        tags: [],
        deselected: [],
        addicted: [],
        price_variation: 0,
        price: 0,
        counter: 1,
        expanded: 0,
        opened: false,
        category_slot: '',
        category_type: '',
      },
      arrCorrectIngredient: [],
    };
  },
  methods: {
    getProduct(cat) {
      this.arrProduct = [];
      (this.categoryId = cat),
        axios
          .get(this.state.baseUrl + "api/projects", {
            params: {
              category: this.categoryId,
            },
          })
          .then((response) => {
            this.arrProduct = response.data.results.data;
            this.arrProduct.forEach((element) => {
              element.deselected = [];
              this.arrCategory.forEach(e => {
                if(element.category_id == e.id){
                  element.category_slot = e.slot; 
                  element.category_type = e.type; 
                }
                
              });
              element.tags.forEach((element) => {
                element.deselected = 0;
              });
            });
          });
    },

    getIngredients() {
      this.arrIngredient = [];
      axios.get(state.baseUrl + "api/tag", {}).then((response) => {
        let firstarrIngredient = response.data.results;
        firstarrIngredient.forEach(element => {
          if(element.price !== 0){
            this.arrIngredient.push(element) 
          }
        });
        this.arrIngredient.forEach((element) => {
          element.active = false;
        });
      });
    },
    getCategory() {
      axios.get(state.baseUrl + "api/categories", {}).then((response) => {
        this.arrCategory = response.data.results;
      });
    },
    changeCategory(value) {
      if (value == 1) {
        this.getProduct(0);
        this.actvcat = value;
      } else {
        this.getProduct(value);
        this.actvcat = value;
      }
    },

    esp(array, stringaDaEliminare) {
      return array.filter(function (elemento) {
        return elemento !== stringaDaEliminare;
      });
    },
    openShow(name, id, tags, price, image, cat, type) {
      this.selectedItem.name = name;
      this.selectedItem.id = id;
      this.selectedItem.tags = tags;
      this.selectedItem.image = image;
      this.selectedItem.price = price;
      this.selectedItem.opened = true;
      this.arrCorrectIngredient = [];
      this.selectedItem.category_slot = cat;
      this.selectedItem.category_type = type;

 
      this.openIng();
    },
    closeShow() {
      this.selectedItem.name = "";
      this.selectedItem.id = "";
      this.selectedItem.tags = [];
      this.selectedItem.deselected = [];
      this.selectedItem.addicted = [];
      this.selectedItem.image = "";
      this.selectedItem.price = 0;
      this.selectedItem.counter = 1;
      this.selectedItem.expanded = 0;
      this.selectedItem.price_variation = 0;
      this.selectedItem.opened = false;
      this.selectedItem.category_slot = '';
      this.arrCorrectIngredient = [];
      this.arrProduct.forEach((element) => {
        element.tags.forEach((element) => {
          element.deselected = 0;
        });
      });
      this.arrCorrectIngredient.forEach((element) => {
        element.active = false;
      });
    },

    addremoveTagDefault(nametag, ar) {
      if (ar == "remove") {
        this.selectedItem.deselected.push(nametag);
        this.selectedItem.tags.forEach((element) => {
          if (element.name == nametag) {
            element.deselected = 1;
          }
        });
      } else {
        this.selectedItem.deselected = this.esp(
          this.selectedItem.deselected,
          nametag
        );
        this.selectedItem.tags.forEach((element) => {
          if (element.name == nametag) {
            element.deselected = 0;
          }
        });
      }
    },
    addRemoveExtraTag(nametag, price, ar) {
      if (ar == "remove") {
        this.selectedItem.addicted.push(nametag);
        this.selectedItem.price_variation =
          this.selectedItem.price_variation + price;
        this.arrCorrectIngredient.forEach((element) => {
          if (element.name == nametag) {
            element.active = true;
          }
        });
      } else {
        this.selectedItem.addicted = this.esp(
          this.selectedItem.addicted,
          nametag
        );
        this.selectedItem.price_variation =
          this.selectedItem.price_variation - price;
        this.arrCorrectIngredient.forEach((element) => {
          if (element.name == nametag) {
            element.active = false;
          }
        });
      }
    },
    removeExtraTagShow(nome) {
      this.selectedItem.addicted = this.esp(this.selectedItem.addicted, nome);
      this.arrCorrectIngredient.forEach((element) => {
        if (element.name == nome) {
          this.selectedItem.price_variation =
            this.selectedItem.price_variation - element.price;
          element.active = false;
        }
      });
    },

    newItem(p_id, title, counter, totprice, addicted, deselected, slot, type) {
      let newitem = {
        p_id,
        title,
        counter,
        totprice,
        deselected,
        addicted,
        slot,
        type,
      };
      return newitem;
    },

    addItem() {
      if (this.selectedItem.counter <= 0) {
        return console.log("ci hai provato amico!");
      }
      let check = false;
      let second_check = false;
      let double_check = false;
      let r_id = "";

      if (this.selectedItem.deselected.length == 0 && this.selectedItem.addicted.length == 0) {
        this.state.arrCart.forEach((element, i) => {
          if (
            element.p_id == this.selectedItem.id &&
            element.deselected.length == 0 &&
            element.addicted.length == 0
          ) {
            element.totprice =
              (element.counter + this.selectedItem.counter) *
              (element.totprice / element.counter);
            element.counter += this.selectedItem.counter;
            check = true;
          }
        });
      } else {
        this.state.arrCart.forEach((element, i) => {
          if (element.p_id == this.selectedItem.id) {
            if (
              this.selectedItem.addicted.length == element.addicted.length &&
              this.selectedItem.deselected.length == element.deselected.length
            ) {
              element.deselected.forEach((e) => {
                if (!this.selectedItem.deselected.includes(e)) {
                  second_check = true;
                }
              });
              element.addicted.forEach((e) => {
                if (!this.selectedItem.addicted.includes(e)) {
                  second_check = true;
                }
              });
              if (!second_check) {
                r_id = i;
                double_check = true;
              }
            }
          }
        });
        this.state.arrCart.forEach((element, i) => {
          if (double_check && i == r_id) {
            element.totprice =
              (element.counter + this.selectedItem.counter) *
              (element.totprice / element.counter);
            element.counter += this.selectedItem.counter;
            check = true;
          }
        });
      }

      //se l'item non era gia presente lo aggiungo ora per la prima volta a tutti gli array
      if (!check) {
        let newitem = this.newItem( 
          this.selectedItem.id, 
          this.selectedItem.name, 
          this.selectedItem.counter, 
          (parseInt(this.selectedItem.price) + this.selectedItem.price_variation) * this.selectedItem.counter, 
          this.selectedItem.addicted, 
          this.selectedItem.deselected, 
          this.selectedItem.category_slot,
          this.selectedItem.category_type
        );

        this.state.arrCart.push(newitem);
      }
      //ricalcolo il totale
      this.getTot();
      //reimposto il counter a 1
      this.selectedItem.counter = 1;
      //riporto gli ingredienti deselezionati alla stato di default
      this.arrProduct.forEach((element) => {
        element.deselected = [];
        element.tags.forEach((element) => {
          element.deselected = 0;
        });
      });
      this.closeShow();

      const jsonCart = JSON.stringify(this.state.arrCart);
      localStorage.setItem("cart", jsonCart);
    },
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

    fixtag(arr) {
      let arrtag = "";
      arr.forEach((element, i) => {
        if (i + 1 == arr.length) {
          arrtag = arrtag + element.name + ".";
        } else {
          arrtag = arrtag + element.name + ", ";
        }
      });
      return arrtag;
    },
    getPrice(cent, sum) {
      if (sum) {
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
    opencart() {
      if (state.sideCartValue) {
        state.sideCartValue = 0;
      } else {
        state.sideCartValue = 1;
      }
    },
    modCounter(ud) {
      if (ud == "up") {
        this.selectedItem.counter++;
      } else if (ud == "down") {
        if (this.selectedItem.counter > 1) {
          this.selectedItem.counter--;
        }
      }
    },
    getTot() {
      this.state.totCart = 0;
      this.state.nPezzi[0] = 0;
      this.state.nPezzi[1] = 0;
      this.state.arrCart.forEach((element) => {
        this.state.totCart = this.state.totCart + element.totprice;
        if(element.type == 'q'){
          this.state.nPezzi[0] +=( parseInt(element.slot) * element.counter);
        }else if(element.type == 't'){
          console.log(this.state.nPezzi)
          this.state.nPezzi[1] += (parseInt(element.slot) * element.counter)
        }

      }); 
    },
    openIng() {
      let obs = false;
      this.arrIngredient.forEach((element) => {
        this.selectedItem.tags.forEach((e) => {
          if (element.name == e.name) {
            obs = true;
          }
        });
        if (obs) {
          obs = false;
        } else {
          this.arrCorrectIngredient.push(element);
        }
      });
      this.arrCorrectIngredient.forEach((element) => {
        element.active = false;
      });
    },
  },
  created() {
    localStorage.getItem("cart") &&
    (this.state.arrCart = JSON.parse(localStorage.getItem("cart")));
    this.getTot();

    this.getProduct(0);
    this.getCategory();
    this.getIngredients();

  },
};
</script>
<!-- :class="state.sideCartValue ?  'sub-item-off' : 'sub-item-on tag'" -->
<template>
  <div class="prenota">
    <sh />
    <div class="prenota-cont">
      <h1>Prenota il tuo Asporto</h1>
      <div class="categorie">
        <div
          v-for="cat in arrCategory"
          :key="cat.id"
          class="category"
          :class="actvcat == cat.id ? 'category-on' : ''"
          @click="changeCategory(cat.id)"
        >
          <span :class="actvcat == cat.id ? 'span-on' : ''">{{
            cat.name
          }}</span>
        </div>
      </div>
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
          <router-link
            :to="{ name: 'conferma' }"
            v-if="state.arrCart.length && !state.sideCartValue"
            class="next"
            >Completa la tua ordinazione</router-link
          >
        </div>
      </div>

      <div class="main-prenota">
        <div  class="card-default" @click="openShow(item.name, item.id, item.tags, item.price, item.image, item.category.slot, item.category.type)" v-for="item in arrProduct" :key="item.id" >
          <img :src="state.getImageUrl(item.image)" alt="" />

          <div class="title">{{ item.name }}</div>
          <div class="c-tp">
            <div class="tags">
              <span  :class="item.category_slot == 0 ? 'desc' : 'def_tag'" >{{ fixtag(item.tags) }}</span>
            </div>
            <div class="price">{{ getPrice(item.price) }}</div>
          </div>
        </div>
        <div v-if="selectedItem.opened" @click="closeShow" class="overlay"></div>
        <div class="card-show" v-if="selectedItem.opened">
          <div class="img-title">
            <h3 class="title">{{ selectedItem.name }}</h3>
            <img :src="state.getImageUrl(selectedItem.image)" alt="" />
          </div>
          <div class="close" v-if="selectedItem.opened" @click="closeShow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-return-left"
              viewBox="0 0 16 16"
              draggable="false"
            >
              <path
                fill-rule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"
              />
            </svg>
          </div>

          <div class="content">
            <div class="tags" v-if="!selectedItem.expanded  && selectedItem.category_slot > 0">
              <h3>Modifica ingredienti:</h3>
              <div class="tags-c">

                <div v-for="tag in selectedItem.tags" :key="tag.name">
                  <span
                    class="tag-pills"
                    :class="tag.deselected ? 'tag-off' : ''"
                    @click="addremoveTagDefault(tag.name, 'remove')"
                    v-if="!tag.deselected"
                    >- {{ tag.name }}</span
                  >
                  <span
                    class="tag-pills"
                    :class="tag.deselected ? 'tag-off' : ''"
                    @click="addremoveTagDefault(tag.name)"
                    v-if="tag.deselected"
                    >+ {{ tag.name }}</span
                  >
                </div>
              </div>
            </div>
            <div class="description" v-if="selectedItem.category_slot == 0">
              <h3>Descrizione:</h3>
              <div class="desc">
                <span class="def_tag" >{{ fixtag(selectedItem.tags) }}</span>
                <!-- <span v-for="tag in selectedItem.tags" :key="tag.name" > {{ tag.name }}</span> -->
              </div>
            </div>
            <div class="extra-tags" v-if="!selectedItem.expanded && selectedItem.addicted.length  && selectedItem.category_slot > 0" >
              <h3>Ingredienti extra:</h3>
              <div class="et-c">

                <span
                  class="tag-pills"
                  v-for="i in selectedItem.addicted"
                  :key="i"
                  @click="removeExtraTagShow(i)"
                  >- {{ i }}</span
                >
              </div>
            </div>
            <div class="add-ingredient" v-if="selectedItem.category_slot > 0" :class="selectedItem.expanded ? '' : 'add-off'">
              <img
                :class="selectedItem.expanded ? 'open' : ''"
                v-if="selectedItem.expanded"
                @click="selectedItem.expanded = !selectedItem.expanded"
                src="../assets/img/plus.png"
                alt=""
                draggable="false"
              />

              <h3 @click="selectedItem.expanded = !selectedItem.expanded">
                Aggiungi un ingrediente
              </h3>
              <img
                draggable="false"
                v-if="!selectedItem.expanded"
                @click="selectedItem.expanded = !selectedItem.expanded"
                src="../assets/img/plus.png"
                alt=""
              />
              <div
                class=""
                :class="selectedItem.expanded ? 'cont_ex_ing' : 'cont_ex_off'"
              >
                <div
                  class="ex_ing tag-pills"
                  :class="ing.active ? 'tag-off' : ''"
                  v-for="(ing, i) in arrCorrectIngredient"
                  :key="i"
                >
                  <span
                    class="minus"
                    @click="addRemoveExtraTag(ing.name, ing.price)"
                    v-if="ing.active"
                    >- {{ ing.name }}</span
                  >
                  <span
                    class="plus"
                    @click="addRemoveExtraTag(ing.name, ing.price, 'remove')"
                    v-if="!ing.active"
                    >+ {{ ing.name }}</span
                  >

                  <span>{{ getPrice(ing.price) }}</span>
                </div>
              </div>
            </div>

            <div class="add">
              <div class="sec">
                <span class="plus" @click="modCounter('down')">-</span>
                <span class="counter">{{ selectedItem.counter }}</span>
                <span class="minus" @click="modCounter('up')">+</span>
              </div>
              <div class="mybtn" @click="addItem()">aggiungi</div>
              <div class="price">
                {{
                  getPrice(
                    parseInt(selectedItem.price) * selectedItem.counter,
                    parseInt(selectedItem.price_variation) *
                      selectedItem.counter
                  )
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
.add-ingredient::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.add-ingredient::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.add-ingredient::-webkit-scrollbar-track {
  border-radius: 20px;
  background: rgba(64, 18, 21, 0);
}
.add-ingredient::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
}
.extra-tags::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.extra-tags::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.extra-tags::-webkit-scrollbar-track {
  border-radius: 20px;
  background: rgba(52, 4, 7, 0.786);
}
.extra-tags::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
}
.tags-c::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  
}

.tags-c::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.tags-c::-webkit-scrollbar-track {
  border-radius: 20px;
  background: rgba(52, 4, 7, 0.786);
}
.tags-c::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
}
.hd {
  box-shadow: 10px 10px 10px black;
}

.prenota {
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .prenota-cont {
    overflow: auto;
    height: 100%;
    padding: 15% 1rem;
    h1 {
      text-align: center;
      text-transform: uppercase;
      padding: 1rem;
      font-size: 30px;
    }

    .main-prenota {
      @include dfc;
      margin: 2rem 0;
      flex-wrap: wrap;
      gap: 1rem;

      .card-default {
        width: calc((100% - 2rem) / 2);
        height: 150px;
        position: relative;
        border-radius: 150px 0 0 150px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;

        img {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          aspect-ratio: 1;
          border-radius: 150px;
          object-fit: cover;
        }
        .title {
          padding: 1rem;
          text-align: left;
          width: calc((100% - 150px));
          text-transform: uppercase;
        }
        .c-tp {
          background-color: #410606;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;

          .tags,
          .price {
            border-radius: 10px;
            width: calc((100% - 150px - 15px));
            padding-right: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .tags {
            display: flex;
            padding-top: 0.5rem;
            padding-right: 0.5rem;
            span {
              font-size: 10px;
              font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
              font-weight: bold !important;

              text-overflow: ellipsis;
            }
            .desc{
              max-width: 100%;
              white-space: nowrap;
              overflow:hidden;
            }
          }
          .price {
            width: 100%;
            //border-radius: 10px ;
            text-align: right;
          }
        }
      }
      .overlay {
        position: fixed;
        z-index: 2000;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.629);
      }
      .card-show {
        position: fixed;
        z-index: 3000;
        right: 0;
        bottom: 0;
        width: 70%;
        height: calc(100% - 120px);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 2rem;

        h3 {
          font-size: clamp(17px, 3vw, 25px);
          text-transform: uppercase;
        }

        .img-title {
          @include dfa;
          align-items: flex-end;
          justify-content: space-between;
          h3 {
            padding: 0 1rem;
            font-size: clamp(23px, 3.3vw, 45px);
            text-transform: uppercase;
            text-shadow: 0 10px 20px black;
          }
          img {
            width: 30%;
            margin-bottom: -50px;
            z-index: 40;
            aspect-ratio: 1;
            object-fit: cover;
            border-radius: 100%;
          }
        }
        .content {
          background-color: $c-nav;
          width: 100% !important;
          padding:60px 0rem 1rem;
          overflow: auto;
          height: 100%;
          @include dfj;
          
          flex-direction: column;
          justify-content: flex-end;
          align-content: flex-start;
          .description{
            margin: 4rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            .desc{
              @include dfc;
              gap: 2rem;
            }
          }
          .tags {
            margin-bottom: 5px;
            background-color: rgba(0, 0, 0, 0.191);
            padding:  10px  0 0 10px ;
            max-height: 25vh;
            min-height: 85px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 13px;
            column-gap: 5px;
            .tags-c{
              width: 100%;
              display: flex;
              justify-content: flex-start;
              gap: .4rem;
              overflow: auto;
              padding: 0px 10px 10px 0px;
              .tag-pills {
              white-space: nowrap;
              display: block;
              width: 100% !important;
              background-color: $c-panna;
              color: $c-nav !important;
            }
            }
            h3{

              margin-right: 20px ;
            }
            
          }
          .extra-tags {
            background-color: rgba(0, 0, 0, 0.191);
            padding:1rem;
            width: 100%;
            overflow: auto;
            max-height: 25vh;
            .et-c{
              gap: 13px;
              flex-direction: column;
              @include dfj;
            }
            h3{
             
              color: white  !important;
              margin-bottom: 15px;
            }
            
            .tag-pills {
              background-color: $c-header;
              
            }
          }
          .add-ingredient {
            
            align-self: flex-end;
            position: relative;
            width: 100%;
            background-color: $c-panna;
            padding: 1rem;
            max-height: 50vh;
            overflow: auto;

            .cont_ex_ing {
              @include dfj;
              flex-direction: column;
              gap: 0.4rem;
              width: 100%;

              .ex_ing {
                width: 100%;
                display: flex;

                justify-content: space-between;
                .minus,
                .plus {
                  width: 100%;
                }
              }
            }
            .cont_ex_off {
              height: 0;
              display: none;
            }
            h3 {
              text-transform: uppercase;
              color: $c-nav !important;
            }
            img {
              
              height: 30px;
              border-radius: 15px;
              box-shadow: 0 0 5px black;
            }

            .open {
              transform: rotate(405deg);
              transition: all 1s ease-in-out;
              position: sticky;
              top: 0px;
              left: 100%;
              right: 10px;
            }
          }
          .add-off {
            @include dfa;
            justify-content: space-between;
            transition: display 0.1s ease-in-out, height 0.5s ease-in-out 0.2;
          }

          .add {
            margin-top: 1rem;
            font-size: clamp(20px, 3vw, 25px);
            align-self: center;
            @include dfc;
            width: 100%;
            justify-content: space-around;
            font-size: 18px;
            .sec {
              @include dfc;
              gap: 15px;
              
              .plus,
              .minus {
                height: 30px;
                width: 30px;
                @include dfc;
                border: 2px solid white;
                border-radius: 20px;
              }
            }
            .mybtn {
              align-self: flex-start;
              align-self: flex-start;
              padding: 5px 25px;
              text-transform: uppercase;
              border: 2px solid white;
              border-radius: 20px;
            }
            
          }
        }
      }
      .close {
        background-color: $c-nav;
        position: absolute;
        top: -50px;
        left: 10px;
        height: 40px;
        width: 40px;
        @include dfc;
        border-radius: 10px;
        svg {
          scale: 1.2;
        }

        .line {
          position: absolute;
          left: 19.5%;
          bottom: 43%;
          width: 25px;
          height: 4px;
          background-color: white;
          transform: rotate(45deg);
        }
        .l2 {
          transform: rotate(-45deg);
        }
      }
    }
  }
}
.def_tag{
  text-transform: capitalize;
}
.tag-off {
  opacity: 0.2;
}
.tag-pills {
  padding: 5px 10px;
  border-radius: 20px;
  background-color: $c-nav;
  color: white !important;
}

/*** */

.categorie {
  max-width: 550px;
  width: 100%;
  height: 250px;
  border-radius: 4px;
  padding-bottom: 0.4rem;
  margin: 0 auto;
  display: flex;
  gap: 5px;
  .category {
    height: 100%;
    flex: 1;
    overflow: hidden;
    cursor: grab;
    border-radius: 2px;
    transition: all 0.5s;
    background-color: $c-footer-nav;
    border: 1px solid $c-nav-link;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      min-width: 14em;
      padding: 0.5em;
      text-align: center;
      transform: rotate(-90deg);
      transition: all 0.5s;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: $c-nav-link;
    }
  }
  .category:hover {
    flex: 5;
    background-color: $c-header !important;
  }
  .category:hover span {
    color: white;
    transform: rotate(0);
  }
}

.category-on {
  flex: 2 !important;
  background-color: $c-header !important;
}
.category-on:hover {
  flex: 5 !important;
  background-color: $c-header !important;
}
.span-on {
  color: white !important;
}
/***** */
.cart {
  color: $c-nav-link;

  border: 1px solid $c-nav-link;
  background-color: $c-header;
  max-width: 550px;
  width: 100%;
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
    input {
      width: 30px;
      border: none;
      background-color: rgba(255, 255, 255, 0);
      text-align: center;
    }
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

  }

  svg {
    width: 90%;
  }
}

@media (max-width: $bp1) {
  .card-show {
    width: 100% !important;
  }
}
@media (max-width: $bp2) {
  .card-default {
    width: 95% !important;
  }
}
</style>
