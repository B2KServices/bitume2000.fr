<script lang="ts" setup>
import {defineProps} from 'vue';
import {UserModel} from 'src/models/UserModel';

const {user}: { user?: UserModel | null } = defineProps(['user']);
</script>

<template>
  <div class="circle-container">
    <img
      :src="user == null || user?.avatar == null ? 'icons/profil.svg' : user?.avatar"
      alt="profil_logo"
      class="profil"
    />
  </div>
</template>

<style lang="scss" scoped>
.circle-container {
  width: 100px;
  height: 100px;
}

.circle-container:hover {
  cursor: pointer;
}

.profil {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 50%;
  margin-left: 10px;
}
</style>
