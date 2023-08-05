import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
} from 'three'

function createLights() {
  const ambientLight = new AmbientLight('white', 0.5)
  const hemispherLight = new HemisphereLight('white', 'darkslategray', 10)
  const mainLight = new DirectionalLight('white', 3)
  mainLight.position.set(10, 10, 10)

  return {
    ambientLight,
    hemispherLight,
    mainLight,
  }
}

export { createLights }
