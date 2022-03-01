<template>
  <div
      class="el-switch el-switch--default"
      :class="switchKls"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      @click.prevent="switchValue"
  >
    <input
        :id="id"
        ref="input"
        class="el-switch__input"
        type="checkbox"
        :name="name"
        :disabled="switchDisabled"
        @change="handleChange"
    />
    <span
        ref="core"
        class="el-switch__core"
        :style="{ width: (width || 40) + 'px' }"
    >
      <div class="el-switch__action" />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, nextTick, watch } from "vue"
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  INPUT_EVENT,
} from '../constants'
import {
  useDisabled,
} from '../hooks'
import { switchEmits, switchProps } from "./switch.ts"

export default defineComponent( {
  name: "switch",

  props: switchProps,

  emits: switchEmits,

  setup(props, { emit }) {
    const switchDisabled = useDisabled()

    const isModelValue = ref(props.modelValue !== false)
    const input = ref<HTMLInputElement>()
    const core = ref<HTMLSpanElement>()

    const actualValue = computed(() => {
      return isModelValue.value ? props.modelValue : props.value
    })

    const checked = computed(() => actualValue.value === props.activeValue)

    const switchKls = computed(() => {
      const resultCss = []
      if (switchDisabled.value) {
        resultCss.push('is-disabled')
      }
      if (checked.value) {
        resultCss.push('is-checked')
      }
      return resultCss
    })

    watch(
        () => props.modelValue,
        () => {
          isModelValue.value = true
        }
    )

    watch(
        () => props.value,
        () => {
          isModelValue.value = false
        }
    )

    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue)
      emit(CHANGE_EVENT, props.inactiveValue)
      emit(INPUT_EVENT, props.inactiveValue)
    }

    watch(checked, () => {
      input.value!.checked = checked.value
    })

    const handleChange = (): void => {
      const val = checked.value ? props.inactiveValue : props.activeValue
      emit(UPDATE_MODEL_EVENT, val)
      emit(CHANGE_EVENT, val)
      emit(INPUT_EVENT, val)
      nextTick(() => {
        input.value!.checked = checked.value
      })
    }

    const switchValue = (): void => {
      if (switchDisabled.value) return

      handleChange()
    }

    onMounted(() => {
      input.value!.checked = checked.value
    })

    return {
      input,
      core,
      switchDisabled,
      switchKls,
      checked,
      handleChange,
      switchValue
    }
  }
})
</script>

<style>
@import "./style/base.css";
@import "./style/el-switch.css";
</style>
