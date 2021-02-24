<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/font/iconfont.css"
export default {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body,html,h1,h2,ul,ol{
  padding: 0;
  margin: 0;
}
body{
  --foo: #545c64;
  --col: #ffffff;
  --bar: #F7EFD2;
}
.pagination-container{
  margin-top: 20px;
}
</style>
