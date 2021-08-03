
function selectorCanvas(selector) {
  return new Promise((resolve, reject) => {
    const query = wx.createSelectorQuery()
    query.select(selector)
          .fields({
            node: true,
            size: true
          }).exec(res => {
            const dom = res[0]
            const canvas = dom.node
            const ctx = canvas.getContext('2d')
            const dpr = wx.getSystemInfoSync().pixelRatio
            computeCanvasSize(dom, canvas, ctx, dpr)
            resolve({ dom, canvas, ctx})
          })
  })
}

function computeCanvasSize(dom, canvas, ctx, dpr) {
  canvas.height = dom.height * dpr
  canvas.width = dom.width * dpr
  ctx.scale(dpr, dpr)
}

export {
  selectorCanvas
}