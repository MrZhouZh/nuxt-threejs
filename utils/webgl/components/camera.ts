import { PerspectiveCamera } from 'three'

function createCamera(
  fov: number,
  aspect: number,
  near: number,
  far: number,
) {
  const camera = new PerspectiveCamera(
    // fov = Field of View
    fov,
    // aspect ratio (dummy value)
    aspect,
    // near clipping plane
    near,
    // far clipping plane
    far,
  )

  // move the camera back so we can view the scene
  // camera.position.set(0, 0, 10)
  // camera.position.set(-2, 2, 5)

  return camera
}

export { createCamera }
