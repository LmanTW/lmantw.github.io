// Scene
class Scene {
  constructor () {
    this.objects = []

    this.Object = new DisplayObject()
  }

  // Load Scene
  loadScene (objects) {
    this.objects = objects 
  }
}

// Display Object
class DisplayObject {
  line (points, style) {return { type: 'line', points, style: style || {} }}
  rectangle (x, y, width, height, style) {return { type: 'rectangle', x, y, width, height, style: style || {} }}
  circle (x, y, size, style) {return { type: 'circle', x, y, size, style: style || {} }}
  text (content, x, y, style) {return { type: 'text', content, x, y, style: style || {} }}

  teleporter (x, y, x2, y2) {return { type: 'teleporter', x, y, x2, y2, progress: 0, travelX: undefined, travelY: undefined }}
  button (x, y, callback) {return { type: 'button', x, y, callback, progress: 0 }}
}

export default new Scene()
