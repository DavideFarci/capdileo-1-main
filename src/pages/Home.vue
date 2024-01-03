<script >
  import {state} from '../state.js'
  import axios from 'axios';
  import AppHeader from '../components/AppHeader.vue'
  export default {
    components:{ AppHeader },

    data(){
        return{     
            state,
        }
    },
    created(){
        axios.get(state.baseUrl + 'api/setting', {}).then(response=> this.state.setting = response.data.results );
   
        this.state.actvPage = 1;
    }

  }
</script>

<template>
    <div class="home">
        <AppHeader class="hd" />
        <div class="main-home">
            
            <div class="par par-1" id="par1" v-if="state.setting[0].status">
                <div class="overlay">
                    <div class="arrow">
                        1
                        <a href="#par2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>
                        </a>
                    </div>
                    <div class="t-c">
                        <h2 id="h2par1"><span class="s1">ORDINA</span> IL NOSTRO <span class="s2">ASPORTO</span> </h2>
                        <span>La serata perfetta non esis... E invece esiste eccome! Nasce proprio dal pasto perfetto, quindi che aspetti prenota ora la tua pizza o il tavolo per poterla gustare da noi </span>
                    </div>
                    <router-link :to="{ name: 'prenota' }" class="btn" >Prenota asporto</router-link>
                </div>
            </div>
            <div class="par par-2" id="par2" v-if="state.setting[1].status">
            <div class="overlay">
                <div class="arrow">
                    <a href="#par1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
                    </a>
                    2
                    <a href="#par3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/></svg>
                        </a>
                </div>
                <div class="t-c">
                    <h2 id="h2par2"><span class="s1 s1-m">PRENOTA ORA</span> IL TUO <span class="s2 s2-m">TAVOLO</span></h2>
                    <span>E se volessi cenare proprio da noi? Prenota subito il tuo tavolo ti aspettiamo a cena da noi!</span>
                </div>
                <router-link :to="{ name: 'prenotaServizio' }" class="btn" >Prenota un tavolo</router-link>
            </div>
            </div>
            <div class="par par-3" id="par3">
                <div class="overlay">
                    <div class="arrow">
                    <a href="#par2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/></svg>
                    </a>
                    3
                </div>
                    <div class="t-c">
                        <h2 id="h2par3">SCOPRI IL NOSTRO MENU</h2>
                        <span>
                            Se ancora non hai provato le sfiziosità della nostra cucina devi assolutamente vedere il nostro menù
                        </span>
                    </div>
                    <router-link :to="{ name: 'menu' }" class="btn" >Menù</router-link>
                </div>
            </div>
        </div>

    </div>

</template>

<style scoped lang="scss">
@use '../assets/styles/general.scss' as *;

*{
    font-family: 'Gabarito', cursive;
}

.main-home::-webkit-scrollbar{
        
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
.hd{box-shadow: 10px 10px 10px black; }
.home{
    position: fixed;
    top: 0;
    right: 0;
    overflow: hidden;
    padding-bottom: 1rem;
    height: calc(100%);
    .main-home{
        padding-bottom: 1rem;
        //margin-bottom: 1rem;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        height: 60%;
        width: calc(100% - 2rem);
        margin-left: 2rem;
        display: flex;
        gap: 3rem;
        
        .arrow{
            position: absolute;
            top: 0;
            right: 0;
            z-index: 100;
            display: flex;
            padding: 10px;
            gap: .4rem;
        }
        .par{
            
            scroll-snap-align: start;
            flex: 1 0 auto;
            height: 100%;
            width: 100%!important;
            color: $c-white;
            //filter: grayscale(50);
            background-position: center bottom;
            background-size: cover;
            position: relative;
            .overlay{
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
                .t-c{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    max-width: 70%;
                    h2{
                        line-height: 38px;
                        max-width: 200px;
                        font-size: 40px;
                        .s1{
                            font-size: 115%;
                            
                        }
                        .s2{
                            font-size: 140%;
                            
                        }
                    }
                    
                }
            }

        }
    }
}
.par-1{
    background-image: url('../assets/img/pizza-4.png');
    background-position: center !important;
}
.par-2{
    background-image: url('../assets/img/pizza-2.png');
}
.par-3{
    background-image: url('../assets/img/pizza-olio.png');

}
@media (max-width:$bp1) {
    .home{
        padding: 0 !important;
    }
    .main-home{
        padding: 0 !important;
        margin: 0!important;
        width: 100%!important;
    }
    .overlay{
        flex-direction: column!important;
    }
  
    #h2par1, #h2par2, #h2par3
    {
        font-size: 28px;
    }
}
@media (max-width:$bp1) {

}
</style>
