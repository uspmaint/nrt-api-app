import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import { Event } from '../model/client-enums';

import * as socketIo from 'socket.io-client';
import { Outputs } from '../model/outputs';
import { environment } from 'src/environments/environment';
import { Inputs } from '../model/inputs';

const SERVER_URL = 'http://192.168.11.10:4223';

@Injectable()
export class SocketService {
    private socket;
    public url:string
    
    public setURL(url: string){
        this.url = url;
    }

    constructor(){
        this.socket = socketIo(environment.ws_url);
    }

    public initSocket(): void {
      
        
       
    }

    public send(message: Inputs, simulate:boolean): void {
        console.log( 'send socket m: %s' , message);
        this.socket.emit('inputs', message,simulate);
    }

    public onData(): Observable<Outputs> {
        return new Observable<Outputs>(observer => {
            
            this.socket.on('outputs', (data: Outputs) => {
              
                observer.next(data)
              
                
            });
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}