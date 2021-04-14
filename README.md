# uniapp-test

## 绘图

https://developers.weixin.qq.com/community/develop/article/doc/000e0c324000e07782ebf5a295ac13

set http_proxy=http://127.0.0.1:7777
set https_proxy=http://127.0.0.1:7777


fillText(ctx, textList, sx, sy, lineWithMax) {
  for (let i = 0; i < textList.length; i++) {
    const text = textList[i]
    const width = ctx.measureText(text)
    const height = parseInt(ctx.font)

    console.log(width, height)

    sy = sy * (i + 1)
    if (width <= lineWithMax) {
      ctx.fillText(text, sx, sy)
    } else {
      const chars = text.split('')
      const charsWith = []
      for (let j = 0; j < chars.length; j++) {
        charsWith.push(ctx.measureText(chars[j]).width)
      }
      let lineWith = 0
      let lastIndex = 0
      let loop = 0
      charsWith.forEach((width, index) => {
        lineWith += width
        console.log(lineWith)
        if (lineWith >= lineWithMax) {
          const fillText = text.substring(lastIndex, index)
          loop++
          const x = sx
          const y = sy + (height * loop)
          console.log(sy, height, loop)
          ctx.fillText(fillText, x, y)
          lastIndex = index
          lineWith = 0
        } else if (charsWith.length === index) {
          
        }
      })
    }

  }

},