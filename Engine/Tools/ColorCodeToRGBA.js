let nameToHex = {
  'black': '#000000',
  'white': '#ffffff',
  'red': '#ff0000',
  'orange': '#ff6600',
  'yellow': '#ffff00',
  'green': '#009933',
  'lime': '#00ff00',
  'blue': '#0000ff',
  'purple': '#9933ff',
  'pink': '#ff66ff'
}

//將顏色碼轉為RGBA
export default (colorCode, alpha) => {
  if (colorCode === 'transparent') return 'rgba(0,0,0,0)'
  else {
    if (colorCode === undefined) colorCode = 'black'
    if (nameToHex[colorCode] !== undefined) colorCode = nameToHex[colorCode]
    const [r, g, b] = colorCode.match(/\w\w/g).map(x => parseInt(x, 16))
    return `rgba(${r},${g},${b},${(alpha === undefined) ? 1 : alpha})`
  }
}