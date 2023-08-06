<script setup lang="ts">
import { Object3D, PerspectiveCamera, Scene, Vector3 } from 'three'
import TWEEN from 'three/examples/jsm/libs/tween.module'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { table } from '~/composables/periodict-store'

definePageMeta({
  layout: 'webgl',
})

const { width, height } = useWindowSize()

const container = ref<HTMLDivElement | null>()
const btnTable = ref<HTMLButtonElement | null>()
const btnSphere = ref<HTMLButtonElement | null>()
const btnHelix = ref<HTMLButtonElement | null>()
const btnGrid = ref<HTMLButtonElement | null>()

const objects: CSS3DObject[] = []

interface Targets {
  table: Object3D[]
  sphere: Object3D[]
  helix: Object3D[]
  grid: Object3D[]
}

const defaultTarget: keyof Targets = 'table'

const targets: Targets = { table: [], sphere: [], helix: [], grid: [] }

let renderer: CSS3DRenderer,
  camera: PerspectiveCamera,
  scene: Scene,
  controls: TrackballControls,
  vector: Vector3
//

function initRender() {
  renderer = new CSS3DRenderer()
  renderer.setSize(width.value, height.value)
  container.value?.appendChild(renderer.domElement)
}

function initScene() {
  scene = new Scene()
}

function initCamera() {
  camera = new PerspectiveCamera(
    40,
    width.value / height.value,
    0.1,
    1000,
  )
  camera.position.z = 4000
}

function initObject3D() {
  // table
  for (let i = 0; i < table.length; i += 5) {
    const element = document.createElement('div')
    element.className = 'element'
    element.style.backgroundColor = `rgba(0, 127, 127, ${Math.random() * 0.5 + 0.25})`

    const number = document.createElement('div')
    number.className = 'number'
    number.textContent = String((i / 5) + 1)
    element.appendChild(number)

    const symbol = document.createElement('div')
    symbol.className = 'symbol'
    symbol.textContent = String(table[i])
    element.appendChild(symbol)

    const details = document.createElement('div')
    details.className = 'details'
    details.innerHTML = `${table[i + 1]}<br />${table[i + 2]}`
    element.appendChild(details)

    const objectCSS = new CSS3DObject(element)
    objectCSS.position.set(
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000,
      Math.random() * 4000 - 2000,
    )
    scene.add(objectCSS)
    objects.push(objectCSS)

    const object = new Object3D()
    // 一行 18 个, 基于中心坐标(0,0), 范围取值(-1190,1190)
    // 140 为 120 + 20(边距)
    // 1330 为常量, 假设 n = 18, 18 * 140 - 1190 = 1330
    // x = n * 140 - 1330
    object.position.x = ((table[i + 3] as number) * 140) - 1330
    // 一列为 10 个, 同理, 取值范围(-810, 810)
    // 160 + 20(边距)
    // 假设 n = 18, 10 * 180 - 810 = 990
    // y = n * 180 + 990
    object.position.y = -((table[i + 4] as number) * 180) + 990

    targets.table.push(object)
  }

  // sphere
  vector = new Vector3()
  for (let i = 0, len = objects.length; i < len; i++) {
    const phi = Math.acos(-1 + (2 * i) / len)
    const theta = Math.sqrt(len * Math.PI) * phi

    const object = new Object3D()
    object.position.setFromSphericalCoords(800, phi, theta)
    vector.copy(object.position).multiplyScalar(2)

    object.lookAt(vector)
    targets.sphere.push(object)
  }

  // helix
  for (let i = 0; i < objects.length; i++) {
    const theta = i * 0.175 + Math.PI
    const y = -(i * 8) + 450

    const object = new Object3D()
    object.position.setFromCylindricalCoords(900, theta, y)

    vector.x = object.position.x * 2
    vector.y = object.position.y
    vector.z = object.position.z * 2

    object.lookAt(vector)

    targets.helix.push(object)
  }

  // grid
  for (let i = 0; i < objects.length; i++) {
    const object = new Object3D()

    object.position.set(
      ((i % 5) * 400) - 800,
      (-(Math.floor(i / 5) % 5) * 400) + 800,
      (Math.floor(i / 25)) * 1000 - 2000,
    )

    targets.grid.push(object)
  }
}

function initControls() {
  controls = new TrackballControls(camera, renderer.domElement)
  controls.minDistance = 500
  controls.maxDistance = 6000
  on(controls, 'change', render)

  transform(targets[defaultTarget], 2000)
}

function animate() {
  requestAnimationFrame(animate)
  TWEEN.update()
  controls.update()
}

function render() {
  renderer.render(scene, camera)
}

function transform(this: any, targets: Targets[keyof Targets], duration: number) {
  TWEEN.removeAll()

  for (let i = 0; i < objects.length; i++) {
    const object = objects[i]
    const target = targets[i]

    new TWEEN.Tween(object.position)
      .to(
        { x: target.position.x, y: target.position.y, z: target.position.z },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()

    new TWEEN.Tween(object.rotation)
      .to(
        { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z },
        Math.random() * duration + duration,
      )
      .easing(TWEEN.Easing.Exponential.InOut)
      .start()
  }

  new TWEEN.Tween(this)
    .to({}, duration * 2)
    .onUpdate(render)
    .start()
}

function handleTable() {
  transform(targets.table, 2000)
}

function handleSphere() {
  transform(targets.sphere, 2000)
}

function handleHelix() {
  transform(targets.helix, 2000)
}

function handleGrid() {
  transform(targets.grid, 2000)
}

function debounceResize() {
  width.value = window.innerWidth
  height.value = window.innerHeight
  camera.aspect = width.value / height.value
  camera.updateProjectionMatrix()

  renderer.setSize(width.value, height.value)
  render()
}

function draw() {
  initScene()
  initCamera()
  initObject3D()
  initRender()
  initControls()
  animate()
}

onMounted(() => {
  draw()

  on(window, 'resize', debounceResize)
})

onUnmounted(() => {
  off(window, 'resize', debounceResize)
})
</script>

<template>
  <div class="periodictable" relative>
    <div ref="container" class="periodictable-canvas" />
    <div class="periodictable-menu">
      <button id="table" ref="btnTable" aria-label="TABLE" @click="handleTable">
        <span class="opacity-0">TABLE</span>
      </button>
      <button id="sphere" ref="btnSphere" aria-label="SPHERE" @click="handleSphere">
        <span class="opacity-0">SPHERE</span>
      </button>
      <button id="helix" ref="btnHelix" aria-label="HELIX" @click="handleHelix">
        <span class="opacity-0">HELIX</span>
      </button>
      <button id="grid" ref="btnGrid" aria-label="GRID" @click="handleGrid">
        <span class="opacity-0">GRID</span>
      </button>
    </div>
  </div>
</template>

<style>
.periodictable-canvas {
  background-color: #000;
}

.periodictable-menu {
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: center;
}

.element {
  width: 120px;
  height: 160px;
  box-shadow: 0 0 12px rgba(0, 255, 255, .5);
  border: 1px solid rgba(127, 255, 255, 0.25);
  font-family: Helvetica, sans-serif;
  text-align: center;
  line-height: normal;
  cursor: default;
}

.element:hover {
  box-shadow: 0 0 12px rgba(0, 255, 255, .75);
  border: 1px solid rgba(127, 255, 255, .75);
}

.element .symbol {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  font-size: 60px;
  font-weight: bold;
  color: rgba(255, 255, 255, .75);
  text-shadow: 0 0 10px rgba(0, 255, 255, .95);
}

.element .details {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  font-size: 12px;
  color: rgba(127, 255, 255, .75);
}

.periodictable-menu button {
  position: relative;
  border-radius: 0;
  border: none;
  color: rgba(127, 255, 255, .75);
  background: transparent;
  /* outline: 1px solid rgba(127, 255, 255, .75); */
  outline: none;
  border: 0;
  padding: 5px 12px;
  cursor: pointer;
  text-transform: none;
  background-image: conic-gradient(from var(--shimmer-angle), rgb(127, 255, 255) 0, #64748b 10%, #020617 20%);
  animation: shimmer 2.5s linear infinite;
}

.periodictable-menu button::after {
  --btn-content: attr(aria-label);
  --bg-opacity: 1;
  content: var(--btn-content);
  background-color: #020617;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 2px;
}

.periodictable-menu button:focus,
.periodictable-menu button:focus-visible {
  background-color: rgba(0, 255, 255, .5);
  color: #fff;
  outline: 1px solid transparent;
}

.periodictable-menu button:hover {
  background-color: rgba(0, 255, 255, .5);
}

.periodictable-menu button:active {
  /* color: #000; */
  background-color: rgba(0, 255, 255, .75);
}

/* 解决 --shimmer-angle 属性属于 root 级别, 通过这种方式可以将属性值作用于使用者 */
@property --shimmer-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes shimmer {
  0% {
    --shimmer-angle: 0deg;
  }

  100% {
    --shimmer-angle: 360deg;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  a:hover {
    color: #747bff;
  }

  button {
    background-color: #f9f9f9;
  }
}
</style>
