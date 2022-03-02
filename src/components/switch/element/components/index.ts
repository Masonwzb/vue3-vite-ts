import { defineCustomElement } from 'vue'
import vueSwitch from './switch.ce.vue'

const personaSwitch = defineCustomElement(vueSwitch)

window.customElements.define('persona-vue-switch', personaSwitch)
