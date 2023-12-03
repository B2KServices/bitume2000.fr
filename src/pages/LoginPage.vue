<template>
  <div class="background">
    <div class="header">
      <h1>Authentification</h1>

      <q-input
        v-model="pseudo"
        class="input"
        dense
        label="Pseudo"
        outlined
        rounded
        type="search"
      />
    </div>
    <div class="submit">
      <q-btn
        :loading="chargement"
        class="connect"
        label="Connexion"
        rounded
        size="XL"
        type="submit"
        unelevated
        @click="connect"
      />
      <q-btn :disable="true" class="switch" icon="password" round></q-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useUserConnectedStore} from 'stores/useUserConnectedStore';
import {useRouter} from 'vue-router';
import {useQuasar} from 'quasar';

const pseudo = ref('');
const chargement = ref(false);
const $router = useRouter();
const $q = useQuasar();

async function connect() {
  chargement.value = true;
  const res = await useUserConnectedStore().connect(pseudo.value, null);
  if (res) {
    await $router.push('/');
    return;
  }
  chargement.value = false;
  $q.notify({
    message: 'Pseudo incorrect',
    color: 'red',
    position: 'top-right',
    icon: 'report_problem',
    timeout: 2000,
  });
}
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 90%;
  height: 90vh;
  border-radius: 50px;
  background: $dark-page;
  margin: 5vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    h1 {
      padding: 20px;
      color: $light;
      text-align: center;
    }

    .input {
      margin: 0 auto;
      //height: 70px;
      width: 50%;
      background: $light;
      border-radius: 25px;
      color: $primary;
    }
  }

  .submit {
    display: flex;
    margin: 20px;
    justify-content: center;
    gap: 20px;

    .switch {
      background: $secondary;
      border-radius: 25px;
      color: $light;
    }

    .connect {
      width: 50%;
      background: $primary;
      border-radius: 25px;
      color: $light;
    }
  }
}
</style>
