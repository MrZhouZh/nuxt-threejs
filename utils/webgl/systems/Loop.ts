import { Clock } from 'three'
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { Controls } from './controls'

const clock = new Clock()

class Loop {
  camera: PerspectiveCamera
  scene: Scene
  renderer: WebGLRenderer
  updatables: Controls[]

  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    renderer: WebGLRenderer,
  ) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    const delta = clock.getDelta()
    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // )
    for (const update of this.updatables)
      update.tick(delta)
  }
}

export { Loop }
