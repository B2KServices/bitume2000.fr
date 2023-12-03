<template>
  <div>
    <nav :class="navBar" v-if="useUserConnectedStore().getUserConnected() == null">
      <a @click="$router.push('/login')">connexion</a>
    </nav>
    <nav :class="navBar" v-else>
      <a @click="$router.push('/profil')">Gérer le compte</a>
      <a @click="$router.push('/roles')">Gérer les rôles</a>
      <a @click="$router.push('/achievements')">Voir les achievements</a>
      <a @click="useUserConnectedStore().disconnect()">Déconnexion</a>
    </nav>
    <nav>
      <img
        src="src/assets/white_logo.svg"
        alt="logo"
        height="120"
        width="180"
      />
      <div class="separator"></div>
      <a>
        <img src="icons/home.svg" height="30" width="32" alt="home_logo" />
        <span>ACCUEIL</span>
      </a>
      <div class="separator"></div>
      <a>
        <img src="icons/game.svg" height="30" width="32" alt="game_logo" />
        <span>JEUX ET SERVEUR</span>
      </a>
      <div class="separator"></div>
      <a>
        <img src="icons/art.svg" height="30" width="32" alt="game_logo" />
        <span>ARTS</span>
      </a>
      <div class="separator"></div>
      <a>
        <img src="icons/social.svg" height="30" width="32" alt="game_logo" />
        <span>SOCIAL</span>
      </a>
      <div class="separator"></div>
      <a>
        <img src="icons/other.svg" height="30" width="32" alt="game_logo" />
        <span>AUTRES</span>
      </a>
      <div class="separator"></div>
      <span v-if="useUserConnectedStore().getUserConnected() == null">Veuillez vous <br />connecter</span>
      <span v-else>Bonjour {{useUserConnectedStore().getUserConnected().title}}, {{useUserConnectedStore().getUserConnected()?.name}}</span>
      <ProfilWidget @click="
          navBar =
            navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
        " :user="useUserConnectedStore().getUserConnected()">
      </ProfilWidget>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useUserConnectedStore} from "stores/useUserConnectedStore";
import ProfilWidget from "components/ProfilWidget.vue";

const navBar = ref('profil-bar');
</script>

<style lang="scss" scoped>
div {
  position: relative;
}

.profil-bar {
  background: $dark;
  position: absolute;
  width: 100%;
  height: 100px;
  transition: all 1s;
  bottom: 0;

  &.open {
    bottom: -50px;
  }

  a {
    text-align: end;
    //font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: $light;
    margin: 50px 0 0 0;
  }

  a:hover {
    background: transparent;
  }
}

nav {
  min-width: 800px;
  background: $dark-page;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  border-radius: 0 0 30px 30px;

  .separator {
    flex-shrink: 0;
    width: 1px;
    height: 100px;
    background: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  span {
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: $light;
  }

  & > span {
    margin-left: 2em;
  }

  a {
    flex-grow: 1;
    padding: 20px;
    text-align: center;
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  a:hover {
    background: $dark;
  }

  @media (max-width: 1200px) {
    a {
      //display: none;
      flex-direction: column;
    }
  }
}
</style>
