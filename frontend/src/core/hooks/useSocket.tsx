import { io } from 'socket.io-client'
import useConfig from './useConfig'

const useSocket = () => {
  const { getApiUrl } = useConfig()
  const url = getApiUrl()
  const socket = io(url, { transports: ['websocket'] })

  /**
   * Send message
   * @param channel string
   * @param message string/object
   */
  const send = (channel: string, message: string | object) => {
    socket.emit(channel, message)
  }

  return { socket, send }
}

export default useSocket
