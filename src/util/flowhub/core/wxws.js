export default function (url) {
  if (!url) return

  const options = {
    status: 'init',
    lastPongTime: 0,
    heartTimer: 0,
    reconnecting: false,
    reconnectTimer: 0,
    msgListener: null,
    heartListener: null
  }

  const dispatcher = {}

  dispatcher.createChannel = (msgListener, heartListener) => {
    if (options.status == 'run') {
      return
    }
    options.msgListener = msgListener
    options.heartListener = heartListener
    const socket = wx.connectSocket({url, header:{'content-type': 'application/json'}})
    dispatcher.socket = socket
    channelEventListener()
  }

  const channelEventListener = () => {
    dispatcher.socket.onMessage(res => {
      const data = res.data
      if (data == 'pong') {
        const isReconnect = Date.now() - options.lastPongTime > 15 * 1000
        if (isReconnect) {
          reconnect()
        } else {
          options.lastPongTime = Date.now()
        }
      } else {
        if (options.msgListener) {
          options.msgListener(data)
        }
      }
    })
    dispatcher.socket.onOpen(res => {
      options.status = 'run'
      heartCheck()
    })
    dispatcher.socket.onError(res => {
      options.status = 'close'
      options.heartTimer && clearInterval(options.heartTimer)
      reconnect()
    })
    dispatcher.socket.onClose(() => {
      options.status = 'closed'
      options.heartTimer && clearInterval(options.heartTimer)
      reconnect()
    })
  }

  const reconnect = (res) => {
    if (options.status == 'run' || options.status == 'closed') {
      return
    }
    if (!options.reconnecting) {
      options.reconnecting = true
      options.reconnectTimer && clearTimeout(options.reconnectTimer)
      options.reconnectTimer = setTimeout(() => {
        dispatcher.createChannel()
        options.reconnecting = false
      }, 3000)
    }
  }

  dispatcher.close = (res) => {
    if (options.status == 'run') {
      options.status = 'closed'
      options.heartTimer && clearInterval(options.heartTimer)
      dispatcher.socket.close({
        code: 1000,
        reason: 'close',
        success: res => {
          console.info('close.success', res)
        },
        fail: error => {
          console.error('close.fail', error)
        }
      })
    }
  }

  dispatcher.send = (msg, sucCallback) => {
    if (options.status == 'run' && dispatcher.socket.readyState === 1) {
      if (typeof(msg) != 'string') {
        msg = JSON.stringify(msg)
      }
      dispatcher.socket.send({
        data: msg,
        success: () => {
          sucCallback(msg)
        }
      })
    } else {
      options.status = 'close'
      reconnect()
    }
  }

  const heartCheck = () => {
    options.lastPongTime = Date.now()
    options.heartTimer && clearInterval(options.heartTimer)
    console.log('heartCheck')
    /*options.heartTimer = setInterval(() => {
      dispatcher.socket.send({
        data: 'ping',
        fail: event => {
          console.error(event)
          options.heartTimer && clearInterval(options.heartTimer)
          reconnect()
        }
      })
      if (options.heartListener) {
        options.heartListener()
      }
    }, 10000)*/
  }

  return dispatcher
}
