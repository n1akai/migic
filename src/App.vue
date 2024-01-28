<script setup>
import { RouterView } from 'vue-router';
import TheOverlay from './components/TheOverlay.vue';
</script>

<template>
  <notifications position="bottom left" />
  <TheOverlay />
  <RouterView />
  <div class="credits">
    <p>Art by <a href="https://www.pixiv.net/users/58913917" target="_blank">牧师c君</a></p>
    <p>Made with ❤️ by N1 AKAI#7829</p>
  </div>
</template>

<style>
.credits {
  position: fixed;
  bottom: 5px;
  right: 10px;
  color: var(--white);
  font-size: 12px;
}
</style>
