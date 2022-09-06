import { computed, nextTick, ref, shallowRef } from 'vue'
import type { CSSProperties, Ref, SetupContext } from 'vue'
import type { Arrayable, RangeValue } from '../types'
import type { SliderEmits, SliderInitData, SliderProps } from '../slider'
import type { ButtonRefs, SliderButtonInstance } from '../button/button'

export const useSlide = (
  props: SliderProps,
  initData: SliderInitData,
  emit: SetupContext<SliderEmits>['emit']
) => {
  const slider = shallowRef<HTMLElement>()

  const firstButton = ref<SliderButtonInstance>()

  const secondButton = ref<SliderButtonInstance>()

  const buttonRefs: ButtonRefs = {
    firstButton,
    secondButton
  }

  const sliderDisabled = computed(() => {
    return props.disabled || false
  })

  const minValue = computed(() => {
    return Math.min(initData.firstValue, initData.secondValue)
  })

  const maxValue = computed(() => {
    return Math.max(initData.firstValue, initData.secondValue)
  })

  const barSize = computed(() => {
    return props.range
      ? `${(100 * (maxValue.value - minValue.value)) / (props.max - props.min)}%`
      : `${(100 * (initData.firstValue - props.min)) / (props.max - props.min)}%`
  })

  const barStart = computed(() => {
    return props.range ? `${(100 * (minValue.value - props.min)) / (props.max - props.min)}%` : '0%'
  })

  const barStyle = computed<CSSProperties>(() => {
    return {
      width: barSize.value,
      left: barStart.value
    }
  })

  const resetSize = () => {
    if (slider.value) {
      initData.sliderSize = slider.value['clientWidth']
    }
  }

  const getButtonRefByPercent = (percent: number): Ref<SliderButtonInstance | undefined> => {
    const targetValue = props.min + (percent * (props.max - props.min)) / 100
    if (!props.range) {
      return firstButton
    }
    let buttonRefName: 'firstButton' | 'secondButton'
    if (Math.abs(minValue.value - targetValue) < Math.abs(maxValue.value - targetValue)) {
      buttonRefName = initData.firstValue < initData.secondValue ? 'firstButton' : 'secondButton'
    } else {
      buttonRefName = initData.firstValue > initData.secondValue ? 'firstButton' : 'secondButton'
    }
    return buttonRefs[buttonRefName]
  }

  const setPosition = (percent: number): Ref<SliderButtonInstance | undefined> => {
    const buttonRef = getButtonRefByPercent(percent)
    // @ts-ignore
    buttonRef.value!.setPosition(percent)
    return buttonRef
  }

  const setFirstValue = (firstValue: number | undefined) => {
    initData.firstValue = firstValue!
    _emit(
      props.range
        ? { range: [minValue.value, maxValue.value], value: initData.thirdValue }
        : firstValue!
    )
  }

  const setSecondValue = (secondValue: number) => {
    initData.secondValue = secondValue

    if (props.range) {
      _emit({ range: [minValue.value, maxValue.value], value: initData.thirdValue })
    }
  }

  const setThirdValue = (thirdValue: number) => {
    initData.thirdValue = thirdValue

    if (props.range) {
      _emit({ range: [minValue.value, maxValue.value], value: initData.thirdValue })
    }
  }

  const _emit = (val: Arrayable<number> | RangeValue) => {
    let emitModelValue = val
    if ((val as RangeValue).range) {
      emitModelValue = (val as RangeValue).range
    }
    emit('update:modelValue', emitModelValue)
    emit('input', val)
  }

  const emitChange = async () => {
    await nextTick()
    emit(
      'change',
      props.range
        ? { range: [minValue.value, maxValue.value], value: initData.thirdValue }
        : props.modelValue
    )
  }

  const handleSliderPointerEvent = (
    event: MouseEvent | TouchEvent
  ): Ref<SliderButtonInstance | undefined> | undefined => {
    if (sliderDisabled.value || initData.dragging) return
    resetSize()
    const clientX = (event as TouchEvent).touches?.item(0)?.clientX ?? (event as MouseEvent).clientX
    const sliderOffsetLeft = slider.value!.getBoundingClientRect().left
    const newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize) * 100
    if (newPercent < 0 || newPercent > 100) return
    return setPosition(newPercent)
  }

  const onSliderWrapperPrevent = (event: TouchEvent) => {
    // @ts-ignore
    if (buttonRefs['firstButton'].value?.dragging || buttonRefs['secondButton'].value?.dragging) {
      event.preventDefault()
    }
  }

  const onSliderDown = async (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      await nextTick()
      // @ts-ignore
      buttonRef.value!.onButtonDown(event)
    }
  }

  const onSliderClick = (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      emitChange()
    }
  }

  return {
    slider,
    firstButton,
    secondButton,
    sliderDisabled,
    minValue,
    maxValue,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    setFirstValue,
    setSecondValue,
    setThirdValue
  }
}
