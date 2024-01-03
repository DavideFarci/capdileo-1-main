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
      getPrice(cent){
        let num = parseFloat(cent);
        num = num / 100;
        num = "€" + num  

        return num
      },
      opencart(){
        if(state.sideCartValue){
          state.sideCartValue=0
        }else{
          state.sideCartValue=1
        }
      },
      sendOrder(){
        let data = {
          name:this.name,
          phone:this.phone,
          time:this.time,
          arrId:this.state.arrId,
          arrQt:this.state.arrQt,
          
        };
        axios.post(state.baseUrl + 'api/orders', {data}).then(response=>(response))
      },
      newItem(title, counter, tprice, price) {
        let newitem={
          title,
          counter,
          totprice: tprice,
          price: parseInt(price),
        }
        return newitem;
      },
      addItem(title, counter, price, id){
        if(counter<=0){
          return console.log('ci hai provato amico!')
        }
        let check= false;
        let newitem= this.newItem(title, counter, price*counter, price);
        console.log(newitem);
        this.state.arrCart.forEach((element, index) => {
          if(element.title == title){
            element.counter += counter
            element.totprice = element.counter * element.price
            check=true
            this.state.arrQt[index] += counter
          }

        });
      
        if(!check){
          this.state.arrCart.push(newitem);
          this.state.arrId.push(id)
          this.state.arrQt.push(counter)
        }
        this.arrProduct.forEach(element => {
          if(element.name == title){
            element.counter = 0
          }
        });
        this.getTot();
      },
      removeItem(title){
        this.state.arrCart.forEach((element, i) => {
          if(element.title== title){
            if(element.counter>=0){
            element.counter --;
            element.totprice -= element.price
            this.state.arrQt[i]--;
            }if(element.counter == 0){
              let nwi = i - 1;
              this.state.arrId.splice(i, 1)
              this.state.arrQt.splice(i, 1)
              let newarrCart = this.state.arrCart.filter((element) => {
                return element.title !== title;
              });
              this.state.arrCart=[];
              this.state.arrCart = newarrCart;
              }
          }
        });

        this.getTot();

      },
      upCounter(id){
        this.arrProduct.forEach(element => {
          if(element.id == id){
            element.counter ++
          }
        });

      },
      downCounter(id){
        this.arrProduct.forEach(element => {
          if(element.id == id){
            if(element.counter>=1){
              element.counter --
            }
          }
        });
      },
      getTot(){
        this.state.totCart = 0
        this.state.arrCart.forEach(element => {
          console.log(element.totprice)
          this.state.totCart = this.state.totCart + element.totprice
        });
      }
    },
    created(){
      this.getProduct(0);
      this.getCategory();

     
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
          <div v-for="item in state.arrCart" :class="state.sideCartValue ?  'item-off' : 'item-on'" :key="item.id">
            <div>{{ item.title }}</div>
            <div>* {{ item.counter }}</div>
            <div>{{ getPrice(item.totprice) }}</div>
            <svg :class="state.sideCartValue ?  'sub-item-off' : 'sub-item-on'" @click="removeItem(item.title)"  style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="current-color" class="bi bi-trash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" fill="white"></path> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" fill="white"></path> </svg>
          </div>
          <router-link :to="{ name: 'conferma' }" v-if="state.arrCart.length && !state.sideCartValue" class="next">Completa la tua ordinazione</router-link>
        </div>
      </div>
      
      <div class="main-prenota">

      <div class="card-wrap"  v-for="item in arrProduct" :key="item.id">
        <div class="card">
        <img :src="state.getImageUrl(item.image)" alt="">
        <div class="title">{{ item.name }}</div>
        <div class="c-tp">
          <div class="tags"> <span>{{fixtag(item.tags) }}</span></div>
          <div class="price">{{ getPrice(item.price) }}</div>
        </div>
        <div class="add">
          <div class="sec">
            <span class="plus" @click="upCounter(item.id)" >+</span>
            <span class="counter">{{ item.counter }}</span>
            <span class="minus"  @click="downCounter(item.id)">-</span>
          </div>
         <div class="mybtn" @click="addItem(item.name, item.counter, item.price, item.id)">aggiungi</div>
        </div>
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
      margin-top: 2rem;
      @include dfc;
      flex-wrap: wrap;
      gap: 1rem;
      .card-wrap{
        position: relative;
        width: calc((100% - 2rem) / 2);
        margin-bottom: 60px;
        .add{
            position: absolute;
            //background-color: red;
            bottom: -40px;
            left: 0;
            width: 100%;
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

        .card{
          height: $h-c;
  
          border-radius: $h-c 0 0 $h-c  ;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-end;
          //overflow: hidden;
          //gap: 1rem;
          //padding: 1rem;
          
          img{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            aspect-ratio: 1;
            border-radius: $h-c;
          }
          .title{
            padding: 1rem;
            text-align: left;
            width: calc((100% - $h-c));
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
              width: calc((100% - $h-c - 15px));
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
                text-transform:capitalize;
  
  
              }
            }
            .price{
              width: 100%;
              //border-radius: 10px ;
              text-align: right;
    
            }
          }
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
  .card-wrap{
    width: 95% !important;
  }
}
</style>
