<script setup lang="ts">
import { CubeTextureLoader, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { width, height } = useWindowSize()

const container = ref<HTMLDivElement | null>(null)

let renderer: WebGLRenderer,
  camera: PerspectiveCamera,
  scene: Scene,
  controls: OrbitControls

function initRender() {
  renderer = new WebGLRenderer({ antialias: true })
  renderer.setSize(width.value, height.value)
  container.value?.appendChild(renderer.domElement)
}

function initScene() {
  scene = new Scene()
}

function initCamera() {
  camera = new PerspectiveCamera(
    45,
    width.value / height.value,
    0.1,
    1000,
  )
  camera.position.set(0, 0, 100)
  camera.lookAt(scene.position)
}

function initModel() {
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

function initControls() {
  controls = new OrbitControls(camera, renderer.domElement)
}

function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

function draw() {
  initRender()
  initScene()
  initCamera()
  initModel()
  render()
  initControls()
}

const debounceResize = useDebounceFn(() => {
  width.value = window.innerWidth
  height.value = window.innerHeight

  camera.aspect = width.value / height.value
  camera.updateProjectionMatrix()
  renderer.setSize(width.value, height.value)
  render()
})

onMounted(() => {
  draw()
  on(window, 'resize', debounceResize)
})

onUnmounted(() => {
  off(window, 'resize', debounceResize)
})
</script>

<template>
  <div class="panorama">
    <div ref="container" />
  </div>
</template>
