import { CubeTextureLoader } from 'three'
import type { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import type { Controls } from './systems/controls'

import {
  Loop,
  Resizer,
  createCamera,
  createControls,
  createRenderer,
  createScene,
} from '~/utils/webgl'

let renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  scene: Scene,
  WIDTH: number,
  HEIGHT: number,
  loop: Loop,
  controls: Controls

class Panorama<T extends HTMLElement | HTMLDivElement> {
  constructor(container: T) {
    renderer = createRenderer({ antialias: true })
    renderer.setSize(WIDTH, HEIGHT)
    container.appendChild(renderer.domElement)
    scene = createScene()
    camera = createCamera(
      45,
      WIDTH / HEIGHT,
      0.1,
      1000,
    )
    camera.position.set(0, 0, 100)
    camera.lookAt(scene.position)
    this.initModel()

    controls = createControls(camera, renderer.domElement)
    loop = new Loop(camera, scene, renderer)
    loop.updatables.push(controls)

    this.start()

    on(controls, 'change', () => this.render())

    const resizer = new Resizer(container, camera, renderer, WIDTH, HEIGHT)
    resizer.onResize = () => {
      this.render()
    }
  }

  initModel() {
    const urls = [
      '/textures/panorama/home.right.jpg',
      '/textures/panorama/home.left.jpg',
      '/textures/panorama/home.top.jpg',
      '/textures/panorama/home.bottom.jpg',
      '/textures/panorama/home.front.jpg',
      '/textures/panorama/home.back.jpg',
    ]

    const cubeTexture = new CubeTextureLoader().load(urls)
    scene.background = cubeTexture
  }

  render() {
    renderer.render(scene, camera)
  }

  start() {
    loop.start()
  }

  stop() {
    loop.stop()
  }
}

export default function panorama(container: HTMLDivElement, width?: number, height?: number) {
  WIDTH = width || window.innerWidth
  HEIGHT = height || window.innerHeight
  return new Panorama(container)
}
