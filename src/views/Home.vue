<template>
  <body>
  <Nav/>
  <router-view></router-view>
  <div class="body">
    <div class="content">
      <div class="scoreboard">
        <div class="scoreboard-element">
          <h1>les meilleurs membres</h1>
        </div>
        <div class="scoreboard-element">
          <h1>la meilleure escouade</h1>
        </div>
      </div>
      <div class="announcement">

      </div>
    </div>
  </div>
  <footer>
    <!-- Votre contenu de pied de page ici -->
  </footer>
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
<style>
@import url('../style/home.css');
</style>