<script >
  import {state} from '../state.js';
  import axios from 'axios'
  import sh from '../components/SHeader.vue'

  export default {
    components:{sh},

    data(){
        return{     
            state,
            arrProduct:[],
            arrCategory:[],
            categoryId: 0,
            name:'',
            phone:'',
            time:'',
            arrIngredient:[],
            selectedItem:{
              name:'',
              id:'',
              image:'',
              price: 0,
              tags: [],
              deselected:[],
              addicted:[],
              price_variation:0,
              counter: 1,
              expanded:0,
              opened:false,
            },
            arrCorrectIngredient:[],
            

            

        }
    },
    methods:{
     


      getProduct(cat){
        this.categoryId = cat,
        axios
				.get(this.state.baseUrl+ 'api/projects', {
					params: {
						category: this.categoryId,
					},
				})
				.then(response => {
					this.arrProduct = response.data.results.data;
          this.arrProduct.forEach(element => {
           element.deselected = []
           element.tags.forEach(element => {
            element.deselected = 0
           });      
        });
         
				});
      },

      getIngredients(){
        axios
        .get(state.baseUrl + 'api/tag', {})
        .then(response => {
          this.arrIngredient = response.data.results;
          this.arrIngredient.forEach(element => {
            element.active = false;
          });
        });

      },
      getCategory(){
        axios
        .get(state.baseUrl + 'api/categories', {})
        .then(response => {
          this.arrCategory = response.data.results;
        });

      },
      changeCategory(value){
        if(value==1){
          this.getProduct(0)
          this.actvcat=value
          
        }else{
          this.getProduct(value)
          this.actvcat=value

        }
      },

      esp(array, stringaDaEliminare) {
        return array.filter(function(elemento) {
            return elemento !== stringaDaEliminare;
        });
      },
      openShow(name, id, tags, price, image){
        this.selectedItem.name = name
        this.selectedItem.id = id
        this.selectedItem.tags = tags
        this.selectedItem.image = image
        this.selectedItem.price = price
        this.selectedItem.opened = true
        this.openIng()
      },
      closeShow(){
        this.selectedItem.name = ''
        this.selectedItem.id = ''
        this.selectedItem.tags = []
        this.selectedItem.deselected = []
        this.selectedItem.addicted = []
        this.selectedItem.image = ''
        this.selectedItem.price = 0
        this.selectedItem.expanded = 0
        this.selectedItem.opened = false
        this.arrCorrectIngredient = []
        this.arrProduct.forEach(element => {
           element.tags.forEach(element => {
            element.deselected = 0
           });      
        });
        this.arrCorrectIngredient.forEach(element => {
           element.active = false
                
        });


      },
      
      addremoveTagDefault(nametag, ar){
        if(ar == 'remove'){
          this.selectedItem.deselected.push(nametag)
          this.selectedItem.tags.forEach(element => {
            if(element.name == nametag){
              element.deselected = 1
            }              
        });
        }else{
          this.selectedItem.deselected = this.esp(this.selectedItem.deselected, nametag)
          this.selectedItem.tags.forEach(element => {
            if(element.name == nametag){
              element.deselected = 0
            }              
        });
        }
      },
      addRemoveExtraTag(nametag, price, ar){
        if(ar == 'remove'){
          this.selectedItem.addicted.push(nametag)
          this.selectedItem.price_variation = this.selectedItem.price_variation + price
          this.arrCorrectIngredient.forEach(element => {
            if(element.name == nametag){
              element.active = true
            }
          });
        }else{
          this.selectedItem.addicted = this.esp(this.selectedItem.addicted, nametag)
          this.selectedItem.price_variation = this.selectedItem.price_variation - price
          this.arrCorrectIngredient.forEach(element => {
            if(element.name == nametag){
              element.active = false
            }
          });
        }
      },
      removeExtraTagShow(nome){
        this.selectedItem.addicted = this.esp(this.selectedItem.addicted, nome)
        this.arrCorrectIngredient.forEach(element => {
          if(element.name == nome){
            this.selectedItem.price_variation = this.selectedItem.price_variation - element.price
            element.active = false
          }
        });
      },
    
      newItem(p_id, title, counter, totprice, addicted, deselected) {
        let newitem={
          p_id,
          title,
          counter,
          totprice,
          deselected,
          addicted,
        }
        return newitem;
      },

      addItem(){
        if(this.selectedItem.counter<=0){
          return console.log('ci hai provato amico!')
        }
        let check= false;
        let newitem= this.newItem(this.selectedItem.id, this.selectedItem.name, this.selectedItem.counter, this.selectedItem.price * this.selectedItem.counter + this.selectedItem.price_variation, this.selectedItem.addicted, this.selectedItem.deselected, );     
        console.log(newitem);
        //se non ci sono variazioni controllo che l'item non sia gia presente prima di pusharlo
        if(this.selectedItem.deselected.length == 0 && this.selectedItem.addicted.length == 0){
          this.state.arrCart.forEach((element, index) => {
            if(element.title == title && element.deselected.length == 0){
              element.counter += this.selectedItem.counter;
              element.totprice = element.counter * element.price;
         
              check=true;
            }
  
          });
        }
        //se l'item non era gia presente lo aggiungo ora per la prima volta a tutti gli array
        if(!check){
          this.state.arrCart.push(newitem);
  
        }
        //reimposto il counter a 1
        this.selectedItem.counter= 1
        //ricalcolo il totale
        this.getTot();
        //riporto gli ingredienti deselezionati alla stato di default
        this.arrProduct.forEach(element => {
           element.deselected = []
           element.tags.forEach(element => {
            element.deselected = 0
           });      
        });
        
       
      },
      removeItem( i ){
        if(this.state.arrCart[i].counter >= 0){
          this.state.arrCart[i].counter --
          if(this.state.arrCart[i].counter == 0){
            this.state.arrCart.splice(i, 1)
          }
        }
        this.getTot();
      },

      fixtag(arr){
        let arrtag='';
        arr.forEach((element, i) => {
          
          if(i+1==arr.length){
            
            arrtag = arrtag + element.name + '.'
          }else{
            arrtag = arrtag + element.name + ', '
            
          }
        });
        return arrtag
      },
      getPrice(cent, sum){
         if(sum){
          // console.log(cent)
          // console.log(sum)
          let num1 = parseFloat(cent);
         
          let num = (num1 + sum) / 100;
          num = "€" + num 
          return num
        }else{
          let num = parseFloat(cent);
          num = num / 100;
          num = "€" + num  
          return num   
        }
      },
      opencart(){
        if(state.sideCartValue){
          state.sideCartValue=0
        }else{
          state.sideCartValue=1
        }
      },
      modCounter(ud){
        if(ud=='up'){ 
          this.selectedItem.counter ++
          }
          else if(ud=='down'){
          if(this.selectedItem.counter >1){
            this.selectedItem.counter --
          }         
        }

      },
      getTot(){
        this.state.totCart = 0
        this.state.arrCart.forEach(element => {
          console.log(element.totprice)
          this.state.totCart = this.state.totCart + element.totprice
        });
      },
      openIng(){
   
        let obs= false
        this.arrIngredient.forEach(element => {
          this.selectedItem.tags.forEach(e => {
            if(element.name == e.name){
              obs = true
            }
          });
          if(obs){         
            obs = false
          }else{
            this.arrCorrectIngredient.push(element)
          }
        });
      }
    },
    created(){
      this.getProduct(0);
      this.getCategory();
      this.getIngredients();

     
      this.state.actvPage = 5;
    },

  }
</script>
<!-- :class="state.sideCartValue ?  'sub-item-off' : 'sub-item-on tag'" -->
<template>
 <div class="prenota">
    <sh/>
    <div class="prenota-cont">

      <h1>Prenota il tuo Asporto</h1>
      <div class="categorie">
        <div v-for="cat in arrCategory" :key="cat.id" class="category" :class="actvcat == cat.id ? 'category-on' : '' " @click="changeCategory(cat.id)"> 
          <span :class="actvcat == cat.id ? 'span-on' : '' ">{{ cat.name }}</span>
        </div>
      </div>
      <div class="cart">
        <div class="top-cart" @click="opencart">
          <svg   xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg>
          <div class="state.totcart">
            {{ getPrice(state.totCart)}}
          </div>

        </div>
        <div :class="state.sideCartValue ? 'content-cart' : 'ccoff'" >
          <div class="span" v-if="!state.arrCart.length && !state.sideCartValue">Il carrello è vuoto</div>
          <div v-for="(item, i) in state.arrCart" :class="state.sideCartValue ?  'item-off' : 'item-on'" :key="item.id">
            <div>
              <h4>{{ item.title }}</h4>
              <div class="removed">
                <div class="i-removed" v-for="i in item.deselected" :key="i">- {{ i }}</div>
              </div>
              <div class="removed">
                <div class="i-removed" v-for="i in item.addicted" :key="i">+{{ i }}</div>
              </div>
            </div>
            <div>* {{ item.counter }}</div>
            <div>{{ getPrice(item.totprice) }}</div>
            <svg :class="state.sideCartValue ?  'sub-item-off' : 'sub-item-on'" @click="removeItem( i)"  style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="current-color" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="white"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="white"></path> </svg>
          </div>
          <router-link :to="{ name: 'conferma' }" v-if="state.arrCart.length && !state.sideCartValue" class="next">Completa la tua ordinazione</router-link>
        </div>
      </div>
      
      <div class="main-prenota">
        <div class="card-default" @click="openShow(item.name, item.id, item.tags, item.price, item.image)" v-for="item in arrProduct" :key="item.id">
            <img :src="state.getImageUrl(item.image)" alt="">

              <div class="title">{{ item.name }}</div>
              <div class="c-tp">
                <div class="tags"> <span>{{fixtag(item.tags) }}</span></div>
                <div class="price">{{ getPrice(item.price) }}</div>
              </div>

          
        </div>
        <div class="card-show" v-if="selectedItem.opened">
          <div class="img-title">
            <div class="title">{{ selectedItem.name }}</div>
            <img :src="state.getImageUrl(selectedItem.image)" alt="">

          </div>
          <div class="close" v-if="selectedItem.opened" @click="closeShow">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5"/>
            </svg>
          </div>
          
          <div class="content">
            <div class="tags" v-if="!selectedItem.expanded">            
              <div v-for="tag in selectedItem.tags" :key="tag.name" :class="tag.deselected ? 'tag-off' : 'tag'">
                <span class="minus" @click="addremoveTagDefault(tag.name, 'remove')" v-if="!tag.deselected">-</span> 
                <span class="plus"  @click="addremoveTagDefault(tag.name )" v-if="tag.deselected">+</span> 
                {{tag.name }}
              </div>
            </div>
            <div class="extra-tags">
              <h3>ingredienti extra:</h3>
              <span v-for="i in selectedItem.addicted" :key="i">
                <span class="minus" @click="removeExtraTagShow(i )">-</span>  
                  <span>
                    {{i }}
                  </span>
              </span>
            </div>
            <div class="add-ingredient">
              <h3  v-if="!selectedItem.expanded" @click="selectedItem.expanded = !selectedItem.expanded">Aggiungi un ingrediente</h3>
              <div class="close" v-if="selectedItem.expanded" @click="selectedItem.expanded = !selectedItem.expanded">
                <div class="line"></div>
                <div class="line l2"></div>
              </div>
              <div class="cont_ex_ing" v-if="selectedItem.expanded">
                <div class="ex_ing" v-for="(ing, i) in arrCorrectIngredient" :key="i">
                  <span class="minus" @click="addRemoveExtraTag(ing.name, ing.price)"      v-if="ing.active">-</span> 
                  <span class="plus"  @click="addRemoveExtraTag(ing.name, ing.price, 'remove')" v-if="!ing.active">+</span> 
                  <span >
                    {{ing.name }}
                  </span>
                </div>
              </div>
            </div>

            <div class="price">{{ getPrice(selectedItem.price , selectedItem.price_variation) }}</div>
          </div>
          
          <div class="add">
            <div class="sec">
              <span class="plus" @click="modCounter('down')" >-</span>
              <span class="counter">{{selectedItem.counter}}</span>
              <span class="minus"  @click="modCounter('up')">+</span>
            </div>
          <div class="mybtn" @click="addItem()">aggiungi</div>
          </div>
        </div>
      
  
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/general.scss' as *;



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

.prenota{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;

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
    
    
    .main-prenota{
      @include dfc;
      margin-top: 2rem;
      flex-wrap: wrap;
      gap: 1rem;

      .card-default{
        width: calc((100% - 2rem) / 2);
        height: 150px;
        position: relative;
        border-radius: 150px 0 0 150px  ;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;

        
        img{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          aspect-ratio: 1;
          border-radius: 150px;
        }
        .title{
          padding: 1rem;
          text-align: left;
          width: calc((100% - 150px));
          text-transform: uppercase;
          
        }
        .c-tp{
          background-color: #410606;
          border-radius: 10px;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          
          .tags, .price{
            border-radius: 10px;
            width: calc((100% - 150px - 15px));
            padding-right: .5rem;
            padding-bottom: .5rem;
          }
          .tags{

            display: flex;
            padding-top: .5rem;
            padding-right: .5rem;
            span{
              font-size: 10px;
              font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
              font-weight: bold!important; 


            }
          }
          .price{
            width: 100%;
            //border-radius: 10px ;
            text-align: right;
  
          }
          }
      }
      .card-show{
        position: fixed;
        right: 0;
        bottom: 0;
        width: 70%;
        height: 70%;
        background-color: $c-nav;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 2rem;
        padding: 2rem;
        .img-title{
          width:clamp(200px, 40%, 350px);
          position: absolute;
          top:0px;
          left: 50%;
          transform: translate(-50%, -50%);
          @include dfc;
          flex-direction: column;
          img{
            width: 100%
          }
          
        }
        .content{
          padding: 2rem;
          width: 80%;
          @include dfc;
          flex-direction: column;
          gap: 3rem;
          align-content: flex-end;
          background-color: rgb(232, 136, 73);

          .extra-tags{
            @include dfj;
            flex-direction: column;
            gap: .4rem;
          }
        }
        .add-ingredient{
          max-height: 250px;
          overflow: auto;
          background-color: rgb(232, 73, 73);
          padding: 1rem;
        }
        
        .add{
            @include dfc;
            gap: 2rem;
            .sec{
              @include dfc;
              gap: .5rem;
  
              .plus, .minus{
                height: 2rem;
                width: 2rem;
                @include dfc;
                border: 2px solid white;
                border-radius: 20px;
              }
            }
            .mybtn{
              padding: 5px 25px;
              text-transform: uppercase;
              border: 2px solid white;
              border-radius: 20px;
  
            }
            
        }

      }
      .close{
          background-color: red;
          position: absolute;
          top: 100px;
          right: 30px;
          height: 40px;
          width: 40px;
          @include dfc;
          svg{
            scale: 1.2;
          }

          .line{
            position:absolute;
            left: 19.5%;
            bottom: 43%;
            width: 25px;
            height: 4px;
            background-color: white;
            transform: rotate(45deg);
            
            
          }
          .l2{
            transform: rotate(-45deg);
          

          }
        }


      }

    }
    
  }




/*** */

.categorie {
  max-width: 450px;
  width: 100%;
  height: 160px;
  border-radius: 4px;
  padding-bottom: .4rem;
  margin: 0 auto;
  display: flex;
  gap: 5px;
  .category {
    height: 100%;
    flex: 1;
    overflow: hidden;
    cursor:grab;
    border-radius: 2px;
    transition: all .5s;
    background-color: $c-footer-nav ;
    border: 1px solid $c-nav-link;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      min-width: 14em;
      padding: .5em;
      text-align: center;
      transform: rotate(-90deg);
      transition: all .5s;
      text-transform: uppercase;
      letter-spacing: .1em;
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
  flex: 2!important;
  background-color: $c-header !important;
}
.category-on:hover {
  flex: 5!important;
  background-color: $c-header !important;
}
.span-on{
  color: white!important;;
  
}
/***** */
.cart{
  color: $c-nav-link;

  border: 1px solid $c-nav-link;
  background-color: $c-header;
  max-width: 450px;
  width: 100%;
  border-radius: 4px;
  padding: .4rem;
  margin: 0 auto;
  .top-cart{
    padding: .2rem;
    @include dfc;
    justify-content: space-between;
  }
}
.next{
    border: 2px solid white;
    text-transform: uppercase;
    padding: 5px ;
    text-align: center;
    border-radius: 5px;
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
  .card-default{
    width: 95% !important;
  }
  .card-show{
    width: 100% !important;
  }
}
</style>
