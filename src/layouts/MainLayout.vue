<script setup lang="ts">
import { UserModel } from 'src/models/user-model.ts';
import { useUsersApi } from 'src/composables/users/useUsersApi.ts';
import { ref } from 'vue';
import { useAuthApi } from 'src/composables/auth/useAuthApi.ts';

defineOptions({
  name: 'MainLayout',
});

const meUser = ref<UserModel>();
const userApi = useUsersApi();
const authApi = useAuthApi();

userApi.getMe().then((user) => {
  meUser.value = user;
});

const navBar = ref('profil-bar');
const navigation_layout = ref('navigation_layout');
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-list :class="navigation_layout">
      <q-list v-if="!meUser" :class="[navBar]" style="border-radius: 30px">
        <q-item to="/login">connexion</q-item>
      </q-list>
      <q-list v-else :class="[navBar, 'q-px-lg']" style="border-radius: 30px">
        <q-item to="/profil">Gérer le compte</q-item>
        <q-item to="/roles">Gérer les rôles</q-item>
        <q-item to="/achievements">Voir les achievements</q-item>
        <q-item to="/login" @click="authApi.logout()">Déconnexion</q-item>
      </q-list>
      <nav>
        <q-list>
          <q-avatar size="150px">
            <img
              alt="logo"
              src="logos/logo_2.svg"
              @click="
                navigation_layout =
                  navigation_layout == 'navigation_layout open'
                    ? 'navigation_layout'
                    : 'navigation_layout open'
              "
            />
          </q-avatar>
        </q-list>
        <q-list style="display: flex" class="mobile-row">
          <div class="separator" />
          <router-link to="/">
            <a>
              <img
                alt="home_logo"
                height="30"
                src="icons/home.svg"
                width="32"
              />
              <span>ACCUEIL</span>
            </a>
          </router-link>
          <div class="separator" />
          <router-link to="/games">
            <a>
              <img
                alt="game_logo"
                height="30"
                src="icons/game.svg"
                width="32"
              />
              <span>JEUX ET SERVEUR</span>
            </a>
          </router-link>

          <div class="separator" />
          <router-link to="/art">
            <a>
              <img alt="art_logo" height="30" src="icons/art.svg" width="32" />
              <span>ARTS</span>
            </a>
          </router-link>
          <div class="separator" />
          <router-link to="/social">
            <a>
              <img
                alt="social_logo"
                height="30"
                src="icons/social.svg"
                width="32"
              />
              <span>SOCIAL</span>
            </a>
          </router-link>
          <div class="separator" />
          <router-link to="/other">
            <a>
              <img
                alt="other_logo"
                height="30"
                src="icons/other.svg"
                width="32"
              />
              <span>AUTRES</span>
            </a>
          </router-link>
          <div class="separator" />
        </q-list>
        <q-list
          @click="
            navBar =
              navBar == 'profil-bar open' ? 'profil-bar' : 'profil-bar open'
          "
        >
          <q-item-label v-if="meUser"
            >Bonjour {{ meUser.username }}</q-item-label
          >
          <q-item-label v-else>Vous n'êtes pas connecté</q-item-label>
          <q-avatar v-if="meUser" class="q-pa-sm" size="70px">
            <img alt="profil_logo" :src="meUser.avatar_url" />
          </q-avatar>
          <q-avatar v-else class="q-pa-sm" size="70px">
            <img alt="profil_logo" src="icons/profil.svg" />
          </q-avatar>
        </q-list>
      </nav>
    </q-list>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
}

.navigation_layout {
  position: fixed;
  z-index: 1;
  width: 100%;
}

.profil:hover,
.profil-widget:hover {
  cursor: pointer;
}

div {
  position: relative;
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
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.open {
    bottom: -50px;
  }

  a {
    text-align: end;
    font-size: 15px;
    font-weight: 400;
    color: white;
    margin: 50px 0 0 0;

    &:hover {
      background: transparent;
    }
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
    font-weight: 400;
    color: $dark;

    & > span {
      margin-left: 2em;
    }
  }

  a {
    flex-grow: 1;
    padding: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    gap: 0.5em;

    &:hover {
      cursor: pointer;
    }
  }
}

@media (max-width: 1200px) {
  .mobile-row {
    flex-direction: column;
    align-items: center;
  }

  nav {
    flex-direction: column;
    min-width: 100px;

    .separator {
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
    flex-direction: column;

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
    img {
      transition: transform 0.5s;

      &:active {
        transform: scale(0.9);
        transition: transform 0.1s;
      }
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
            height 1s ease-in-out,
            width 0.5s ease-in-out,
            opacity 0.5s ease-out;
        }
      }
    }
  }
}
</style>
