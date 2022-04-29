<template>
  <div class="carousel">
    <div class="carousel__content">
      <div class="carousel__button-prev" @click="previousClick"></div>
      <div class="carousel__scroll-area">
        <div class="carousel__wrapper" :style="[baseStyle, otherStyle]">
          <div class="carousel__slide carousel__slide-duplicate">Slide 3</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 4</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 5</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 6</div>
          <div class="carousel__slide">Slide 1</div>
          <div class="carousel__slide">Slide 2</div>
          <div class="carousel__slide">Slide 3</div>
          <div class="carousel__slide">Slide 4</div>
          <div class="carousel__slide">Slide 5</div>
          <div class="carousel__slide">Slide 6</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 1</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 2</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 3</div>
          <div class="carousel__slide carousel__slide-duplicate">Slide 4</div>
        </div>
      </div>
      <div class="carousel__button-next" @click="nextClick"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from "vue";

/**
 * 展示为前面有 4 个作为过渡的滑块
 * 后面 也有 4 个作为过渡的的滑动
 * 这是在当滑块滑动到尽头时，先使用动画效果滑动到作为过渡的滑块的位置
 * 然后动画结束后，迅速定位到真实展示位置的滑块的地方
 */

const translate3dX = ref(-560)
const otherStyle = ref({ transition: '' })

// 当前展示的滑块数量
const sliderLength = 6
// 展示区域一次展示的滑块数量
const showNumber = 4
// 滑动的宽度
const slideWidth = 140
// 展示区域第一个滑块的位置
const firstSlideShowPosition = -(showNumber * slideWidth)
// 展示区域最后一个滑块的位置
const lastSlideShowPosition = -(sliderLength * slideWidth)
// 展示区域宽度
const displayAreaWidth = showNumber * slideWidth

const baseStyle = computed(() => ({
  transitionDuration: '0ms',
  transform: `translate3d(${translate3dX.value}px, 0, 0)`
}))

const previousClick = () => {
  otherStyle.value.transition = 'transform .5s ease-in-out'

  // 虚拟过渡位置
  let fakeX = 0;
  // 真实展示位置
  let realX = 0;
  // 已滑动到最前面
  if (translate3dX.value === firstSlideShowPosition) {
    // 虚拟滑块最初展示位置
    fakeX = 0
    realX = lastSlideShowPosition
  } else {
    // 未滑动到最前面，正常往前滑动

    // 前面真实剩余的滑块数量
    const frontRemainNumber = (translate3dX.value + displayAreaWidth) / slideWidth
    // 若大于展示区域一次展示的滑块数量，则直接往前移动showNumber，否则直接展示firstSlideShowPosition
    realX = frontRemainNumber >= showNumber ? translate3dX.value + displayAreaWidth : firstSlideShowPosition
    fakeX = realX
  }
  console.log('previous - fake - real ? ', fakeX, realX)

  translate3dX.value = fakeX
  setTimeout(() => {
    otherStyle.value.transition = ''
    translate3dX.value = realX
  }, 500)
}

const nextClick = () => {
  otherStyle.value.transition = 'transform .5s ease-in-out'

  // 虚拟过渡位置
  let fakeX = 0;
  // 真实展示位置
  let realX = 0;

  // 已滚动到最后一个
  if (translate3dX.value === lastSlideShowPosition) {
    // 虚拟滑块最后展示位置
    fakeX = (sliderLength + showNumber) * -slideWidth
    realX = firstSlideShowPosition
  } else {
    // 未滚动到最后一个，正常往后滚动

    // 已滑动的滑块数量
    const scrolledNumber = translate3dX.value / -slideWidth
    // 最后剩余的未展示的滑块数量
    const backRemainNumber = sliderLength - scrolledNumber
    /**
     * 若最后剩余的未展示的滑块数量大于可展示区域的滑块数量，
     * 则
     */
    realX = backRemainNumber >= showNumber
        ? translate3dX.value - displayAreaWidth
        : lastSlideShowPosition
    fakeX = realX
  }
  console.log('next - fake - real ? ', fakeX, realX)

  translate3dX.value = fakeX
  setTimeout(() => {
    otherStyle.value.transition = ''
    translate3dX.value = realX
  }, 500)
}
</script>

<style lang="scss">
@import "index.scss";
</style>
