<template>
  <div class="login-page">
    <div class="background">
      <div class="header">
        <h1>Authentification</h1>

        <q-input
          v-model="pseudo"
          class="input"
          label="Pseudo"
          color="primary"
          outlined
          rounded
          type="search"
          @keyup.enter="connect"
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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserConnectedStore } from 'stores/useUserConnectedStore';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const pseudo = ref('');
const chargement = ref(false);
const $router = useRouter();
const $q = useQuasar();


async function connect() {
  chargement.value = true;
  const res = await useUserConnectedStore().connect(pseudo.value, null);
  const dir = $router.currentRoute.value.query.dir;
  if (res) {
    if (dir) await $router.push(dir as string);
    else await $router.push('/');
    return;
  }
  chargement.value = false;
  $q.notify({
    message: 'Pseudo incorrect',
    color: 'red',
    position: 'top-right',
    icon: 'report_problem',
    timeout: 2000
  });
}
</script>

<style lang="scss" scoped>

.login-page {
  width: 100vw;
  height: 100vh;
  background: $dark;
  padding: 80px 0 20px 0;

  .background {
    position: relative;
    top: 0;
    left: 0;
    width: 50%;
    height: 90%;
    border-radius: 50px;
    background: $dark-page;
    box-shadow: 0 0 20px 0 #000000;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .header {
      h1 {
        padding: 10px;
        color: $light;
        text-align: center;
        font-size: 5vw;
        display: flex;
        justify-content: center;
      }

      .input {
        margin: 0 auto;
        width: 50%;
        background: $light;
        border-radius: 30px;
      }
    }

    .submit {
      display: flex;
      margin: 3vh;
      justify-content: center;
      gap: 20px;

      .switch, .connect {
        border-radius: 25px;
        color: $light;
        &.switch {
          background: $secondary;
        }
        &.connect {
          width: 50%;
          background: $primary;
        }
      }
    }
  }
}

@media (max-width: 600px) {
  .login-page {
    padding: 0;

    .background {
      width: 100%;
      margin: 0;
      height: 100%;
      border-radius: 0;

      .header {
        h1 {
          font-size: 10vw;
        }

        .input {
          width: 90%;
        }
      }

      .submit {
        .connect {
          width: 90%;
        }
      }
    }
  }
}

</style>
