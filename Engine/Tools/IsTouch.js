export default (canvas, camera, object, mouse, distance) => {
  let objectDisplayPosition = getDisplayPosition(canvas, camera, object)
  
  let dx = mouse.x-objectDisplayPosition.x
  let dy = mouse.y-objectDisplayPosition.y
  return Math.sqrt(dx * dx + dy * dy) < distance
}

import getDisplayPosition from './GetDisplayPosition.js'