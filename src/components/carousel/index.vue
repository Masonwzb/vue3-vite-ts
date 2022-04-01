<template>
  <div class="carousel-box">
    <div class="carousel-content">
      <div class="data slick-initialized slick-slider"
           data-slick="{&quot;slidesToShow&quot;: 4, &quot;slidesToScroll&quot;: 4}">
        <button type="button" data-role="none" class="slick-prev slick-arrow" aria-label="Previous" role="button"
                style="display: block;" @click="previousClick">Previous
        </button>
        <div aria-live="polite" class="slick-list draggable">
          <div class="slick-track" :style="[baseStyle, otherStyle]" role="listbox">
            <div class="slick-slide slick-cloned" data-slick-index="-4" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>3</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="-3" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>4</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="-2" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>5</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="-1" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>6</h3>
            </div>
            <div class="slick-slide slick-current slick-active" data-slick-index="0" aria-hidden="false"
                 style="width: 140px;" tabindex="-1" role="option" aria-describedby="slick-slide30">
              <h3>1</h3>
            </div>
            <div class="slick-slide slick-active" data-slick-index="1" aria-hidden="false" style="width: 140px;"
                 tabindex="-1" role="option" aria-describedby="slick-slide31">
              <h3>2</h3>
            </div>
            <div class="slick-slide slick-active" data-slick-index="2" aria-hidden="false" style="width: 140px;"
                 tabindex="-1" role="option" aria-describedby="slick-slide32">
              <h3>3</h3>
            </div>
            <div class="slick-slide slick-active" data-slick-index="3" aria-hidden="false" style="width: 140px;"
                 tabindex="-1" role="option" aria-describedby="slick-slide33">
              <h3>4</h3>
            </div>
            <div class="slick-slide" data-slick-index="4" aria-hidden="true" style="width: 140px;" tabindex="-1"
                 role="option" aria-describedby="slick-slide34">
              <h3>5</h3>
            </div>
            <div class="slick-slide" data-slick-index="5" aria-hidden="true" style="width: 140px;" tabindex="-1"
                 role="option" aria-describedby="slick-slide35">
              <h3>6</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="6" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>1</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="7" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>2</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="8" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>3</h3>
            </div>
            <div class="slick-slide slick-cloned" data-slick-index="9" aria-hidden="true" style="width: 140px;"
                 tabindex="-1">
              <h3>4</h3>
            </div>
          </div>
        </div>
        <button type="button" data-role="none" class="slick-next slick-arrow" aria-label="Next" role="button"
                style="display: block;" @click="NextClick">Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const translate3dX = ref(-560)
const otherStyle = ref('')

const baseStyle = computed(() => ({
  opacity: 1,
  width: 1960 + 'px',
  transform: `translate3d(${translate3dX.value}px, 0, 0)`
}))

const previousClick = () => {
  otherStyle.value = { transition: `5s` }
  translate3dX.value = 0

  setTimeout(() => {
    otherStyle.value.transition = ''
    translate3dX.value = -840
  }, 5000)
}

const NextClick = () => {
  translate3dX.value = -840
}
</script>

<style>
@import "index.css";

.carousel-box {
  display: flex;
  justify-content: center;
  align-content: center;
}
.carousel-content {
  width: 560px;
}
</style>
