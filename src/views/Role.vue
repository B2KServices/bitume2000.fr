<template>
  <div>
    <h1>Role Page</h1>
    <div v-for="(category, index) in categories" :key="index" class="category-card" :style="{ backgroundColor: category.color }">
      <h2>{{ category.name }}</h2>
      <div v-for="(role, roleIndex) in category.children" :key="roleIndex" class="role-item">
        <span>{{ role.name }}</span>
        <button :class="{ active: role.active }" @click="roleUpdate">
          {{ role.active ? 'Actif' : 'Inactif' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  name: 'RolePage',
  data() {
    return {
      categories: [],
      isLoading: false
    };
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      this.isLoading = true;
      try {
        const response = await axios.get('https://api.bitume2000.fr/v2/role/category', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
          }
        });

        if (response.data) {
          this.categories = response.data;
        } else {
          this.redirectToAuth();
        }
      } catch (error) {
        this.redirectToAuth();
      } finally {
        this.isLoading = false;
      }
    },
    redirectToAuth() {
      if (confirm('Vous n\'avez pas les permissions nécessaires. Voulez-vous vous authentifier ?')) {
        this.$router.push('/login?redirect=/role');
      } else {
        this.$router.push('/');
      }
    }
  }
}
</script>

<style>
@import "../style/role-page.css";
</style>