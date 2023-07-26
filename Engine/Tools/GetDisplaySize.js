//取得顯示的大小
export default (canvas, cameraZoom, size) => {
  return (((canvas.width+canvas.height)/100)*size)*cameraZoom
}