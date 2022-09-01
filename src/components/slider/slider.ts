import { buildProps, definePropType } from './utils'
import { isArray, isNumber } from './utils/types'
import type { Arrayable } from './types'
import type { ExtractPropTypes } from 'vue'

export interface SliderInitData {
  firstValue: number
  secondValue: number
  oldValue?: Arrayable<number>
  dragging: boolean
  sliderSize: number
}

export const sliderProps = buildProps({
  modelValue: {
    type: definePropType<Arrayable<number>>([Number, Array]),
    default: 0
  },
  id: {
    type: String,
    default: undefined
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  disabled: Boolean,
  range: Boolean
} as const)

export type SliderProps = ExtractPropTypes<typeof sliderProps>

const isValidValue = (value: Arrayable<number>) =>
  isNumber(value) || (isArray(value) && value.every(isNumber))

export const sliderEmits = {
  ['update:modelValue']: isValidValue,
  ['input']: isValidValue,
  ['change']: isValidValue
}

export type SliderEmits = typeof sliderEmits
