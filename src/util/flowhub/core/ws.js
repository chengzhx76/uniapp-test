/*
 * WebSocket event srouce
 * @param {String} url
 * @return {dispatcher | void}
 */
import util from './util'
import ws from './wxws'

export default function (url) {
  if (!url) return

  const _options = {
  	lastPongTime: 0
  }

  const { emit, socket, converter } = this
  const dispatcher = {}
  let queue = []

  const _socket = ws(url)

  socket.ws.set(url, _socket)

  dispatcher.socket = _socket

  const _eventListener = (res) => {
    try {
      exec(JSON.parse(res))
    } catch (e) {
      console.error(`[${res}] not json`, e)
    }
  }

  _socket.createChannel(_eventListener)

  dispatcher.convert = (key) => {
    if (converter[key]) {
      queue.push({
        type: '__convert__',
        func: converter[key]
      })
    }
    return dispatcher
  }

  dispatcher.emit = (key, data) => {
    queue.push({
      type: '__emit__',
      func: (result) => {
        if (data) {
          emit.bind(this)(key, { result, data })
        } else {
          emit.bind(this)(key, result)
        }
      }
    })

    return dispatcher
  }

  dispatcher.off = () => {
    _socket.close()
  }

  // out of queue
  const exec = (result) => {
    queue = []
    dispatcher.emit(result.event)
    if (queue.length > 0) {
      let _result = result

      util.iterator(queue, (_i, next) => {
        switch (_i.type) {
          case '__convert__': {
            util.await(_i.func(_result), (data) => {
              _result = data
              next()
            })
            break
          }
          case '__emit__': {
            _i.func(_result.value)
            next()
            break
          }
        }
      })
    }
  }

  return dispatcher
}
