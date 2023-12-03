<script setup lang="ts">
import { defineProps } from 'vue';
import { UserModel } from 'src/models/UserModel';

const { user }: { user?: UserModel | null } = defineProps(['user']);
</script>

<template>
  <div class="circle-container">
    <img
      class="profil"
      :src="user == null || user?.avatar == null ? 'icons/profil.svg' : user?.avatar"
      alt="profil_logo"
    />
  </div>
</template>

<style scoped lang="scss">
.circle-container {
  width: 100px;
  height: 100px;
}

.profil {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 50%; /* Rendre l'image circulaire */
}
</style>
