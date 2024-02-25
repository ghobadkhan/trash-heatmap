import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client'
import { SOCKET_HOST } from 'src/env';

interface ResponseMessage {
  response: 'authenticated' | 'error',
  api_token?: string
}

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  private message$ = new Subject<ResponseMessage>()
  constructor () {}

  private socket = io(SOCKET_HOST)
  
  
  public sendMessage(msg:string) {
    this.socket.emit('test_event',msg)
  }

  public getMessage(channel:string) {
    this.socket.on(channel, (msg) => {
      this.message$.next(msg)
      this.socket.off(channel)
    })

    return this.message$.asObservable()
  }

}
