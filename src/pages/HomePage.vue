<template>
  <div class="home-page">
    <div>
      <div class="snowflakes" v-if="isDecember">
        <img
          v-for="(flake, index) in flakes"
          :key="index"
          class="snowflake"
          :style="{
            top: flake.top + 'vh',
            left: flake.left + 'vw',
            animationDelay: flake.delay + 's',
          }"
          src="icons/flocon.svg"
          alt="flake"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentDate = new Date();
const isDecember = currentDate.getMonth() === 11;

const flakes = Array.from({ length: 150 }, createFlake);

function createFlake() {
  return {
    top: Math.random() * -15,
    left: Math.random() * 100,
    delay: Math.random() * 10,
  };
}

function updateFlakes() {
  setInterval(() => {
    flakes.unshift(createFlake());
  }, 100);
}

updateFlakes();
</script>

<style scoped lang="scss">
.home-page {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: auto;
  z-index: -1;
  text-align: center;
}

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
  opacity: 0.7;
  animation:
    snowflake-fall 10s linear infinite,
    snowflake-rotate 3s linear infinite;
  animation-iteration-count: infinite;
  transform: rotate(0deg);
}

@keyframes snowflake-fall {
  0% {
    transform: translateY(-15vh) rotate(0deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(100vh) rotate(360 * 2deg);
    opacity: 0;
  }
}
</style>
