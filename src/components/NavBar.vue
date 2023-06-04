<template>
  <div class="nav">
    <nav>
      <div class="nav-logo">
        <img src="../images/logo.png" alt="logo" width="125">
        <h1>{{ actualSeason }}</h1>
      </div>
      <div class="nav-menu">
        <div class="menu-category">
          <a>Accueil</a>
        </div>
        <div class="menu-category">
          <a @click="GamesMenu=!GamesMenu">Jeux et Serveurs</a>
          <ul v-if="GamesMenu">
          </ul>
        </div>
        <div class="menu-category">
          <a @click="ArtMenu=!ArtMenu">Arts</a>
          <ul v-if="ArtMenu">
          </ul>
        </div>
        <div class="menu-category">
          <a @click="SocialMenu=!SocialMenu">réseau social</a>
          <ul v-if="SocialMenu">
          </ul>
        </div>
        <div class="menu-category">
          <a @click="accountMenu=!accountMenu">compte</a>
          <ul v-if="accountMenu">
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";

const GamesMenu = ref(false);
const ArtMenu = ref(false);
const SocialMenu = ref(false);
const accountMenu = ref(false);
const username = ref();

const actualSeason = ref();
getActualSeason();
getNameAccount();

function getActualSeason() {
  axios.get('https://api.bitume2000.fr/v2/general/season', {
    headers: {
      'Content-Type': 'application/json',
    }
  })
      .then(response => {
        actualSeason.value = response.data.value;
      })
      .catch(error => {
        console.log(error);
      });
}

function hasToken() {
  if (this === undefined)
    return false;
  if (this.$cookie === undefined)
    return false;
  const token = this.$cookie.get('token');
  if (token === null) {
    return false;
  }
  return true;
}

function getNameAccount() {
  if (hasToken() === false) {
    username.value = "Compte";
    return;
  }
  const token = this.$cookie.get('token');
  axios
      .get("https://api.bitume2000.fr/v2/members/id", {
        authorization: "bearer " + token,
      })
      .then(response => {
        username.value = response.data;
      })
      .catch(error => {
        console.log(error);
        username.value = "Compte";
      });
}
</script>

<style>
@import "../style/navbar.css";
</style>