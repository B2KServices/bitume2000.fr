
<template>
  <body>
    <Nav/>
    <router-view></router-view>
  </body>
</template>


<script>
import Home from '../components/NavBar.vue'
export default {
  name: 'app',
  components: {
    Nav: Home
  }
}
</script>
