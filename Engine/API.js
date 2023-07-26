import generateID from './Tools/GenerateID.js'

import { objects, images, createObject } from './Data.js'
import startRender from './Render.js'

//加載
class Load {
  //加載圖片
  async image (path) {
    return new Promise((resolve) => {
      let id = generateID(5, Object.keys(images))
      images[id] = new Image()
      images[id].src = path
      images[id].onload = () => resolve(id)
    })
  }
}

//創建物件
class Create {
  //創建線
  line (x, y, x2, y2, style) {
    return new DisplayObject(createObject({ type: 'line', x, y, x2, y2, style: (style === undefined) ? {} : style }))
  }
  //創建移動線
  travelLine (x, y, x2, y2, style) {
    return new DisplayObject(createObject({ type: 'travelLine', x, y, x2, y2, style: (style === undefined) ? {} : style }))
  }
  //創建正方形
  square (x, y, width, height, style) {
    return new DisplayObject(createObject({ type: 'square', x, y, width, height, style: (style === undefined) ? {} : style }))
  }
  //創建圓圈
  circle (x, y, size, style) {
    return new DisplayObject(createObject({ type: 'circle', x, y, size, style: (style === undefined) ? {} : style }))
  }
  //創建文字
  text (text, x, y, style) {
    return new DisplayObject(createObject({ type: 'text', text, x, y, style: (style === undefined) ? {} : style }))
  }
  //創建圖像
  image (imageID, x, y, width, height, style) {
    return new DisplayObject(createObject({ type: 'image', imageID, x, y, width, height, style: (style === undefined) ? {} : style }))
  }
}

//物件
class DisplayObject {
  #id
  constructor (id) {
    this.#id = id
  }

  //取得值
  get (name) {
    let target = objects[this.#id]
    name.split('.').forEach((item) => target = target[item])
    return target
  }
  //設定值
  set (name, value) {
    let target = objects[this.#id]
    if (name.split('.').length > 1) {
      name.split('.').forEach((item, index) => {
        if (index < name.split(',').length) target = target[item]
      })
    }
    target[name.split('.')[name.split('.').length-1]] = value
  }
  //改變值
  change (name, value) {
    let target = objects[this.#id]
    name.split('.').forEach((item, index) => {
      if (index < name.split(',').length) target = target[item]
    })
    target[name.split('.')[name.split('.').length-1]] += value
  }
}

//API
export default new class {
  constructor () {
    this.load = new Load()
    this.create = new Create()
  }

  //開始渲染
  startRender (canvas) {
    startRender(canvas)
  }
}