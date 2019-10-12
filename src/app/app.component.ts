import { Component } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { Outputs } from './shared/model/outputs';
import { Event } from './shared/model/client-enums';

const SERVER_URL = 'http://10.100.1.130:4223';

@Component({
  selector: 'tcc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'API TEST';
  ioConnection: any;
  simulate =false;
  status:string;

  constructor(private socketService: SocketService) {
    console.log('constructor');
    this.initIoConnection();
    this.socketService.setURL(SERVER_URL);
  }
  private initIoConnection(): void {
    console.log('init socket');
    this.socketService.initSocket();
  //   let outputs: Outputs = {
  //     ready: 0,
  //     fault: 0,
  //     airok: 0,
  //     interlock: 0,
  //     estop: 0
  // };
    this.ioConnection = this.socketService.onData()
      .subscribe((data: Outputs) => {
        console.log( 'data.ready:%s', data.ready);
        if (data.ready==1){
          this.status = 'RUNNING'
        }
        if (data.ready==0){
          this.status = 'STOPPED'
        }
        if (data.fault==1){
          this.status = 'FAULT'
        }
        if (data.interlock==0){
          this.status = 'INTERLOCK'
        }
        if (data.estop==0){
          this.status = 'ESTOP'
        }

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
    this.socketService.send('start',this.simulate)
  }
  stop() {
    console.log('stop');
    this.socketService.send('stop',this.simulate)
  }
  reset() {
    console.log('reset');
    this.socketService.send('reset',this.simulate)
  }
}
