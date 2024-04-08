const canvas = document.getElementById('canvas')

// Control
export default new class {
  constructor () {
    this.lock = false

    this.mouse = {
      press: false,
      click: false,

      clickTime: 0,

      x: 0,
      y: 0,

      oldX: 0,
      oldY: 0,

      focus: true
    }

    this.key = {}

    canvas.addEventListener('mousedown', (event) => {
      if (!this.mouse.press) {
        this.mouse.oldX = (canvas.width / window.innerWidth) * event.clientX
        this.mouse.oldY = (canvas.height / window.innerHeight) * event.clientY
      }

      this.mouse.press = true
      this.mouse.click = true

      this.mouse.clickTime = performance.now()
    })
    canvas.addEventListener('mouseup', () => this.mouse.press = false)
    canvas.addEventListener('mouseleave', () => {
      this.mouse.press = false

      this.mouse.focus = false
    })

    canvas.addEventListener('mousemove', (event) => {
      this.mouse.x = (canvas.width / window.innerWidth) * event.clientX
      this.mouse.y = (canvas.height / window.innerHeight) * event.clientY

      this.mouse.focus = true
    })

    window.addEventListener('keydown', (event) => this.key[event.key] = true)
    window.addEventListener('keyup', (event) => delete this.key[event.key])

    this.camera = { x: 0, y: 0, zoom: 1 }
    this.cameraTarget = { x: 0, y: 0, zoom: 1 }

    this.offset = { x: 0, y: 0 }

    setInterval(() => {
      if (performance.now() - this.mouse.clickTime > 50) this.mouse.click = false

      const distance = getDistance(
        this.mouse.oldX, this.mouse.oldY,
        this.mouse.x, this.mouse.y
      )

      if (distance > ((canvas.width / 100) + (canvas.height / 100) * 1)) {
        this.mouse.oldX += (this.mouse.x - this.mouse.oldX) / 100
        this.mouse.oldY += (this.mouse.y - this.mouse.oldY) / 100 
      }

      if (this.mouse.focus) this.offset = { x: (this.mouse.x - (window.innerWidth / 2)) / 250, y: (this.mouse.y - (window.innerHeight / 2)) / 250 }
      else this.offset = { x: 0, y: 0 } 

      this.camera.x += ((this.cameraTarget.x + this.offset.x) - this.camera.x) / 20 
      this.camera.y += ((this.cameraTarget.y + this.offset.y) - this.camera.y) / 20 
      this.camera.zoom += (this.cameraTarget.zoom - this.camera.zoom) / 50

      if (!this.lock && this.mouse.press) {
        const angle = getAngle(
          this.mouse.oldX, this.mouse.oldY,
          this.mouse.x, this.mouse.y
        )

        let speed = distance / 500

        if (speed > 1) speed = 1

        this.cameraTarget.x += Math.cos(angle * Math.PI / 180) * speed
        this.cameraTarget.y += Math.sin(angle * Math.PI / 180) * speed
      }

      if (!this.lock) {
        if (this.key['w'] || this.key['ArrowUp']) this.cameraTarget.y -= 0.5
        else if (this.key['s'] || this.key['ArrowDown']) this.cameraTarget.y += 0.5

        if (this.key['a'] || this.key['ArrowLeft']) this.cameraTarget.x -= 0.5
        else if (this.key['d'] || this.key['ArrowRight']) this.cameraTarget.x += 0.5
      }

      Scene.objects.forEach(async (object) => {
        if (object.type === 'teleporter') {
          const renderPosition = getRenderPosition(object.x, object.y)

          const distance = getDistance(
            this.mouse.x, this.mouse.y,
            renderPosition.x, renderPosition.y
          )

          const renderPosition2 = getRenderPosition(object.x2, object.y2)

          const distance2 = getDistance(
            this.mouse.x, this.mouse.y,
            renderPosition2.x, renderPosition2.y
          )

          if (!this.lock && (distance < getRenderValue(1) || distance2 < getRenderValue(1))) {
            if (object.progress < 1) object.progress += 0.025

            let startX, startY
            let endX, endY

            if (distance < getRenderValue(1)) {
              startX = object.x
              startY = object.y
              endX = object.x2
              endY = object.y2
            } else {
              startX = object.x2
              startY = object.y2
              endX = object.x
              endY = object.y
            }

            if (!this.lock && this.mouse.click) {
              this.lock = true

              await animate({
                x: [this.camera.x, startX],
                y: [this.camera.y, startY],

                zoom: [1, 0.75]
              }, 1500, (data) => {
                this.cameraTarget.x = data.x
                this.cameraTarget.y = data.y

                this.camera.zoom = data.zoom
                this.cameraTarget.zoom = data.zoom
              })

              await animate({
                x: [startX, endX],
                y: [startY, endY]
              }, 2500, (data) => {
                this.cameraTarget.x = data.x
                this.cameraTarget.y = data.y

                object.travelX = data.x
                object.travelY = data.y
              })

              await animate({
                zoom: [0.75, 1]
              }, 1500, (data) => {
                this.camera.zoom = data.zoom
                this.cameraTarget.zoom = data.zoom
              })

              object.travelX = undefined
              object.travelY = undefined

              this.lock = false
            }
          } else if (object.progress > 0) object.progress -= 0.025
        } else if (object.type === 'button') {
          const renderPosition = getRenderPosition(object.x, object.y)

          const distance = getDistance(
            this.mouse.x, this.mouse.y,
            renderPosition.x, renderPosition.y
          )

          if (!this.lock && distance < getRenderValue(1)) {

          } else if (object.progress > 0) object.progress -= 0.025
        }
      })
    }, 1000 / 120)
  }
}

// Get Ange
function getAngle(x1, y1, x2, y2) {    
  return Math.atan2(y2 - y1, x2 - x1) / Math.PI * 180
}

// Get Distance
function getDistance(x1, y1, x2, y2) {
  const dx = x1 - x2
  const dy = y1 - y2

  return Math.sqrt(dx * dx + dy * dy)
}

import { getRenderValue, getRenderPosition } from './Render.js'
import { animate, waitUntil } from './Animation.js'
import Scene from './Scene.js'
