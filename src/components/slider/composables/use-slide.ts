import { computed, nextTick, ref, shallowRef } from 'vue'
import type { CSSProperties, Ref, SetupContext } from 'vue'
import type { Arrayable } from '../types'
import type { SliderEmits, SliderInitData, SliderProps } from '../slider'

export const useSlide = (
  props: SliderProps,
  initData: SliderInitData,
  emit: SetupContext<SliderEmits>['emit']
) => {
  const slider = shallowRef<HTMLElement>()

  const firstButton = ref()

  const secondButton = ref()

  const buttonRefs: any = {
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

  const runwayStyle = computed<CSSProperties>(() => {
    return {}
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

  const getButtonRefByPercent = (percent: number): Ref<any> => {
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

  const setPosition = (percent: number): Ref<any> => {
    const buttonRef = getButtonRefByPercent(percent)
    buttonRef.value!.setPosition(percent)
    return buttonRef
  }

  const setFirstValue = (firstValue: number | undefined) => {
    initData.firstValue = firstValue!
    _emit(props.range ? [minValue.value, maxValue.value] : firstValue!)
  }

  const setSecondValue = (secondValue: number) => {
    initData.secondValue = secondValue

    if (props.range) {
      _emit([minValue.value, maxValue.value])
    }
  }

  const _emit = (val: Arrayable<number>) => {
    emit('update:modelValue', val)
    emit('input', val)
  }

  const emitChange = async () => {
    await nextTick()
    emit('change', props.range ? [minValue.value, maxValue.value] : props.modelValue)
  }

  const handleSliderPointerEvent = (event: MouseEvent | TouchEvent): Ref<any> | undefined => {
    if (sliderDisabled.value || initData.dragging) return
    resetSize()
    const clientX = (event as TouchEvent).touches?.item(0)?.clientX ?? (event as MouseEvent).clientX
    const sliderOffsetLeft = slider.value!.getBoundingClientRect().left
    const newPercent = ((clientX - sliderOffsetLeft) / initData.sliderSize) * 100
    if (newPercent < 0 || newPercent > 100) return
    return setPosition(newPercent)
  }

  const onSliderWrapperPrevent = (event: TouchEvent) => {
    if (buttonRefs['firstButton'].value?.dragging || buttonRefs['secondButton'].value?.dragging) {
      event.preventDefault()
    }
  }

  const onSliderDown = async (event: MouseEvent | TouchEvent) => {
    const buttonRef = handleSliderPointerEvent(event)
    if (buttonRef) {
      await nextTick()
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
    runwayStyle,
    barStyle,
    resetSize,
    setPosition,
    emitChange,
    onSliderWrapperPrevent,
    onSliderClick,
    onSliderDown,
    setFirstValue,
    setSecondValue
  }
}
