import { defineCustomElement } from 'vue'
import vueSwitch from './persona-switch.ce.vue'

const personaSwitch = defineCustomElement(vueSwitch)

window.customElements.define('persona-switch', personaSwitch)
