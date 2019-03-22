import socketIO from 'socket.io-client'

const url = `https://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`
const socket = socketIO(url, { transports: ['websocket'] })

const join = callback => {
  socket.on('join', (message) => {
    callback(message)
  })
}

const send = (channel, message) => {
  // Send message to server
  socket.emit(channel, message)
}

export {
  join,
  send
}
