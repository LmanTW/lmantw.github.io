//開始渲染
export default () => {
  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  window.addEventListener('mousedown', () => {
    canvas.style.cursor = 'grabbing'
    player.scroll = true
  })
  window.addEventListener('mouseup', () => {
    canvas.style.cursor = 'grab'
    player.scroll = false
  })
  window.addEventListener('mousemove', (e) => {
    if (player.scroll) {
      player.scrollX = ((window.screen.width+window.screen.height)/(canvas.width+canvas.height))*((e.clientX-player.mouseX)/12.5)
      player.scrollY = ((window.screen.width+window.screen.height)/(canvas.width+canvas.height))*((e.clientY-player.mouseY)/12.5)
    }
    player.mouseX = e.clientX, player.mouseY = e.clientY
  })

  window.addEventListener('touchstart', (e) => {
    player.mouseX = e.changedTouches[0].clientX, player.mouseY = e.changedTouches[0].clientY
    player.scroll = true
  })
  window.addEventListener('touchend', () => player.scroll = false)
  window.addEventListener('touchmove', (e) => {
    e.preventDefault()
    if (player.scroll) {
      player.scrollX = ((window.screen.width+window.screen.height)/(canvas.width+canvas.height))*((e.changedTouches[0].clientX-player.mouseX)/10)
      player.scrollY = ((window.screen.width+window.screen.height)/(canvas.width+canvas.height))*((e.changedTouches[0].clientY-player.mouseY)/10)
    }
    player.mouseX = e.changedTouches[0].clientX, player.mouseY = e.changedTouches[0].clientY
  })

  function render () {
    ctx.beginPath()
    ctx.resetTransform()
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    Object.keys(objects).forEach((item) => {
      ctx.beginPath()
      ctx.resetTransform()

      let object = objects[item]
      if (object.type === 'line') {
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: object.style })
        ctx.moveTo(displayPosition.x, displayPosition.y)
        let displayPosition2 = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x2, y: object.y2, width: 0, height: 0, style: object.style })
        ctx.lineTo(displayPosition2.x, displayPosition2.y)

        ctx.strokeStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.width === undefined) ? 0.1 : object.style.width)
        ctx.lineCap = (object.style.cap === undefined) ? 'round' : object.style.cap
        ctx.stroke()
      } else if (object.type === 'travelLine') {
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: object.style })
        ctx.moveTo(displayPosition.x, displayPosition.y)
        let displayPosition2 = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x2, y: object.y2, width: 0, height: 0, style: object.style })
        ctx.lineTo(displayPosition2.x, displayPosition2.y)

        ctx.strokeStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.width === undefined) ? 0.1 : object.style.width)
        ctx.lineCap = (object.style.cap === undefined) ? 'round' : object.style.cap
        ctx.stroke()

        let pointSize = getDisplaySize(canvas, player.cameraZoom, (object.style.pointSize === undefined) ? 0.2 : object.style.pointSize)
        let pointSize2 = getDisplaySize(canvas, player.cameraZoom, (object.style.pointSize2 === undefined) ? 1 : object.style.pointSize2)

        if (object.data === undefined) object.data = { animation: 0, confirm: 0, animation2: 0, confirm2: 0 }
        if (!player.traveling && isTouch(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: {} }, { x: player.mouseX, y: player.mouseY }, pointSize2)) {
          if (object.data.animation < 100) object.data.animation+=4
          else if (object.data.confirm < 100) object.data.confirm+=2
          else travel(object.x, object.y, object.x2, object.y2)
        } else {
          if (object.data.animation > 0) object.data.animation--
          if (object.data.confirm > 0) object.data.confirm--
        }

        if (!player.traveling && isTouch(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x2, y: object.y2, width: 0, height: 0, style: {} }, { x: player.mouseX, y: player.mouseY }, pointSize2)) {
          if (object.data.animation2 < 100) object.data.animation2+=4
          else if (object.data.confirm2 < 100) object.data.confirm2+=2
          else travel(object.x2, object.y2, object.x, object.y)
        } else {
          if (object.data.animation2 > 0) object.data.animation2--
          if (object.data.confirm2 > 0) object.data.confirm2--
        }

        ctx.beginPath()
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.arc(displayPosition.x, displayPosition.y, getSmoothFrame(pointSize, getSmoothFrame(pointSize2, pointSize2*1.5, object.data.animation, 100)-5, object.data.confirm, 100), (0*Math.PI)/180, (360*Math.PI)/180)
        ctx.fill()

        ctx.beginPath()
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.arc(displayPosition2.x, displayPosition2.y, getSmoothFrame(pointSize, getSmoothFrame(pointSize2, pointSize2*1.5, object.data.animation2, 100)-5, object.data.confirm2, 100), (0*Math.PI)/180, (360*Math.PI)/180)
        ctx.fill()

        ctx.beginPath()
        ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.pointWidth === undefined) ? 0.075 : object.style.pointWidth)
        ctx.arc(displayPosition.x, displayPosition.y, getSmoothFrame(pointSize2, pointSize2*1.5, object.data.animation, 100), (0*Math.PI)/180, (360*Math.PI)/180)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.pointWidth === undefined) ? 0.075 : object.style.pointWidth)
        ctx.arc(displayPosition2.x, displayPosition2.y, getSmoothFrame(pointSize2, pointSize2*1.5, object.data.animation2, 100), (0*Math.PI)/180, (360*Math.PI)/180)
        ctx.stroke()

        if (player.traveling2) {
          ctx.beginPath()
          ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
          ctx.arc(canvas.width/2, canvas.height/2, pointSize, (0*Math.PI)/180, (360*Math.PI)/180)
          ctx.fill()
        }
      } else if (object.type === 'square') {
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, object)
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        if (object.style.angle === undefined || object.style.angle === 0) ctx.fillRect(displayPosition.x, displayPosition.y, displayPosition.width, displayPosition.height)
        else {
          ctx.translate(displayPosition.x, displayPosition.y)
          ctx.rotate(object.style.angle*Math.PI/180)
          ctx.fillRect(-(displayPosition.width/2), -(displayPosition.height/2), displayPosition.width, displayPosition.height)
        }

        if (object.style.border !== undefined) {
          ctx.strokeStyle = colorCodeToRGBA(object.style.border.color, object.style.opacity)
          ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.border.width === undefined) ? 0.1 : object.style.border.width)
          if (object.style.angle === undefined || object.style.angle === 0) ctx.strokeRect(displayPosition.x, displayPosition.y, displayPosition.width, displayPosition.height)
          else ctx.strokeRect(-(displayPosition.width/2), -(displayPosition.height/2), displayPosition.width, displayPosition.height)
        }
      } else if (object.type === 'circle') {
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: object.style })
        ctx.arc(displayPosition.x, displayPosition.y, getDisplaySize(canvas, player.cameraZoom, object.size), (object.style.startAngle === undefined) ? 0 : (object.style.startAngle*Math.PI)/180, (object.style.endAngle === undefined) ? 2 : (object.style.endAngle*Math.PI)/180)
        
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.fill()

        if (object.style.border !== undefined) {
          ctx.strokeStyle = colorCodeToRGBA(object.style.border.color, object.style.opacity)
          ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.border.width === undefined) ? 0.1 : object.style.border.width)
          ctx.stroke()
        }
      } else if (object.type === 'text') {
        ctx.font = `${getDisplaySize(canvas, player.cameraZoom, (object.style.size === undefined) ? 3 : object.style.size)}px ${(object.style.font === undefined) ? 'arial' : object.style.font}`
        let metrics = ctx.measureText(object.text)
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: object.style })
        
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.textAlign = (object.style.align === undefined) ? 'center' : object.style.align
        ctx.fillText(object.text, displayPosition.x, displayPosition.y+((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2))
        // if (object.style.angle === undefined || object.style.angle === 0) ctx.fillText(object.text, displayPosition.x, displayPosition.y+((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2))
        // else {
        //   ctx.translate(displayPosition.x, displayPosition.y)
        //   ctx.rotate(object.style.angle*Math.PI/180)
        //   ctx.fillText(object.text, -(metrics.width/2), -((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2))
        // }
      } else if (object.type === 'textButton') {
        ctx.font = `${getDisplaySize(canvas, player.cameraZoom, (object.style.size === undefined) ? 3 : object.style.size)}px ${(object.style.font === undefined) ? 'arial' : object.style.font}`
        let metrics = ctx.measureText(object.text)
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, { x: object.x, y: object.y, width: 0, height: 0, style: object.style })
        
        ctx.fillStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.textAlign = (object.style.align === undefined) ? 'center' : object.style.align
        ctx.fillText(object.text, displayPosition.x, displayPosition.y+((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2))

        let startX = 0
        if (object.style.align === undefined || object.style.align === 'center') startX = displayPosition.x-(metrics.width/2)
        else if (object.style.align === 'left') startX = displayPosition.x
        else if (object.style.align === 'right') startX = displayPosition.x-metrics.width

        ctx.strokeStyle = colorCodeToRGBA(object.style.color, object.style.opacity)
        ctx.lineWidth = getDisplaySize(canvas, player.cameraZoom, (object.style.size === undefined) ? 0.3 : object.style.size/10)
        ctx.moveTo(startX, displayPosition.y+(((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2)+5))
        ctx.lineTo(startX+metrics.width, displayPosition.y+(((metrics.actualBoundingBoxAscent+metrics.actualBoundingBoxDescent)/2)+5))
        ctx.stroke()
      } else if (object.type === 'image') {
        let displayPosition = getDisplayPosition(canvas, { x: player.cameraX, y: player.cameraY, zoom: player.cameraZoom }, object)

        if (object.style.angle === undefined || object.style.angle === 0) ctx.drawImage(images[object.imageID], displayPosition.x, displayPosition.y, displayPosition.width, displayPosition.height)
        else {
          ctx.translate(displayPosition.x, displayPosition.y)
          ctx.rotate(object.style.angle*Math.PI/180)
          ctx.drawImage(images[object.imageID], -(displayPosition.width/2), -(displayPosition.height/2), displayPosition.width, displayPosition.height)
        }
      }
    })

    window.requestAnimationFrame(render)
  }

  createInterval(1000/10, () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  createInterval(1000/60, () => {
    if (!player.traveling) {
      player.cameraX-=player.scrollX
      player.cameraY-=player.scrollY
    }
    player.scrollX -= player.scrollX/10
    player.scrollY -= player.scrollY/10
  })

  render()
}

//取得順滑動畫中的幀
function getSmoothFrame (size, destinationSize, count, duration) {
  let smoothProgress = 0.5-0.5*Math.sin((((180/duration)*count)+90)*Math.PI/180)
  return size+((destinationSize-size)*smoothProgress)
}

import getDisplayPosition from './Tools/GetDisplayPosition.js'
import colorCodeToRGBA from './Tools/ColorCodeToRGBA.js'
import getDisplaySize from './Tools/GetDisplaySize.js'
import { createInterval } from './Tools/Interval.js'
import isTouch from './Tools/IsTouch.js'

import { player, objects, images } from './Data.js'
import travel from './Travel.js'