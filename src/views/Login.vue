<script setup lang="ts">

import Card from '@/components/ui/card/Card.vue'
</script>

<template>
  <Card >
    <h1 class="text-2xl font-bold">Login</h1>
    <p class="text-muted-foreground">Please enter your credentials to continue.</p>
    <form class="flex flex-col gap-4">
      <label for="username" class="text-sm font-medium">Username</label>
      <input id="username" type="text" class="input" placeholder="Enter your username" />

      <label for="password" class="text-sm font-medium">Password</label>
      <input id="password" type="password" class="input" placeholder="Enter your password" />

      <button type="submit" class="btn btn-primary mt-4">Login</button>
    </form>
  </Card>
</template>

<style scoped>

</style>