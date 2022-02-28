<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import FreeDragColumn from './components/freeDragColumn/index.vue';
import './components/switch/webComponent/index.ts'

function personaChanged() {
  console.log('is get ??? Event the bind');
}
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <persona-switch @get="personaChanged"></persona-switch>
<!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
<!--  <FreeDragColumn></FreeDragColumn>-->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
