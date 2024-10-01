<script setup lang="ts">
import NavBar from 'layouts/NavBar.vue';
import { useUserConnectedStore } from 'stores/useUserConnectedStore';
</script>

<template>
  <NavBar />
  <div
    class="profil-page"
    :style="{
      'background-color':
        '#' + useUserConnectedStore().getUserConnected()?.squad.color,
    }"
  >
    <div>
      <h1>
        {{ useUserConnectedStore().getUserConnected()?.title }},
        {{ useUserConnectedStore().getUserConnected()?.name }}
      </h1>
    </div>
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
