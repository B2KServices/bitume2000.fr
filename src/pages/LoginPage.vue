<template>
  <div class="background">
    <div class="header">
      <h1>Authentification</h1>

      <q-input
        rounded
        outlined
        label="Pseudo"
        type="search"
        dense
        class="input"
        v-model="pseudo"
      />
    </div>
    <div class="submit">
      <q-btn
        unelevated
        rounded
        label="Connexion"
        type="submit"
        size="XL"
        :loading="chargement"
        class="connect"
        @click="connect"
      />
      <q-btn round icon="password" class="switch" :disable="true"></q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserConnectedStore } from 'stores/useUserConnectedStore';

const pseudo = ref('');
const chargement = ref(false);

async function connect(this: any) {
  chargement.value = true;
  console.log(pseudo.value);
  const res = await useUserConnectedStore().getUserToken(pseudo.value, null);
  if (res) {
    this.$router.push('/');
  }
  chargement.value = false;
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
