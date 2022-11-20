<script setup lang="ts">
import { ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
// import FreeDragColumn from './components/freeDragColumn/index.vue';
// import './components/switch/vueWebComponent/index.ts'
// import './components/switch/webComponent/index.ts'
// import mySwitch from './components/switch/element/components/switch.vue'
// import './components/switch/element/components/index.ts'
// import carouselDemo from './components/carousel/index.vue'
// import CarouselDemo from "./components/carousel/index.vue";
// import "./components/rotatingCube"
// import './practice/fileParse/gltf.ts'
// import './practice/comlink/index.ts'
// import EventTest from './components/eventListener/index.vue'
// import './practice/webRTC/twoTabPeerconnection.js'
// import './practice/inversify'
// import './practice/designPatterns/Flyweight/eg1.ts'
// import TimeLineSlider from './components/slider'

function personaChanged(e: Event) {
  const [isChecked] = (e as CustomEvent).detail
  value1.value = isChecked
}

const value1 = ref(true)
const value2 = ref([30, 60])

function handleSliderChange(val: any) {
  console.log('handleSliderChange = ', val)
}

function handleSliderInput(val: any) {
  console.log('handleSliderInput colleague changes = ', val)
}
</script>

<template>
<!--  <img alt="Vue logo" src="./assets/logo.png" />-->
<!--  <persona-vue-switch :value="value1" :width="40" @change="personaChanged"></persona-vue-switch>-->
<!--  <carousel-demo />-->
<!--  <my-switch v-model="value1" :width="100"></my-switch>-->
<!--  <persona-switch @update="personaChanged" customprop="vueAttribute"></persona-switch>-->
<!--  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />-->
<!--  <FreeDragColumn></FreeDragColumn>-->
<!--  <my-slider v-model='value2'></my-slider>-->

<!--  <div class="container">-->
<!--    <button type="button" class="cube-button">Random</button>-->
<!--    <div class="ball"></div>-->
<!--    <div class="cube-container">-->
<!--      <div class="cube">-->
<!--        <div class="face front"></div>-->
<!--        <div class="face back"></div>-->
<!--        <div class="face top"></div>-->
<!--        <div class="face bottom"></div>-->
<!--        <div class="face left"></div>-->
<!--        <div class="face right"></div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->

<!--  <EventTest />-->

<!--  <div style="width: 100%;height: 100px;display: flex;justify-content: center;align-items: center;background: #2F354C;">-->
<!--    <div style="width: 700px">-->
<!--      <TimeLineSlider :range='true' v-model='value2' @change='handleSliderChange' @input='handleSliderInput' />-->
<!--    </div>-->
<!--  </div>-->

</template>

<style lang='scss'>
//@import "./components/slider/style.scss";
/*@import "./components/rotatingCube/index.css";*/
/*body {*/
/*  background: #e0cdcf;*/
/*}*/

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
