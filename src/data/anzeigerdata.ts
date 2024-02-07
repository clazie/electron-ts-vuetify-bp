//import ws, { WebSocketServer } from "ws"
import {v4 as uuidv4} from 'uuid'

const options = {
  url: `wss://hades.konzeptpark.de/rnv-dfi/`,
  displayNumber: 17047,
  displaySerial: "RNV-17047",
  protocol: ["nuerp-v21"],
  cleanSession: true,
  reconnect: true,
  interval: 2000,
  debug: true
}

//https://wiki.selfhtml.org/wiki/JavaScript/WebSocket/WebSockets_im_Browser

export class Hello{
  websock: WebSocket
  sessionId = uuidv4()

  constructor(){
    console.log('Test Constructor')
    this.websock = this.createWs()
    this.websock.onopen = function(openEvent){
      console.log('open')
    }
    this.websock.onmessage = function(messageEvent) {
      console.log(messageEvent.data);
   };
   this.websock.onclose = function(closeEvent) {
      console.log("WebSocket wurde geschlossen");
   };  }

  private createWs() {
    const url = new URL(`${options.url}/display/${options.displayNumber}?serial=${options.displaySerial}&session=${options.displayNumber}:${this.sessionId}`)
    return new WebSocket(url, options.protocol)
  }


}
