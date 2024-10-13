<script lang="ts" setup>
import { defineProps } from 'vue';
import { UserModel } from 'src/models/user-model.ts';

type Props = {
  user?: UserModel;
};

defineProps<Props>();
</script>

<template>
  <div v-if="user">
    <div>
      <img
        :src="user.avatar_url == null ? 'icons/profil.svg' : user.avatar_url"
        alt="profil_logo"
        height="128"
        width="128"
      />
    </div>
  </div>
  <div v-else>
    <div>
      <img
        :src="'icons/profil.svg'"
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
