// https://developers.weixin.qq.com/miniprogram/dev/api/wxml/NodesRef.boundingClientRect.html

export function getRect(selector, all) {
  return new Promise(resolve => {
    wx.createSelectorQuery()[all ? 'selectAll' : 'select'](selector)
      .boundingClientRect(rect => {
        resolve(rect)
      }).exec()
  })
}

// 组件内获取
export function getCompRect(that, selector, all) {
  return new Promise(resolve => {
    wx.createSelectorQuery().in(that)[all ? 'selectAll' : 'select'](selector)
        .boundingClientRect(rect => {
          resolve(rect)
        }).exec()
  })
}