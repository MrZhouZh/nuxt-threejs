import { World } from './lib'

function generalWorldClass() {
  const container = document.getElementById('world')

  if (container) {
    const world = new World(container)

    // render a frame
    world.render()
    // animation
    // world.start()
  }
}

export default generalWorldClass
