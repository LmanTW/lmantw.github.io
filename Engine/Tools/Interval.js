export { createInterval }

import generateID from './GenerateID.js'

let timers = {}

setInterval(() => {
  let time = performance.now()
  Object.keys(timers).forEach((item) => {
    if (time-timers[item].lastUpdateTime > timers[item].interval) {
      timers[item].lastUpdateTime = time
      if (timers[item].times === undefined) timers[item].callback()
      else {
        timers[item].count++
        if (timers[item].count >= timers[item].times) {
          timers[item].callback2()
          delete timers[item]
        } else timers[item].callback(timers[item].count)
      }
    }
  })
})

//創建間隔器
function createInterval (interval, callback, callback2, times) {
  let id = generateID(5, Object.keys(timers))
  timers[id] = { interval, callback, callback2, times, lastUpdateTime: performance.now(), count: 0 }
  return id
}