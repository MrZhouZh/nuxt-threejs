export const on = (function () {
  return function (
    element: any,
    event: keyof WindowEventMap,
    handler: (this: Window, ev: Event) => any,
    useCapture = false,
  ) {
    if (element && event && handler)
      element.addEventListener(event, handler, useCapture)
  }
})()

// <T extends Window | Document | HTMLElement | EventTarget | OrbitControls>
export const off = (function () {
  return function
  (
    element: any,
    event: keyof WindowEventMap,
    handler: (this: Window, ev: Event) => any,
    useCapture = false,
  ) {
    if (element && event)
      element.removeEventListener(event, handler, useCapture)
  }
})()
