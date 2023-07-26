let player = {
  cameraX: 0, cameraY: 0, cameraZoom: 1,
  scrollX: 0, scrollY: 0,
  mouseX: 0, mouseY: 0,
  scroll: false,
  traveling: false,
  traveling2: false
}

let objects = {}, images = {}

export { player, objects, images, createObject }

import generateID from './Tools/GenerateID.js'

//創建物件
function createObject (data) {
  let id = generateID(5, Object.keys(objects))
  objects[id] = data
  return id
}