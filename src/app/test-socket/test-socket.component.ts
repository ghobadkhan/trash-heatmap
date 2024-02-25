import { Component, OnInit } from '@angular/core';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-test-socket',
  templateUrl: './test-socket.component.html',
  styleUrls: ['./test-socket.component.scss']
})
export class TestSocketComponent implements OnInit {

  constructor(private socket: RealtimeService) {}

  protected message:string = ""
  protected response:string = ""

  ngOnInit(): void {
    this.message = "Echo!"
    this.sendMessage()
    let channel = Math.floor(Math.random() * 1000).toString()
    console.log(`Channel is ${channel}`)
    this.getMessage(channel)
  }
  
  
  sendMessage() {
    this.socket.sendMessage(this.message)
  }

  getMessage(channel:string) {
    this.socket.getMessage(channel).subscribe(msg => {
      console.log(msg)
      this.response = ""
    })
  }
}
