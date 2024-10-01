<script lang="ts" setup>
import { defineProps } from 'vue';
import { UserModel } from 'src/models/UserModel';

const { user }: { user?: UserModel | null } = defineProps(['user']);
</script>

<template>
  <div
    v-if="user != null"
    :style="{ 'background-color': '#' + user?.squad.color }"
  >
    <div>
      <img
        :src="user?.avatar == null ? 'icons/profil.svg' : user?.avatar"
        alt="profil_logo"
        height="128"
        width="128"
      />
    </div>
  </div>
  <div v-else>
    <div>
      <img
        :src="user?.avatar == null ? 'icons/profil.svg' : user?.avatar"
        alt="profil_logo"
        height="128"
        width="128"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  div {
    width: 100px;
    height: 100px;
    text-align: center;

    img {
      width: 100%;
      height: auto;
      border-radius: 50%;
    }
  }
}
</style>
