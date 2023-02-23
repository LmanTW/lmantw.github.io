export { get }

//取得
async function get (data) {
  return new Promise(async (resolve, reject) => {
    try {
      await fetch(`http://asia-1.icehost.xyz:25617/lmanWebsiteServer?data=${JSON.stringify(data)}`)
        .then(response => response.text())
        .then(resData => resolve(JSON.parse(resData)))
    } catch (error) {
      resolve(undefined)
    }
  })
}