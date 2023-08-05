import type { PerspectiveCamera, WebGLRenderer } from 'three'
import { on } from '~/utils/dom'

let width = 0
let height = 0

function setSize(
  container: HTMLElement | HTMLDivElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
) {
  // container.clientWidth = width
  // container.clientHeight = height
  // Set the camera's aspect ratio
  camera.aspect = width / height
  // update the camera's frustum
  camera.updateProjectionMatrix()
  // update the size of the renderer and the canvas
  renderer.setSize(width, height)
  // set the pixel ratio (for mobile devices)
  renderer.setPixelRatio(window.devicePixelRatio)
}

class Resizer {
  constructor(
    container: HTMLElement,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    sizeWidth: number,
    sizeHeight: number,
  ) {
    width = sizeWidth
    height = sizeHeight
    setSize(container, camera, renderer)

    on(window, 'resize', () => {
      setSize(container, camera, renderer)
      // perform  any custom actions
      this.onResize()
    })
  }

  onResize() {
    //
  }
}

export { Resizer }
