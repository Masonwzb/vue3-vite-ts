import { computed, inject, nextTick, ref, watch } from 'vue'
import { EVENT_CODE } from '../contants'
import { sliderContextKey } from '../utils/provideKey'
import type { CSSProperties, ComputedRef, SetupContext } from 'vue'
import type { SliderButtonEmits, SliderButtonInitData, SliderButtonProps } from '../button/button'

const { left, down, right, up, home, end, pageUp, pageDown } = EVENT_CODE

export const useSliderButton = (
  props: SliderButtonProps,
  initData: SliderButtonInitData,
  emit: SetupContext<SliderButtonEmits>['emit']
) => {
  const { disabled, min, max, step, precision, sliderSize, emitChange, resetSize, updateDragging } =
    inject(sliderContextKey)!

  const button = ref<HTMLDivElement>()

  const currentPosition = computed(() => {
    return `${((props.modelValue - min.value) / (max.value - min.value)) * 100}%`
  })

  const wrapperStyle: ComputedRef<CSSProperties> = computed(() => {
    return { left: currentPosition.value }
  })

  const handleMouseEnter = () => {
    initData.hovering = true
  }

  const handleMouseLeave = () => {
    initData.hovering = false
  }

  const onButtonDown = (event: MouseEvent | TouchEvent) => {
    if (disabled.value) return
    event.preventDefault()
    onDragStart(event)
    window.addEventListener('mousemove', onDragging)
    window.addEventListener('touchmove', onDragging)
    window.addEventListener('mouseup', onDragEnd)
    window.addEventListener('touchend', onDragEnd)
    window.addEventListener('contextmenu', onDragEnd)
    button.value!.focus()
  }

  const incrementPosition = (amount: number) => {
    if (disabled.value) return
    initData.newPosition =
      Number.parseFloat(currentPosition.value) + (amount / (max.value - min.value)) * 100
    setPosition(initData.newPosition)
    emitChange()
  }

  const onLeftKeyDown = () => {
    incrementPosition(-step.value)
  }

  const onRightKeyDown = () => {
    incrementPosition(step.value)
  }

  const onPageDownKeyDown = () => {
    incrementPosition(-step.value * 4)
  }

  const onPageUpKeyDown = () => {
    incrementPosition(step.value * 4)
  }

  const onHomeKeyDown = () => {
    if (disabled.value) return
    setPosition(0)
    emitChange()
  }

  const onEndKeyDown = () => {
    if (disabled.value) return
    setPosition(100)
    emitChange()
  }

  const onKeyDown = (event: KeyboardEvent) => {
    let isPreventDefault = true
    if ([left, down].includes(event.key)) {
      onLeftKeyDown()
    } else if ([right, up].includes(event.key)) {
      onRightKeyDown()
    } else if (event.key === home) {
      onHomeKeyDown()
    } else if (event.key === end) {
      onEndKeyDown()
    } else if (event.key === pageDown) {
      onPageDownKeyDown()
    } else if (event.key === pageUp) {
      onPageUpKeyDown()
    } else {
      isPreventDefault = false
    }
    isPreventDefault && event.preventDefault()
  }

  const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number
    let clientY: number
    if (event.type.startsWith('touch')) {
      clientY = (event as TouchEvent).touches[0].clientY
      clientX = (event as TouchEvent).touches[0].clientX
    } else {
      clientY = (event as MouseEvent).clientY
      clientX = (event as MouseEvent).clientX
    }
    return {
      clientX,
      clientY
    }
  }

  const onDragStart = (event: MouseEvent | TouchEvent) => {
    initData.dragging = true
    initData.isClick = true
    const { clientX } = getClientXY(event)
    initData.startX = clientX
    initData.startPosition = Number.parseFloat(currentPosition.value)
    initData.newPosition = initData.startPosition
  }

  const onDragging = (event: MouseEvent | TouchEvent) => {
    if (initData.dragging) {
      initData.isClick = false
      resetSize()
      const { clientX } = getClientXY(event)
      initData.currentX = clientX
      const diff = ((initData.currentX - initData.startX) / sliderSize.value) * 100
      initData.newPosition = initData.startPosition + diff
      setPosition(initData.newPosition)
    }
  }

  const onDragEnd = () => {
    if (initData.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        initData.dragging = false
        if (!initData.isClick) {
          setPosition(initData.newPosition)
        }
        emitChange()
      }, 0)
      window.removeEventListener('mousemove', onDragging)
      window.removeEventListener('touchmove', onDragging)
      window.removeEventListener('mouseup', onDragEnd)
      window.removeEventListener('touchend', onDragEnd)
      window.removeEventListener('contextmenu', onDragEnd)
    }
  }

  const setPosition = async (newPosition: number) => {
    if (newPosition === null || Number.isNaN(+newPosition)) return
    if (newPosition < 0) {
      newPosition = 0
    } else if (newPosition > 100) {
      newPosition = 100
    }
    const lengthPerStep = 100 / ((max.value - min.value) / step.value)
    const steps = Math.round(newPosition / lengthPerStep)
    let value = steps * lengthPerStep * (max.value - min.value) * 0.01 + min.value
    value = Number.parseFloat(value.toFixed(precision.value))

    if (value !== props.modelValue) {
      emit('update:modelValue', value)
    }

    if (!initData.dragging && props.modelValue !== initData.oldValue) {
      initData.oldValue = props.modelValue
    }

    await nextTick()
  }

  watch(
    () => initData.dragging,
    val => {
      updateDragging(val)
    }
  )

  return {
    disabled,
    button,
    wrapperStyle,
    handleMouseEnter,
    handleMouseLeave,
    onButtonDown,
    onKeyDown,
    setPosition
  }
}
