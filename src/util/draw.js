// https://www.cnblogs.com/alpiny/p/12574017.html

function drawImage(selector, posterUrl, callback) {
  const query = wx.createSelectorQuery()
  query.select(selector)
        .fields({
          node: true,
          size: true
        }).exec(res => {
          const canvasDom = res[0]
          const canvas = canvasDom.node
          const ctx = canvas.getContext('2d')
          const dpr = wx.getSystemInfoSync().pixelRatio
          drawing(posterUrl, canvasDom, canvas, ctx, dpr, callback)
        })
}

function drawing(posterUrl, canvasDom, canvas, ctx, dpr, callback) {
  drawPoster(posterUrl, canvasDom, canvas, ctx, dpr).then(res => {
    console.log(`证书:dpr:${dpr}-canvas:${res.height} x ${res.width}`)
    // TODO 绘制内容
    callback(ctx)
  })
}

function drawPoster(posterUrl, canvasDom, canvas, ctx, dpr) {
  return new Promise((resolve, reject) => {
    const poster = canvas.createImage()
    poster.src = posterUrl
    poster.onload = () => {
      computeCanvasSize(canvasDom, canvas, ctx, dpr, poster.width, poster.height).then(res => {
        ctx.drawImage(poster, 0, 0, poster.width, poster.height, 0, 0, res.width, res.height)
        resolve(res)
      })
    }

  })
}

function computeCanvasSize(canvasDom, canvas, ctx, dpr, imgWidth, imgHeight) {
  return new Promise((resolve, reject) => {
    const canvasWidth = canvasDom.width
    const posterHeight = canvasWidth * (imgHeight / imgWidth) // 如果海报过大进行缩放
    const canvasHeight = posterHeight

    canvas.height = canvasDom.height * dpr
    canvas.width = canvasDom.width * dpr
    ctx.scale(dpr, dpr)

    resolve({ 'height': posterHeight , 'width': canvasWidth })
  })
}


export {
  drawImage
}