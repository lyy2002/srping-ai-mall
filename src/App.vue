<script setup>
import { RouterLink, RouterView } from 'vue-router'
import ChatPage from './components/ChatPage.vue';
</script>

<template>
  <ChatPage />
  <RouterView />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
