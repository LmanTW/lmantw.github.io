//取得顯示的位置
export default (canvas, camera, object) => {
  let data = {
    x: (canvas.width/2)+((((canvas.width+canvas.height)/100)*(object.x-camera.x))*camera.zoom),
    y: (canvas.height/2)+((((canvas.width+canvas.height)/100)*(object.y-camera.y))*camera.zoom),
    width: (object.width === object.height) ? (((canvas.width+canvas.height)/100)*object.width)*camera.zoom : ((canvas.width/100)*object.width)*camera.zoom,
    height: (object.width === object.height) ? (((canvas.width+canvas.height)/100)*object.height)*camera.zoom : ((canvas.height/100)*object.height)*camera.zoom
  }

  if (object.style.positionLock === true) {
    data.x = object.x
    data.y = object.y
  } else {
    data.x-=data.width/2
    data.y-=data.height/2
  }

  if (object.style.sizeLock === true) {
    data.width = object.width
    data.height = object.height
  }

  return data
}

//突然變好多人ｌｏｌ