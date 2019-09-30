import { Component } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { Outputs } from './shared/model/outputs';
import { Event } from './shared/model/client-enums';

@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'API TEST';
  ioConnection: any;

  constructor(private socketService: SocketService) {
    console.log('constructor');
    this.initIoConnection();
  }
  private initIoConnection(): void {
    console.log('init socket');
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Outputs) => {

      });


    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });

    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }
  start() {
    console.log('start');
    this.socketService.send('start' ,1)
  }
  stop() {
    console.log('stop');
    this.socketService.send('stop',2)
  }
  reset() {
    console.log('reset');
    this.socketService.send('reset',3)
  }
}
