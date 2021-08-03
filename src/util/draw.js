// https://www.cnblogs.com/alpiny/p/12574017.html
import { substr, toArray } from './emoutils'

function drawImage(selector, posterUrl, cb) {
  return new Promise((resolve, reject) => {
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
            drawing(posterUrl, canvasDom, canvas, ctx, dpr, cb).then(res => {
              resolve(res)
            })
          })
  })
}

function drawing(posterUrl, canvasDom, canvas, ctx, dpr, cb) {
  return new Promise((resolve, reject) => {
    drawPoster(posterUrl, canvasDom, canvas, ctx, dpr).then(res => {
      // console.log(`证书:dpr:${dpr}-canvas:${res.height} x ${res.width}`)
      // TODO 绘制内容
      if (cb) {
        cb(ctx)
      }
      resolve(ctx)
    })
  })
}

function drawPoster(posterUrl, canvasDom, canvas, ctx, dpr) {
  return new Promise((resolve, reject) => {
    const poster = canvas.createImage()
    poster.src = posterUrl
    poster.onload = () => {
      computeCanvasSize(canvasDom, canvas, ctx, dpr, poster.width, poster.height).then(res => {
        // console.log(poster.width, poster.height, res.width, res.height)
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

function subText(text, ctx, canvasWidth, marginWidth) {
  const chars = toArray(text)
  console.log(chars)
  const charWiths = []
  chars.forEach(char => {
    charWiths.push(ctx.measureText(char).width)
  })
  const textWidth = canvasWidth - (marginWidth * 2) - ctx.measureText('...').width

  let lineWith = 0
  for (let i = 0; i < charWiths.length; i++) {
    lineWith += charWiths[i]
    if (lineWith >= textWidth) {
      return `${substr(text, 0, i)}...`
    }
  }
  if (lineWith < textWidth) {
    return text
  }
}

export {
  drawImage,
  subText
}