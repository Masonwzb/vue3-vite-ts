import { defineCustomElement } from 'vue'
import vueSwitch from './persona-switch.ce.vue'

console.log(vueSwitch) // ["/* 内联的 css */"]

const personaSwitch = defineCustomElement(vueSwitch)

window.customElements.define('persona-switch', personaSwitch)
