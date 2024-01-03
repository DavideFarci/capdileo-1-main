<script >
  import {state} from '../state.js'
  import sh from '../components/SHeader.vue'
  import axios from 'axios'

  export default {
    components:{sh},

    data(){
        return{     
            state,
            arrPost:[],
        }
    },
    methods:{
      getPost(){
        axios
				  .get(state.baseUrl + 'api/post', {})
            .then(response => {
              this.arrPost = response.data.results.data;
            });
      }
    },
    created(){
      this.getPost()
      this.state.actvPage = 3;
    }
    
  }
</script>

<template>
  <div class="about">
    <sh/>
    <div class="main-about">
      <h1>LA NOSTRA PIZZERIA</h1>
      <div class="post-container">
        <div v-for="post in arrPost" :key="post.id" class="post" >
          <img class="image" :src=" state.getImageUrl(post.image)" alt="">
          
          <div class="text">
            <h4>{{ post.title }}</h4>
            <p> {{ post.description }}</p>
          </div>
          <div class="img-cont">
            <img :src=" state.getImageUrl(post.image)" alt="">
            <div class="hashtags">
              <span v-for="tag in post.hashtags" >#{{ tag.tag }} </span>
            </div>
          </div>
          <a :href="post.link">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-instagram" viewBox="0 0 16 16">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
            </svg>
          </a>
        </div>


<!-- 

        <div class="post">
          
          <div class="text">
            <h4>LA NOSTRA STORIA...</h4>
            <p>
              Il Capriccio di Leo è una pizzeria a conduzione familiare con un’ampia sala e servizio d’asporto. Punto di forza del locale è la sua pizza ad alta digeribilità cotta nel forno a pietra, con pasta sottile e preparata con un impasto a lunga lievitazione. 
            </p>
          </div>
          <img src="../assets/img/abus.png" alt="">
        </div>
        <div class="post p2">
          
          <div class="text">
            <h4>GLI IMPASTI PIU BUONI E DIGERIBILI</h4>
            <p>
              Un impasto digeribile e ben lievitato è il giusto punto di partenza per una pizza sana, genuina e appetitosa. Il Capriccio di Leo è una pizzeria con forno in pietra a Monte San Vito, piccolo centro della provincia di Ancona. 
            </p>
          </div>
          
          <img src="../assets/img/farine.png" alt="">
        </div>
        <div class="post p2">
          
          <div class="text">
            <h4>GLI IMPASTI PIU BUONI E DIGERIBILI</h4>
            <p>
            La leggerezza e la genuinità del prodotto, così come la cura riservata alla selezione degli ingredienti e dei condimenti, rendono la pizzeria di Monte San Vito un riferimento anche per chi ha problemi di allergie e intolleranze alimentari.
            </p>
          </div>
          <img src="../assets/img/farine.png" alt="">
        </div> -->
      </div>
    </div>

</div>

   


</template>

<style scoped lang="scss">
@use '../assets/styles/general.scss' as *;

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
.main-about::-webkit-scrollbar{
  width: 10px;
}
.main-about::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
.main-about::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
    
}

.about{
  overflow: hidden;
  height: 100vh;
  display: flex;
  flex-direction:column;

  .main-about{
    overflow: auto;
    padding: 2rem;
    height: 100%;
    .post-container{
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .post::after{
        content: ' ';
        display: block;
        background-color: rgba(16, 16, 16, 0.832);
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
    
      }
      .post:nth-child(even){
        flex-direction: row-reverse;
        a{
          left: auto;
          right: 25px;
        }
      }
      
      .p2{
        background-image: url(../assets/img/farine.png) !important;
      }
      .post{
        //background-image: url(../assets/img/abus.png);
        @include dfc;
        z-index: 1;
        justify-content: space-between;
        padding: 2rem;
        background-position: top;
        background-size: cover;
        position: relative;
        .image{
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 2;
          object-fit: cover;
        }
        .text{
          
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: .5rem;
          width: 40%;
          h4{
            font-size: 18px;
          }
          p{
            font-size: 10px;
          }
        }
        .img-cont{
          @include dfj;
          flex-direction: column;
          align-items: flex-end;
          position: relative;
          z-index: 3;
          width: 50%;
          img{
            width: 100%;
            max-width: 300px;
            box-shadow: 17px 10px 38px black;
          }
          .hashtags{
            @include dfc ;
            gap: .3rem;
            flex-wrap: wrap;
            width: 100%;
          }
        }

        a{
          position: absolute;
          z-index: 3;
          bottom: 25px;
          left: 25px;
        }
      }
    }
  }
}

@media (max-width:$bp3){
  .post{
    display: flex;
    flex-direction: column !important;
    img{
      width: 70% !important;
    }
    .text{
      width: 70% !important;
    }
  }
}


</style>
