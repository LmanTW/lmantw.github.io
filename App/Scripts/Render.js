const canvas = document.getElementById('canvas')

const ctx = canvas.getContext('2d')

// Render
function render () {
  const resolution = getSettings().resolution

  if (canvas.width !== window.innerWidth * resolution) canvas.width = window.innerWidth * resolution
  if (canvas.height !== window.innerHeight * resolution) canvas.height = window.innerHeight * resolution

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.beginPath()
  ctx.resetTransform()

  Scene.objects.forEach((object) => {
    if (object.type === 'line') Render.line(object.points, object.style)  
    else if (object.type === 'rectangle') Render.rectangle(object.x, object.y, object.width, object.height, object.style)
    else if (object.type === 'circle') Render.circle(object.x, object.y, object.size, object.style)  
    else if (object.type === 'text') Render.text(object.content, object.x, object.y, object.style)
    else if (object.type === 'teleporter') {
      Render.line([{ x: object.x, y: object.y }, { x: object.x2, y: object.y2 }], { width: 0.1 })

      Render.circle(object.x, object.y, 0.5 + (0.25 * object.progress), { color: 'black', border: { width: 0.1 }})
      Render.circle(object.x, object.y, 0.1 + (0.5 * object.progress), {})

      Render.circle(object.x2, object.y2, 0.5 + (0.25 * object.progress), { color: 'black', border: { width: 0.1 }})
      Render.circle(object.x2, object.y2, 0.1 + (0.5 * object.progress), {})

      if (object.travelX !== undefined && object.travelY !== undefined) {
        Render.circle(object.travelX, object.travelY, 0.1, {})
      }
    } else if (object.type === 'button') {
      Render.rectangle(object.x, object.y, 1, 1, { color: 'black', angle: 45, radius: 0.1, border: { width: 0.1 }})
      Render.rectangle(object.x, object.y, 0.75, 0.75, { color: 'black', radius: 0.1, border: { width: 0.1 }})
    }

    ctx.beginPath()
    ctx.resetTransform()
  })


  ctx.strokeStyle = 'rgba(255,255,255,0.25)'
  ctx.lineWidth = getRenderValue(0.1)

  if (!Control.lock && Control.mouse.press) {
    ctx.moveTo(Control.mouse.oldX, Control.mouse.oldY)
    ctx.lineTo(Control.mouse.x, Control.mouse.y)

    ctx.stroke()

    ctx.beginPath()

    ctx.arc(Control.mouse.oldX, Control.mouse.oldY, getRenderValue(0.1), 0, 2 * Math.PI)

    ctx.fillStyle = 'black'

    ctx.fill()

    ctx.fillStyle = 'rgba(255,255,255,0.25)'

    ctx.fill()

    ctx.beginPath()
  }

  ctx.fillStyle = 'black'

  ctx.arc(Control.mouse.x, Control.mouse.y, getRenderValue(0.5), 0, 2 * Math.PI)

  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
}

// Render
class Render {
  // Render Line
  static line (points, style) {
    points.forEach((point, index) => {
      const renderPosition = getRenderPosition(point.x, point.y)

      if (index === 0) ctx.moveTo(renderPosition.x, renderPosition.y)
      else ctx.lineTo(renderPosition.x, renderPosition.y)
    })

    ctx.strokeStyle = style.color || 'white'
    ctx.lineWidth = getRenderValue(style.width || 0.1)
    ctx.lineCap = style.cap || 'round'

    ctx.stroke()

    ctx.beginPath()
  }

  // Rectangle
  static rectangle (x, y, width, height, style) {
    const renderPosition = getRenderPosition(x, y)

    if (style.center === undefined || style.center === false) {
      renderPosition.x -= getRenderValue(width / 2)
      renderPosition.y -= getRenderValue(height / 2)
    }

    if (style.angle !== undefined && style.angle !== 0) { 
      ctx.translate(renderPosition.x + getRenderValue(width / 2), renderPosition.y + getRenderValue(height / 2))
      ctx.rotate(style.angle * Math.PI / 180)

      ctx.roundRect(-getRenderValue(width / 2),  -getRenderValue(height / 2), getRenderValue(width), getRenderValue(height), getRenderValue(style.radius || 0))
    } else ctx.roundRect(renderPosition.x, renderPosition.y, getRenderValue(width), getRenderValue(height), getRenderValue(style.radius || 0))

    ctx.fillStyle = style.color || 'white'

    ctx.fill()

    if (style.border !== undefined) {
      ctx.strokeStyle = style.border.color || 'white'
      ctx.lineWidth = getRenderValue(style.border.width || 0.1)

      ctx.stroke()
    }

    ctx.beginPath()
    ctx.resetTransform()
  }

  // Render Circle
  static circle (x, y, size, style) {
    const renderPosition = getRenderPosition(x, y)

    ctx.arc(renderPosition.x, renderPosition.y, getRenderValue(size), 0, 2 * Math.PI)

    ctx.fillStyle = style.color || 'white'

    ctx.fill()

    if (style.border !== undefined) {
      ctx.strokeStyle = style.border.color || 'white'
      ctx.lineWidth = getRenderValue(style.border.width || 0.1)

      ctx.stroke()
    }

    ctx.beginPath()
  }

  // Render Text
  static text (content, x, y, style) {
    const renderPosition = getRenderPosition(x, y)

    const size = style.size || 1.5

    ctx.fillStyle = style.color || 'white'
    ctx.font = `${(((canvas.width / 100) + (canvas.height / 100)) * size) * (Control.camera.zoom * Control.camera.zoom)}px monospace`
    ctx.textAlign = style.align || 'center'

    let yOffset = 0

    content.split('\n').forEach((line) => {
      const metrics = ctx.measureText(line)
      const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent 

      ctx.fillText(line, renderPosition.x, (renderPosition.y + yOffset) + (height / 2))

      yOffset += height + getRenderValue(style.lineHeight || 0.1)
    })
  }
}

// Get Render Value
function getRenderValue (value) {
  return (((canvas.width / 100) + (canvas.height / 100)) * value) * Control.camera.zoom
}

// Get Render Position
function getRenderPosition (x, y) {
  return { x: (canvas.width / 2) + (getRenderValue(x - Control.camera.x)) * Control.camera.zoom, y: (canvas.height / 2) + (getRenderValue(y - Control.camera.y)) * Control.camera.zoom }
}

// Is Visible
function isVisible (x, y) {
  return object.visible
}

export { render, getRenderValue, getRenderPosition }

import { getSettings } from '../Components/Settings.js'
import Control from './Control.js'
import Scene from './Scene.js'
