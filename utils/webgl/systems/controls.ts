import type { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface Controls extends OrbitControls {
  tick: (...args: any[]) => boolean
}

function createControls(
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement,
) {
  const controls = new OrbitControls(camera, canvas) as Controls

  // 启用阻尼增加真实感, 惯性物体运动
  // controls.enableDamping = true

  // 平移
  // controls.enablePan = false
  // 缩放
  // controls.enableZoom = false
  // 自动旋转
  // controls.autoRotate = true
  // 自动旋转速度. 默认2.0, 相当于在60fps时旋转一周需要30s
  // controls.autoRotateSpeed = 2 ** 6
  // 水平旋转(方位角)
  // controls.minAzimuthAngle = -Infinity
  // controls.maxAzimuthAngle = Infinity
  // 垂直旋转(极角)
  // controls.minPolarAngle = 0
  // controls.maxPolarAngle = Math.PI * 5
  // 监听按键事件使用箭头平移相机
  // controls.listenToKeyEvents(window)

  controls.tick = () => controls.update()

  return controls
}

export { createControls }
