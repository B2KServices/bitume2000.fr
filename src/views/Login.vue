<template>
  <div>
    <h1>Authentification</h1>
    <form @submit.prevent="login">
      <label for="pseudo">Pseudo :</label>
      <input type="text" id="pseudo" v-model="pseudo" required>
      <button type="submit" :disabled="isLoading">Se connecter</button>
    </form>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
export default {
  name: 'LoginPage',
  data() {
    return {
      pseudo: '',
      isLoading: false
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      const url = 'https://api.bitume2000.fr/v2/auth/login';
      const body = {
        username: this.pseudo
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (response.ok) {
          console.log('Authentification réussie');
          const data = await response.json();
          let date = new Date();
          date.setHours(date.getHours() + 2);
          Cookies.set('token', data.token, { expires: date});
          this.$router.push('/');
        } else {
          console.error('Erreur d\'authentification');
          this.isLoading = false;
        }
      } catch (error) {
        console.error('Erreur de connexion', error);
      }
    }
  }
}
</script>