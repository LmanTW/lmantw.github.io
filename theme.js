export { displayTheme }

import { createElement, setElementOptions } from "./tools.js";

//取得餅乾
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

//取得主題
function getTheme () {
  let theme = getCookie('theme')
  if (theme === undefined) {
    document.cookie = 'theme=light'
    return 'light'
  } else {
    return theme
  }
}

//改變SVG圖片
function changeSvgImage () {
  let nowTheme = getTheme()
  let allElement = document.body.getElementsByClassName('svgImage')
  for (let run = 0; run < allElement.length; run++) {
    allElement[run].src = `${allElement[run].src.split('-')[0]}-${nowTheme}Theme.svg`
  }
}

//顯示主題
function displayTheme () {
  const style = document.createElement('style')
  style.innerHTML = 
  `
  @keyframes switchThemeButtonFly {
    40% {left: calc(50vw - 25px); top: calc(50vh - 25px); z-index: 998}
    40% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(1)}
    60% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(5)}
    100% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(1); z-index: 998}
  }
  @keyframes switchTheme-width {
    20% {border-radius: 5%; background-color: var(--switchThemeColor); width: calc(100vh - 50px); height: calc(100vh - 50px); z-index: 999}
    50% {border-radius: 50%; background-color: var(--switchThemeColor); width: calc(100vh - 250px); height: calc(100vh - 250px); transform: rotate(45deg)}
    60% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vw; height: 100vw; transform: rotate(90deg);}
    70% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vw; height: 100vw; transform: rotate(90deg)}
    100% {border-radius: 0px; background-color: transparent; width: 100vw; height: 100vw; transform: rotate(90deg); z-index: 999}
  }
  @keyframes switchTheme-height {
    20% {border-radius: 5%; background-color: var(--switchThemeColor); width: calc(100vw - 50px); height: calc(100vw - 50px); z-index: 999}
    50% {border-radius: 50%; background-color: var(--switchThemeColor); width: calc(100vw - 250px); height: calc(100vw - 250px); transform: rotate(45deg)}
    60% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vh; height: 100vh; transform: rotate(90deg);}
    70% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vh; height: 100vh; transform: rotate(90deg)}
    100% {border-radius: 0px; background-color: transparent; width: 100vh; height: 100vh; transform: rotate(90deg); z-index: 999}
  }
  .theme {
    position: fixed;
    width: 50px;
    top: 25px;
    left: calc(100vw - 75px)
  }
  .switchTheme {
    position: fixed;
    border-radius: 100%;
    width: 0px;
    height: 0px;
    left: 50vw
    top: 50vh;
    zIndex: 999;
  }
  `
  document.getElementsByTagName('head')[0].appendChild(style)
  const root = document.querySelector(':root')
  const theme = document.getElementById('theme')
  theme.classList = 'theme'
  let nowTheme = getTheme()
  root.style.setProperty('--theme', nowTheme)
  if (nowTheme === 'dark') {
    root.style.setProperty('--backgroundColor', '#0D113B')
    root.style.setProperty('--color', `white`)
    theme.src = `Images/lightTheme.svg`
  } else if (nowTheme === 'light') {
    root.style.setProperty('--backgroundColor', 'white')
    root.style.setProperty('--color', `black`)
    theme.src = `Images/darkTheme.svg`
  }
  let switching = false
  theme.onclick = () => {
    if (switching) return
    switching = true
    if (nowTheme === 'light') document.cookie = 'theme=dark'
    else document.cookie = 'theme=light'
    const switchTheme = createElement('div', { classList: 'switchTheme', style: { animation: (window.innerWidth > window.innerHeight) ? 'switchTheme-width 3s 1 0.65s' : 'switchTheme-height 3s 1 0.65s' }})
    if (nowTheme === 'light') root.style.setProperty('--switchThemeColor', '#0D113B')
    else root.style.setProperty('--switchThemeColor', 'white')
    theme.style.animation = 'switchThemeButtonFly 1s 1'
    theme.addEventListener('animationend', () => setElementOptions(theme, { style: { animation: '', visibility: 'hidden' }}))
    switchTheme.style.backgroundColor = 'var(--switchThemeColor)'
    switchTheme.addEventListener('animationstart', () => {
      setTimeout(() => {
        theme.src = `Images/${nowTheme}Theme.svg`
        nowTheme = getTheme()
        if (nowTheme === 'dark') {
          root.style.setProperty('--backgroundColor', '#0D113B')
          root.style.setProperty('--color', `white`)
        } else if (nowTheme === 'light') {
          root.style.setProperty('--backgroundColor', 'white')
          root.style.setProperty('--color', `black`)
        }
        root.style.setProperty('--theme', nowTheme)
        theme.style.visibility = 'visible'
        changeSvgImage()
      }, 1800)
    })
    document.body.appendChild(switchTheme)
    switchTheme.addEventListener('animationend', () => {
      document.body.removeChild(switchTheme)
      switching = false
    })
  }
}