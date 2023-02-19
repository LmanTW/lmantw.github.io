export { get }

//取得
async function get (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`http://${location.hostname}:8080/server?data=${JSON.stringify(data)}`)
        .then(response => response.text())
        .then(resData => resolve(JSON.parse(resData)))
    } catch (error) {
      resolve(undefined)
    }
  })
}