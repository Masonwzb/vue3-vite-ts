import { buildProps } from '../utils'
import { isNumber } from '../utils/types'
import type { ExtractPropTypes, Ref } from 'vue'

export const sliderButtonProps = buildProps({
  modelValue: {
    type: Number,
    default: 0
  }
} as const)

export type SliderButtonProps = ExtractPropTypes<typeof sliderButtonProps>

export const sliderButtonEmits = {
  ['update:modelValue']: (value: number) => isNumber(value)
}

export type SliderButtonEmits = typeof sliderButtonEmits

export interface SliderButtonInitData {
  hovering: boolean
  dragging: boolean
  isClick: boolean
  startX: number
  currentX: number
  startY: number
  currentY: number
  startPosition: number
  newPosition: number
  oldValue: number
}
