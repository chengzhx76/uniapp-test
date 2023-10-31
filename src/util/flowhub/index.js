/*
 * emit event
 */
import emit from './core/emit'

/*
 * on event
 */
import on from './core/on'

/*
 * removeListen event
 */
import off from './core/off'

/*
 * websocket event
 */
import WS from './core/ws'

/*
 * chain event
 */
import chain from './core/chain'

/*
 * once event
 */
import once from './core/once'

const _observer = {}

// 用于存储一些持久化链接
const _socket = {
  // ws: []
  ws: new Map()
}

const _store = {}
const _converter = {}
const _chainer = {}

export default {

  /*
  * save the listening observer
  */
  observer: _observer,

  /*
  * save the store value in object
  */
  data: _store,

  chainer: _chainer,

  /*
  * save the socket ( WS )
  */
  socket: _socket,

  /*
  * emit to the observer
  * @param {String} key
  * @param {Any} value
  * @return {void}
  */
  emit,

  /*
  * register to be an observer
  * @param {String} key
  * @param {Function} handler
  * @return {object} listener
  */
  on,

  /*
  * remove the listener from the observer
  */
  off,

  /*
  * WebSocket event can emit flow to the listener.
  * @param {SFKey} the key of socket
  * @param {String} url
  * @return {dispatcher | void}
  */
  WS,

  /*
  * chain event
  * @param {String} name
  * @return {object} chainer
  */
  chain,

  converter: _converter,

  once
}
