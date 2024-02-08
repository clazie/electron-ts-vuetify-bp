//import ws, { WebSocketServer } from "ws"
import { v4 as uuidv4 } from 'uuid'

//https://wiki.selfhtml.org/wiki/JavaScript/WebSocket/WebSockets_im_Browser

export class Hello {
  websock: WebSocket
  sessionId = uuidv4()
  options = {
    //url: `wss://hades.konzeptpark.de/rnv-dfi/`,
    url: `wss://localhost/`,
    displayNumber: 63905,
    displaySerial: 'AXN-63905',
    protocol: ['nuerp-v21'],
    cleanSession: true,
    reconnect: true,
    interval: 2000,
    debug: true,
  }

  constructor() {
    console.log('Test Constructor')
    this.websock = this.createWs()
    this.websock.onopen = function (openEvent) {
      console.log('open')
    }
    this.websock.onmessage = function (messageEvent) {
      console.log(messageEvent.data)
    }
    this.websock.onclose = function (closeEvent) {
      console.log('WebSocket wurde geschlossen')
    }
  }

  private createWs() {
    const url = new URL(
      `${this.options.url}/display/${this.options.displayNumber}?serial=${this.options.displaySerial}&session=${this.options.displayNumber}:${this.sessionId}`,
    )
    return new WebSocket(url, this.options.protocol)
  }
}
