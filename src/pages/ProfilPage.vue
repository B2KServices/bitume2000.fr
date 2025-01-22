<script setup lang="ts">
import { computed, ref } from 'vue';
import { UserModel } from 'src/models/user-model.ts';
import { useUsersApi } from 'src/composables/users/useUsersApi.ts';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const meUser = ref<UserModel>();
const password = ref<string>();
const username = ref<string>();
const Fileimage = ref<File>();
const FileUrl = computed(() => {
  if (Fileimage.value) {
    return URL.createObjectURL(Fileimage.value);
  }
  return meUser.value?.avatar_url;
});

const userApi = useUsersApi();

userApi.getMe().then((user) => {
  meUser.value = user;
  username.value = user.username;
});

function updateUser() {
  if (Fileimage.value) {
    userApi.updateAvatar(Fileimage.value).then((user) => (meUser.value = user));
  }

  userApi
    .updateMe({
      username: username.value,
      password: password.value,
    })
    .then((user) => {
      meUser.value = user;
      $q.notify({
        message: 'Profil mis à jour',
        color: 'green',
        position: 'top-right',
        icon: 'task_alt',
        timeout: 2000,
      });
    })
    .catch((error) => {
      $q.notify({
        message: error.message,
        color: 'red',
        position: 'top-right',
        icon: 'report_problem',
        timeout: 2000,
      });
    });
}

// function updatePhoto() {
//
// }
</script>

<template>
  <div class="flex justify-center q-pa-md">
    <q-card
      class="q-pa-xl text-center flex column rounded-md justify-center"
      flat
      style="gap: 25px; max-width: 50%"
    >
      <h2>Mon profil</h2>
      <q-item-section class="flex items-end">
        <q-file
          v-model="Fileimage"
          class="flex"
          standout
          style="gap: 12px; max-width: 200px; background: white"
          accept=".png,.jpeg,.jpg,.gif"
        >
          <template v-slot:default>
            <q-avatar size="70px">
              <img alt="profil_logo" :src="FileUrl" />
            </q-avatar>
          </template>
        </q-file>
      </q-item-section>
      <q-form class="items-start flex">
        <q-item-section class="flex column" style="gap: 20px">
          <q-input v-model="username" label="username" outlined rounded />
          <q-input v-model="password" label="password" outlined rounded />
          <q-btn
            label="sauvegarder"
            @click="updateUser"
            rounded
            color="primary"
          ></q-btn>
        </q-item-section>
      </q-form>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.profil-page {
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  padding: 100px 0 0 0;
  z-index: -1;
  text-align: center;

  div {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
