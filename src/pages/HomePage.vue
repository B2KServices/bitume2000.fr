<template>
  <div>
    <NavBar />
    <div>
      <h1>Joyeux noel</h1>
      <div class="snowflakes" v-if="isDecember">
        <div v-for="(flake, index) in flakes" :key="index" class="snowflake"
             :style="{ top: flake.top + 'vh', left: flake.left + 'vw', animationDelay: flake.delay + 's' }"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from 'layouts/NavBar.vue';

const currentDate = new Date();
const isDecember = currentDate.getMonth() === 11;

const createFlake = () => ({
  top: Math.random() * -10, // Commencez au-dessus de la fenêtre
  left: Math.random() * 100,
  delay: Math.random() * 10 // Décalage d'animation aléatoire plus grand
});

const flakes = Array.from({ length: 100 }, createFlake);

setInterval(() => {
  flakes.unshift(createFlake());
}, 100);

</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin-top: 100px;
  font-size: 50px;
  font-weight: 700;
  color: red;
}

.snowflakes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 1000;
}

.snowflake {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #7e7d7d;
  border-radius: 50%;
  opacity: 0.7;
  animation: snowflake-fall 10s linear infinite;
  animation-iteration-count: infinite;
}

@keyframes snowflake-fall {
  0% {
    transform: translateY(-10vh);
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
