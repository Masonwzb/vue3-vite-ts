import { defineComponent, reactive, toRefs } from 'vue'
import { useSliderButton } from '../composables'
import type { SliderButtonInitData } from './button'

const SliderButton = defineComponent({
  name: 'SliderButton',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    buttonClass: {
      type: String,
      default: 'avatar-slider__button--pointer'
    }
  },
  setup(props, { emit, expose }) {
    const initData = reactive<SliderButtonInitData>({
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0,
      oldValue: props.modelValue
    })

    const {
      disabled,
      button,
      wrapperStyle,
      handleMouseEnter,
      handleMouseLeave,
      onButtonDown,
      onKeyDown,
      setPosition
    } = useSliderButton(props, initData, emit)

    const { hovering, dragging } = toRefs(initData)

    expose({
      onButtonDown,
      onKeyDown,
      setPosition,
      hovering,
      dragging
    })

    return () => (
      <div
        ref={button}
        class="avatar-slider__button-wrapper"
        style={wrapperStyle.value}
        tabindex={disabled.value ? -1 : 0}
        onMouseenter={handleMouseEnter}
        onMouseleave={handleMouseLeave}
        onMousedown={onButtonDown}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        onKeydown={onKeyDown}
      >
        <div class={props.buttonClass} />
      </div>
    )
  }
})

export default SliderButton
