<script setup lang="ts">
  import { onMounted, ref } from "vue"

  const dragBoxRef = ref<HTMLDivElement | null>(null)
  let resizeBox = ref<HTMLElement | null>(null)
  let currentBox = ref<HTMLElement | null>(null)
  let rightBox = ref<HTMLElement | null>(null)
  let curLen = ref(0)
  let otherBoxWidth = ref(0)
  let startX = ref(0)

  onMounted(() => {
    setDragItemFlex()
    dragControllerDiv()
  })

  // 如果dragItem 没有定义宽度，则flex=1
  function setDragItemFlex () {
    const childLen = dragBoxRef.value!.children.length

    for (let i = 0; i < childLen; i++) {
      const node = dragBoxRef.value!.children[i]
      if (!(node as HTMLElement).style.width) {
        // 如果没有定义宽度，则flex=1
        (node as HTMLElement).style.flex = '1'
      }
    }
  }

  function dragControllerDiv () {
    const resize = document.getElementsByClassName('resize') // 拖拽条
    // 循环为每个拖拽条添加事件
    for (let i = 0; i < resize.length; i++) {
      // 鼠标按下事件
      resize[i].addEventListener('mousedown', onMouseDown)
    }
  }

  function onMouseDown (e: Event) {
    resizeBox.value = e.target as HTMLElement
    currentBox.value = resizeBox.value.parentNode as HTMLElement// 当前盒子
    rightBox.value = getNextElement(currentBox.value)// 当前盒子的下个兄弟节点
    if (!rightBox.value) return
    curLen.value = currentBox.value.clientWidth
    otherBoxWidth.value = dragBoxRef.value!.clientWidth - currentBox.value.clientWidth - rightBox.value.clientWidth // 其他盒子的宽度
    // 颜色改变提醒
    resizeBox.value.style.background = '#818181'
    startX.value = (e as MouseEvent).clientX
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  // 获取下一个兄弟元素的兼容函数
  function getNextElement (element: HTMLElement): HTMLElement {
    if (element.nextElementSibling) {
      return element.nextElementSibling as HTMLElement
    } else {
      let next = element.nextSibling// 下一个兄弟节点
      while (next && next.nodeType !== 1) { // 有 并且 不是我想要的
        next = next.nextSibling
      }
      return next as HTMLElement
    }
  }

  function onMousemove (e: Event) {
    const endX = (e as MouseEvent).clientX
    const moveLen = endX - startX.value // （endX - startX）= 移动的距离
    const CurBoxLen = curLen.value + moveLen // resize[i].left+移动的距离=左边区域最后的宽度
    const rightBoxLen = dragBoxRef.value!.clientWidth - CurBoxLen - otherBoxWidth.value // 右侧宽度=总宽度-左侧宽度-其它盒子宽度
    // 当最小宽度时，无法继续拖动
    if (CurBoxLen <= 200 || rightBoxLen <= 200) return
    currentBox.value!.style.width = CurBoxLen + 'px'// 当前盒子的宽度
    resizeBox.value!.style.left = String(CurBoxLen) // 设置左侧区域的宽度
    rightBox.value!.style.width = rightBoxLen + 'px'

  }

  function onMouseup () {
    // 颜色恢复
    resizeBox.value!.style.background = '#d6d6d6'
    document.removeEventListener('mousedown', onMouseDown)
    document.removeEventListener('mousemove', onMousemove)
  }
</script>

<template>
  <div ref='dragBoxRef' class="drag-box-wrapper">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.drag-box-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
