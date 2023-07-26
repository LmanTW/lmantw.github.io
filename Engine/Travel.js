//移動
export default (startX, startY, destinationX, destinationY) => {
  if (!player.traveling) {
    player.traveling = true

    let cameraSave = { x: player.cameraX, y: player.cameraY }
    createInterval(10, (count) => {
      let frame = getSmoothFrame(cameraSave.x, cameraSave.y, startX, startY, count, 150)
      player.cameraX = frame.x
      player.cameraY = frame.y
    }, () => {
      player.traveling2 = true
      createInterval(10, (count) => {
        let frame = getSmoothFrame(0.75, 0, 0.5, 0, count, 125)
        player.cameraZoom = frame.x
      }, () => {
        createInterval(10, (count) => {
          let frame = getSmoothFrame(0.5, 0, 0.75, 0, count, 125)
          player.cameraZoom = frame.x
        }, () => {}, 125)
      }, 125)
      cameraSave = { x: player.cameraX, y: player.cameraY }
      createInterval(10, (count) => {
        let frame = getSmoothFrame(cameraSave.x, cameraSave.y, destinationX, destinationY, count, 250)
        player.cameraX = frame.x
        player.cameraY = frame.y
      }, () => {
        player.traveling2 = false
        createInterval(10, (count) => {
          let frame = getSmoothFrame(0.75, 0, 1, 0, count, 75)
          player.cameraZoom = frame.x
        }, () => {
          player.traveling = false
        }, 75)
      }, 250)
    }, 150)
    createInterval(10, (count) => {
      let frame = getSmoothFrame(1, 0, 0.75, 0, count, 150)
      player.cameraZoom = frame.x
    }, () => {}, 150)

    // createInterval(15, (count) => {
    //   player.cameraZoom-=(50-count)/3000
    // }, () => {
    //   let interval = createInterval(10, (count) => {
    //     let frame = getSmoothFrame(player.cameraX, player.cameraY, destinationX, destinationY, count, 1000)
    //     player.cameraX = frame.x
    //     player.cameraY = frame.y
    //   }, () => {
    //     player.traveling = false
    //   }, 1000)
    // }, 50)
  }
}

//取得順滑動畫中的幀
function getSmoothFrame (x, y, destinationX, destinationY, count, duration) {
  let smoothProgress = 0.5-0.5*Math.sin((((180/duration)*count)+90)*Math.PI/180)
  return {
    x: x+((destinationX-x)*smoothProgress),
    y: y+((destinationY-y)*smoothProgress)
  }
}
 
import { createInterval } from './Tools/Interval.js'

import { player } from './Data.js'