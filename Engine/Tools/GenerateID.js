import getRandom from "./GetRandom.js"

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'

function generateAnId (length) {
  let string = ''
  for (let i = 0; i < length; i++) string+=letters[getRandom(0, letters.length)]
  return string
}

//生成ID
export default (length, keys) => {
  let string = generateAnId(length)
  while (keys.includes(string)) string = generateAnId(length)
  return string
}