function rpxToPx(rpx) {
  return rpx / 750 * store.getters.sysInfo.windowWidth
}

function pxToRpx(px) {
  return px * 750 / store.getters.sysInfo.windowWidth
}


export {
  rpxToPx,
  pxToRpx

}