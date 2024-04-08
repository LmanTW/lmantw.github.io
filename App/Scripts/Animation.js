// Animation
async function animate (values, duration, callback) {
  return new Promise((resolve) => {
    let count = 1

    const frames = (duration / 1000) * 120

    const data = {}

    Object.keys(values).forEach((key) => data[key] = values[key][0])

    const interval = setInterval(() => {
      Object.keys(values).forEach((key) => data[key] = values[key][0] + (values[key][1] - values[key][0]) * easeInOutExpo(count / frames))

      callback(data)

      if (count >= frames) {
        clearInterval(interval)

        Object.keys(values).forEach((key) => data[key] = values[key][1])

        callback(data)

        resolve()
      }

      count++
    }, 1000 / 120)
  })
}

// Ease In Out Expo
function easeInOutExpo (t) {
  if (t === 0) return 0
  if (t === 1) return 1

  if ((t /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (t - 1))

  return 0.5 * (-Math.pow(2, -10 * --t) + 2)
}

// Wait Until
async function waitUntil (callback) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (callback()) {
        clearInterval(interval)

        resolve()
      }
    }, 1000 / 30)
  })
}

export { animate, waitUntil }
