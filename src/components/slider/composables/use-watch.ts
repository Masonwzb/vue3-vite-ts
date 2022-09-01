import { watch } from 'vue'
import { debugWarn, throwError } from '../utils/error'
import type { ComputedRef, SetupContext } from 'vue'
import type { Arrayable } from '../types'
import type { SliderEmits, SliderInitData, SliderProps } from '../slider'

export const useWatch = (
  props: SliderProps,
  initData: SliderInitData,
  minValue: ComputedRef<number>,
  maxValue: ComputedRef<number>,
  emit: SetupContext<SliderEmits>['emit']
) => {
  const _emit = (val: Arrayable<number>) => {
    emit('update:modelValue', val)
    emit('change', val)
  }

  const valueChanged = () => {
    if (props.range) {
      return ![minValue.value, maxValue.value].every(
        (item, index) => item === (initData.oldValue as number[])[index]
      )
    } else {
      return props.modelValue !== initData.oldValue
    }
  }

  const setValues = () => {
    if (props.min > props.max) {
      throwError('Slider', 'min should not be greater than max.')
      return
    }
    const val = props.modelValue
    if (props.range && Array.isArray(val)) {
      if (val[1] < props.min) {
        _emit([props.min, props.min])
      } else if (val[0] > props.max) {
        _emit([props.max, props.max])
      } else if (val[0] < props.min) {
        _emit([props.min, val[1]])
      } else if (val[1] > props.max) {
        _emit([val[0], props.max])
      } else {
        initData.firstValue = val[0]
        initData.secondValue = val[1]
        if (valueChanged()) {
          initData.oldValue = val.slice()
        }
      }
    } else if (!props.range && typeof val === 'number' && !Number.isNaN(val)) {
      if (val < props.min) {
        _emit(props.min)
      } else if (val > props.max) {
        _emit(props.max)
      } else {
        initData.firstValue = val
        if (valueChanged()) {
          initData.oldValue = val
        }
      }
    }
  }

  setValues()

  watch(
    () => initData.dragging,
    val => {
      if (!val) {
        setValues()
      }
    }
  )

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (
        initData.dragging ||
        (Array.isArray(val) &&
          Array.isArray(oldVal) &&
          val.every((item, index) => item === oldVal[index]) &&
          initData.firstValue === val[0] &&
          initData.secondValue === val[1])
      ) {
        return
      }
      setValues()
    },
    {
      deep: true
    }
  )

  watch(
    () => [props.min, props.max],
    () => {
      setValues()
    }
  )
}
