<script >
  
  import AppNav from './components/AppNav.vue'


  export default {
  components:{  AppNav }
  }
</script>

<template>

  <div class="container">
    <AppNav />
    <router-view class="page"></router-view>
  </div>
 

  
</template>

<style lang="scss">
@use './assets/styles/general.scss' as *;
body{
  background-color: $c-bg;
}

.container{
  display: flex;
  justify-content: flex-end;
  padding: 0;
}
.page{
    // position: fixed;
    // top: 0;
    // right: 0;
    width: 70%;
    padding: 0 2rem ;
    overflow: hidden;
}


@media (max-width:$bp1) {
  .page{
    width: 100%;
  }
  
}

body::-webkit-scrollbar{
  width: 10px;
}
body::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: $c-header;
}
body::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  background-color: $c-nav-link;
  border: 2px solid $c-header;
    
}

</style>
