<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthApi } from 'src/composables/auth/useAuthApi.ts';

const pseudo = ref('');
const password = ref('');
const chargement = ref(false);
const $router = useRouter();
const $q = useQuasar();
const discord_connection = ref(true);
const userApi = useAuthApi();
async function connect() {
  chargement.value = true;
  if (discord_connection.value) {
    userApi
      .login_discord(pseudo.value)
      .then(() => {
        chargement.value = false;
        $router.push('/');
      })
      .catch((error) => {
        chargement.value = false;
        $q.notify({
          message: error.message,
          color: 'red',
          position: 'top-right',
          icon: 'report_problem',
          timeout: 2000,
        });
      });
  } else {
    userApi
      .login(pseudo.value, password.value)
      .then(() => {
        chargement.value = false;
        $router.push('/');
      })
      .catch((error) => {
        chargement.value = false;
        $q.notify({
          message: error.message,
          color: 'red',
          position: 'top-right',
          icon: 'report_problem',
          timeout: 2000,
        });
      });
  }
}
</script>
<template>
  <div
    class="q-pa-md flex justify-center items-center"
    style="height: 100vh; background: #cdd9e0"
  >
    <q-card
      style="background: #fef5e6; gap: 64px; padding: 85px"
      class="flex column justify-center"
    >
      <div class="justify-center flex">
        <q-img src="logos/logo_2.svg" alt="logo" height="auto" width="200px" />
      </div>
      <form @submit.prevent="connect">
        <q-item-section class="flex" style="gap: 32px">
          <q-input
            v-model="pseudo"
            label="Pseudo"
            outlined
            rounded
            bg-color="white"
          />
          <q-input
            v-if="!discord_connection"
            v-model="password"
            label="Mot de passe"
            outlined
            rounded
            bg-color="white"
            type="password"
          />
        </q-item-section>
      </form>
      <q-item-section class="flex" style="flex-direction: row; gap: 32px">
        <q-btn
          @click="connect"
          label="Se connecter"
          color="primary"
          :loading="chargement"
          type="submit"
        />
        <q-btn
          @click="discord_connection = !discord_connection"
          color="secondary"
          :icon="discord_connection ? 'password' : 'discord'"
        />
      </q-item-section>
    </q-card>
  </div>
</template>

<style lang="scss" scoped></style>
