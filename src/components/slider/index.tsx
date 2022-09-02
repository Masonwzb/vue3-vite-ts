import { defineComponent, computed, provide, reactive, toRefs } from 'vue'
import { sliderContextKey } from './utils/provideKey'
import { useLifecycle, useSlide, useWatch } from './composables'
import { definePropType } from './utils'
import { Arrayable } from './types'
import SliderButton from './button'
import type { SliderInitData } from './slider'

const TimeLineSlider = defineComponent({
  name: 'TimeLineSlider',
  emits: ['change', 'input', 'update:modelValue'],
  props: {
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
  },
  setup(props, { emit, expose }) {
    const initData = reactive<SliderInitData>({
      firstValue: 0,
      secondValue: 0,
      oldValue: 0,
      dragging: false,
      sliderSize: 1
    })

    const {
      slider,
      firstButton,
      secondButton,
      sliderDisabled,
      minValue,
      maxValue,
      runwayStyle,
      barStyle,
      resetSize,
      emitChange,
      onSliderWrapperPrevent,
      onSliderClick,
      onSliderDown,
      setFirstValue,
      setSecondValue
    } = useSlide(props, initData, emit)

    useWatch(props, initData, minValue, maxValue, emit)

    const precision = computed(() => {
      const precisions = [props.min, props.max, props.step].map(item => {
        const decimal = `${item}`.split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    })

    const { sliderWrapper } = useLifecycle(props, initData, resetSize)

    const { firstValue, secondValue, sliderSize } = toRefs(initData)

    const updateDragging = (val: boolean) => {
      initData.dragging = val
    }

    provide(sliderContextKey, {
      ...toRefs(props),
      sliderSize,
      disabled: sliderDisabled,
      precision,
      emitChange,
      resetSize,
      updateDragging
    })

    expose({
      onSliderClick
    })

    const makeTheCut = () => {
      return props.range ? (
        <SliderButton
          ref={secondButton}
          modelValue={secondValue.value}
          onUpdate:modelValue={setSecondValue}
        />
      ) : null
    }

    return () => (
      <div ref={sliderWrapper} class="avatar-slider">
        <div
          ref={slider}
          class={['avatar-slider__runway', { 'is-disabled': sliderDisabled.value }]}
          style={runwayStyle.value}
          onMousedown={onSliderDown}
        >
          <div class="avatar-slider__bar" style={barStyle.value} />
          <SliderButton
            ref={firstButton}
            modelValue={firstValue.value}
            onUpdate:modelValue={setFirstValue}
          />
          {makeTheCut()}
        </div>
      </div>
    )
  }
})

export default TimeLineSlider
