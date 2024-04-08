// Settings
const Settings = {
  template: await (await fetch('./Components/Settings.html')).text(),

  data () {
    return {
      open: false,

      fps: '60 (Medium)',
      resolution: `${window.innerWidth}x${window.innerHeight} (Medium)`,
      showInfo: 'Yes'
    }
  },

  methods: {
    // Change FPS
    changeFPS () {
      if (settings.fps === 15) {
        settings.fps = 30

        this.fps = '30 (Low)'
      } else if (settings.fps === 30) {
        settings.fps = 60

        this.fps = '60 (Medium)'
      } else if (settings.fps === 60) {
        settings.fps = 120

        this.fps = '120 (High)'
      } else {
        settings.fps = 15

        this.fps = '15 (Macbook 2012)'
      }
    },

    // Change Resolution
    changeResolution () {
      if (settings.resolution === 0.75) {
        settings.resolution = 1

        this.resolution = `${Math.round(window.innerWidth * settings.resolution)}x${Math.round(window.innerHeight * settings.resolution)} (Medium)`
      } else if (settings.resolution === 1) {
        settings.resolution = 1.5

        this.resolution = `${Math.round(window.innerWidth * settings.resolution)}x${Math.round(window.innerHeight * settings.resolution)} (High)`
      } else {
        settings.resolution = 0.75

        this.resolution = `${Math.round(window.innerWidth * settings.resolution)}x${Math.round(window.innerHeight * settings.resolution)} (Macbook 2012)`
      }
    },
  }
}

let settings = { fps: 60, resolution: 1 }

// Get Settings
function getSettings () {
  return settings
}

export { Settings, getSettings }
