import { watchEffect } from 'vue'

export function useEventListener<TType extends keyof WindowEventMap>(
  element: HTMLElement | Document | Window | EventTarget | null | undefined,
  type: TType,
  listener: (event: WindowEventMap[TType]) => any,
  options?: boolean | AddEventListenerOptions
) {
  if (typeof window === 'undefined') return

  watchEffect((onInvalidate) => {
    element = element ?? window
    console.log('啦啦啦啦啦啦啦 - watchEffect')
    element.addEventListener(type, listener as any, options)
    onInvalidate(() => {
      console.log('Clean Up ~~~~~~~~~~~~~~~~~~~~~~')
      element!.removeEventListener(type, listener as any, options)
    })
  })
}
