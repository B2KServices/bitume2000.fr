<template>
  <div>
    <nav v-if="useUserConnectedStore().getUserConnected() == null" :class="navBar">
      <a @click="$router.push('/login')">connexion</a>
    </nav>
    <nav v-else :class="navBar">
      <a @click="$router.push('/profil')">Gérer le compte</a>
      <a @click="$router.push('/roles')">Gérer les rôles</a>
      <a @click="$router.push('/achievements')">Voir les achievements</a>
      <a @click="useUserConnectedStore().disconnect()">Déconnexion</a>
    </nav>
    <nav>
      <img
        alt="logo"
        height="120"
        src="logos/white_logo.svg"
        width="120"
      />
      <div class="separator"></div>
      <a @click="$router.push('/')">
        <img alt="home_logo" height="30" src="icons/home.svg" width="32" />
        <span>ACCUEIL</span>
      </a>
      <div class="separator"></div>
      <a>
        <img alt="game_logo" height="30" src="icons/game.svg" width="32" />
        <span>JEUX ET SERVEUR</span>
      </a>
      <div class="separator"></div>
      <a>
        <img alt="art_logo" height="30" src="icons/art.svg" width="32" />
        <span>ARTS</span>
      </a>
      <div class="separator"></div>
      <a>
        <img alt="social_logo" height="30" src="icons/social.svg" width="32" />
        <span>SOCIAL</span>
      </a>
      <div class="separator"></div>
      <a>
        <img alt="other_logo" height="30" src="icons/other.svg" width="32" />
        <span>AUTRES</span>
      </a>
      <div class="separator"></div>
      <span v-if="useUserConnectedStore().getUserConnected() == null">Veuillez vous <br />connecter</span>
      <span
        v-else>Bonjour {{ useUserConnectedStore().getUserConnected().title
        }}, {{ useUserConnectedStore().getUserConnected()?.name }}</span>
      <ProfilWidget :user="useUserConnectedStore().getUserConnected()" @click="
          navBar =
            navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
        " class="profil-widget">
      </ProfilWidget>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserConnectedStore } from 'stores/useUserConnectedStore';
import ProfilWidget from 'components/ProfilWidget.vue';

const navBar = ref('profil-bar');
</script>

<style lang="scss" scoped>
div {
  position: relative;
}

.profil-widget:hover {
  cursor: pointer;
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
    cursor: pointer;
  }

  @media (max-width: 1200px) {
    a {
      //display: none;
      flex-direction: column;
    }
  }
}
</style>
