<script setup lang="ts">
import ProfilWidget from 'components/ProfilWidget.vue';
import { UserModel } from 'src/models/user-model.ts';
import { useUsersApi } from 'src/composables/users/useUsersApi.ts';
import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const meUser = ref<UserModel>();
const userApi = useUsersApi();

userApi.getMe().then((user) => {
  meUser.value = user;
});

const navBar = ref('profil-bar');
const navigation_layout = ref('navigation_layout');
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <div :class="navigation_layout">
      <nav v-if="!meUser" :class="navBar">
        <a @click="$router.push('/login')">connexion</a>
      </nav>
      <nav v-else :class="navBar">
        <a @click="$router.push('/profil')">Gérer le compte</a>
        <a @click="$router.push('/roles')">Gérer les rôles</a>
        <a @click="$router.push('/achievements')">Voir les achievements</a>
        <a @click="console.log('coming soon')">Déconnexion</a>
      </nav>
      <nav>
        <q-img
          alt="logo"
          height="120"
          src="logos/logo_2.svg"
          width="120"
          @click="
            navigation_layout =
              navigation_layout == 'navigation_layout open'
                ? 'navigation_layout'
                : 'navigation_layout open'
          "
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
          <img
            alt="social_logo"
            height="30"
            src="icons/social.svg"
            width="32"
          />
          <span>SOCIAL</span>
        </a>
        <div class="separator"></div>
        <a>
          <img alt="other_logo" height="30" src="icons/other.svg" width="32" />
          <span>AUTRES</span>
        </a>
        <div class="separator"></div>
        <span
          v-if="!meUser"
          class="profil"
          @click="
            navBar =
              navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
          "
          >Veuillez vous connecter</span
        >
        <span
          class="profil"
          @click="
            navBar =
              navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
          "
          v-else
          >Bonjour {{ meUser.username }}</span
        >
        <ProfilWidget
          v-if="meUser"
          :user="meUser"
          @click="
            navBar =
              navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
          "
          class="profil-widget"
        />
        <q-avatar icon="person" />
      </nav>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss" scoped>
.navigation_layout {
  position: fixed;
  z-index: 1;
  width: 100%;
}

.profil:hover {
  cursor: pointer;
}

div {
  position: relative;
}

.profil-widget:hover {
  cursor: pointer;
}

.profil-widget {
  margin-left: 10px;
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
    color: white;
    margin: 50px 0 0 0;
  }

  a:hover {
    background: transparent;
  }
}

nav {
  min-width: 800px;
  background: #fbe0b5;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  position: sticky;
  border-radius: 0 0 30px 30px;
  width: 100%;

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
    color: $dark;
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
    width: 100%;
  }

  a:hover {
    cursor: pointer;
  }
}

@media (max-width: 1200px) {
  nav {
    flex-direction: column;
    min-width: 100px;

    .separator {
      //display: none;
      width: 15vw;
      height: 1px;
    }
  }

  .profil {
    margin-top: 10px;
    text-align: center;
  }

  .profil-bar {
    height: 250px;

    &.open {
      bottom: -200px;
    }

    a {
      margin-top: 0;
      margin-bottom: 0;
      padding: 10px;

      &:first-child {
        margin-top: 50px;
      }
    }
  }

  .navigation_layout {
    img:active {
      transform: scale(0.9);
      transition: transform 0.1s;
    }

    img {
      transition: transform 0.5s;
    }

    &:not(.open) {
      nav:last-child {
        a:not(:first-child) {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          padding: 0;
          margin: 0;
          transition:
            max-height 0.5s ease-out,
            opacity 0.25s ease-out,
            padding 0.5s ease-out,
            margin 0.5s ease-out;
        }
        .separator {
          opacity: 0.75;
          height: 1px;
          width: 40vw;
          transition:
            //height 1s ease-in-out,
            width 0.5s ease-in-out,
            opacity 0.5s ease-out;
        }
      }
    }

    &.open {
      nav {
        a {
          transition:
            max-height 0.5s ease-out,
            opacity 0.25s ease-out,
            padding 0.5s ease-out,
            margin 0.5s ease-out;
        }
        .separator {
          transition:
            //height 1s ease-in-out,
            width 0.5s ease-in-out,
            opacity 0.5s ease-out;
        }
      }
    }
  }
}
</style>
