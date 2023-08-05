import type { WebGLRendererParameters } from 'three'
import { WebGLRenderer } from 'three'

function createRenderer(parameters: WebGLRendererParameters) {
  const renderer = new WebGLRenderer(parameters)

  return renderer
}

export { createRenderer }
