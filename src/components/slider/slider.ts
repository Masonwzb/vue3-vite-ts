import { buildProps, definePropType } from './utils'
import { isArray, isNumber } from './utils'
import type { Arrayable, RangeValue } from './types'
import type { ExtractPropTypes } from 'vue'

export interface SliderInitData {
  firstValue: number
  secondValue: number
  thirdValue: number
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

const isValidValue = (val: Arrayable<number> | RangeValue) =>
  isNumber(val) ||
  (isArray(val) && (val as Array<number>).every(isNumber)) ||
  (isNumber((val as RangeValue).value) &&
    isArray((val as RangeValue).range) &&
    (val as RangeValue).range.every(isNumber))

export const sliderEmits = {
  ['update:modelValue']: isValidValue,
  ['input']: isValidValue,
  ['change']: isValidValue
}

export type SliderEmits = typeof sliderEmits
