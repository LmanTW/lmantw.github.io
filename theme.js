export { displayTheme }

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
  } else {
    return theme
  }
}

//顯示主題
function displayTheme () {
  const style = document.createElement('style')
  style.innerHTML = 
  `
  @keyframes switchThemeButtonFly {
    40% {left: calc(50vw - 25px); top: calc(50vh - 25px)}
    40% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(1)}
    60% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(5)}
    100% {left: calc(50vw - 25px); top: calc(50vh - 25px); transform: scale(1)}
  }
  @keyframes switchTheme {
    20% {border-radius: 5%; background-color: var(--switchThemeColor); width: calc(100vh - 50px); height: calc(100vh - 50px)}
    50% {border-radius: 50%; background-color: var(--switchThemeColor); width: calc(100vh - 250px); height: calc(100vh - 250px); transform: rotate(45deg)}
    60% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vw; height: 100vw; transform: rotate(90deg);}
    70% {border-radius: 0px; background-color: var(--switchThemeColor); width: 100vw; height: 100vw; transform: rotate(90deg)}
    100% {border-radius: 0px; background-color: transparent; width: 100vw; height: 100vw; transform: rotate(90deg)}
  }
  .theme {
    transition-duration: 0.5s;
  }
  .theme:hover {
    transform: scale(1.2);
  }
  .switchTheme {
    position: fixed;
    border-radius: 100%;
    width: 0px;
    height: 0px;
    left: 50vw
    top: 50vh;
    zIndex: 999;
    animation: switchTheme 3s 1;
    animation-delay: 0.65s
  }
  `
  document.getElementsByTagName('head')[0].appendChild(style)
  const root = document.querySelector(':root')
  const theme = document.getElementById('theme')
  theme.classList = 'theme'
  theme.style.top = '25px'
  theme.style.left = 'calc(100vw - 75px)'
  let nowTheme = getTheme()
  if (nowTheme === 'dark') {
    root.style.setProperty('--backgroundColor', '#0D113B')
    root.style.setProperty('--color', `white`)
    theme.src = 'Images/lightTheme.svg'
    theme.style.color = 'white'
  } else if (nowTheme === 'light') {
    root.style.setProperty('--backgroundColor', 'white')
    root.style.setProperty('--color', `black`)
    theme.src = 'Images/darkTheme.svg'
  }
  let switching = false
  theme.onclick = () => {
    if (switching) return
    switching = true
    if (nowTheme === 'light') document.cookie = 'theme=dark'
    else document.cookie = 'theme=light'
    const switchTheme = document.createElement('div')
    switchTheme.classList = 'switchTheme'
    if (nowTheme === 'light') root.style.setProperty('--switchThemeColor', '#0D113B')
    else root.style.setProperty('--switchThemeColor', 'white')
    theme.style.animation = 'switchThemeButtonFly 1s 1'
    theme.addEventListener('animationend', () => {
      theme.style.animation = ''
      theme.style.transitionDuration = '0s'
      theme.style.visibility = 'hidden'
    })
    switchTheme.style.backgroundColor = 'var(--switchThemeColor)'
    switchTheme.addEventListener('animationstart', () => {
      setTimeout(() => {
        nowTheme = getTheme()
        if (nowTheme === 'dark') {
          root.style.setProperty('--backgroundColor', '#0D113B')
          root.style.setProperty('--color', `white`)
          theme.src = 'Images/lightTheme.svg'
          theme.style.color = 'white'
        } else if (nowTheme === 'light') {
          root.style.setProperty('--backgroundColor', 'white')
          root.style.setProperty('--color', `black`)
          theme.src = 'Images/darkTheme.svg'
        }
        theme.style.visibility = 'visible'
        theme.style.transitionDuration = '0.5s'
      }, 1800)
    })
    document.body.appendChild(switchTheme)
    switchTheme.addEventListener('animationend', () => {
      document.body.removeChild(switchTheme)
      switching = false
    })
  }
}