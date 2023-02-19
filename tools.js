export { createElement, setElementOptions }

//取得物件所有的key
function getAllKeysOfObject (object, path) {
  let allKey = Object.keys(object)
  let keys = []
  allKey.map((item) => {
    if (typeof object[item] === 'object' && !Array.isArray(object[item])) {
      (path.length > 0) ? keys.push(`${path.join('.')}.${item}`) : keys.push(item)
      keys = keys.concat(getAllKeysOfObject(object[item], path.concat([item])))
    } else {
      (path.length > 0) ? keys.push(`${path.join('.')}.${item}`) : keys.push(item)
    }
  })
  return keys
}

//創建Element
function createElement (tagName, options) {
  let element = document.createElement(tagName)
  let allKey = getAllKeysOfObject(options, [])
  allKey.map((item) => {
    if (item !== 'style') eval(`element.${item} = options.${item}`)
  })
  return element
}

//設定Element
function setElementOptions (element, options) {
  let allKey = getAllKeysOfObject(options, [])
  allKey.map((item) => {
    if (item !== 'style') eval(`element.${item} = options.${item}`)
  })
}