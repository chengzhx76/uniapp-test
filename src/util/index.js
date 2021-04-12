// none success
function toast (title, icon='none', duration=1500) {
  uni.showToast({
    title,
    icon,
    duration: duration
  })
}

function loading (title='加载中') {
  uni.showLoading({
    title
  })
}

function hideLoading() {
  uni.hideLoading()
}

function copy(content, tips='内容已复制') {
  uni.setClipboardData({
    data: content,
    success (res) {
      toast(tips)
    }
  })
}

function vibrate() {
  uni.vibrateShort({success: function () {}})
}

function showModal(content='确定', title='提示') {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      success (res) {
        resolve(res.confirm)
      }
    })
  })
}

function rpxToPx(rpx) {
  return rpx / 750 * store.getters.sysInfo.windowWidth
}

function pxToRpx(px) {
  return px * 750 / store.getters.sysInfo.windowWidth
}

export {
  toast,
  loading,
  vibrate,
  hideLoading,
  showModal,

  copy,

  rpxToPx,
  pxToRpx,

}