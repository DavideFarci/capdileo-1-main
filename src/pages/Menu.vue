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
            actvcat: 1,
        }
    },
    methods:{
      getProduct(cat){
        this.categoryId = cat,
        axios
				.get(state.baseUrl + 'api/projects', {
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
      getPrice(cent){
        let num = parseFloat(cent);
        num = num / 100;
        num = "€" + num  
        
        return num
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
      
      
      
    },
    created(){
      this.getProduct(0);
      this.getCategory();


      this.state.actvPage = 2;
    },
    
  }
</script>

<template>
  <div class="menu">
    <sh/>
    <div class="menu-cont">

      <h1>Menu</h1>
      <div class="categorie">
        <div v-for="cat in arrCategory" class="category" :class="actvcat == cat.id ? 'category-on' : '' " @click="changeCategory(cat.id)"> 
          <span :class="actvcat == cat.id ? 'span-on' : '' ">{{ cat.name }}</span>
        </div>
      </div>
  
      <div class="main-menu">
  
       <div class="card" v-for="item in arrProduct">
        <img :src="state.getImageUrl(item.image)" alt="">
        <div class="title">{{ item.name }}</div>
        <div class="c-tp">

          <div class="tags"> <span>{{fixtag(item.tags) }}</span></div>
          <div class="price">{{ getPrice(item.price) }}</div>
        </div>
       </div>
  
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/general.scss' as *;


.menu-cont::-webkit-scrollbar{
      
      width: 10px;
      height: 10px;
      
  }

.menu-cont::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: $c-header;
    
}
.menu-cont::-webkit-scrollbar-track {
    border-radius: 20px;
    background: rgba(52, 4, 7, 0.786);
    
}
.menu-cont::-webkit-scrollbar-thumb:hover {
    border-radius: 20px;
    background-color: $c-nav-link;
    border: 2px solid $c-header;
    
}
.hd{box-shadow: 10px 10px 10px black; }

.menu{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .menu-cont{
    overflow: auto;
    height: 100%;
    padding: 1rem 1rem ;
    h1{
      text-align: center;
      text-transform: uppercase;
      padding: 1rem;
      font-size: 30px;
    }
    
    
    .main-menu{
      margin-top: 2rem;

      @include dfc;
      flex-wrap: wrap;
      gap: 1rem;
      .card{
        height: $h-c;
        width: calc((100% - 2rem) / 2);

        border-radius: $h-c 0 0 $h-c  ;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        overflow: hidden;
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

/*** */

.categorie {
  max-width: 450px;
  width: 100%;
  height: 160px;
  border-radius: 4px;
  display: flex;
  gap: 5px;
  padding: .4em;
  margin: 0 auto;
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
    color: $c-nav-link;
    letter-spacing: .1em;
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


@media (max-width:$bp2) {
  .card{
    width: 95% !important;
  }
}
</style>
