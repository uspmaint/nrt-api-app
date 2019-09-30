import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import { Event } from '../model/client-enums';

import * as socketIo from 'socket.io-client';
import { Outputs } from '../model/outputs';

const SERVER_URL = 'http://10.100.1.130:4223';

@Injectable()
export class SocketService {
    private socket;

    public initSocket(): void {
      
        this.socket = socketIo(SERVER_URL);
        console.log(' socket init id %s' , this.socket.id);
    }

    public send(message: Outputs, id: number): void {
        console.log( 'send socket m: %s' , message);
        this.socket.emit('outputs', message, id);
    }

    public onMessage(): Observable<Outputs> {
        return new Observable<Outputs>(observer => {
            this.socket.on('outputs', (data: Outputs) => observer.next(data));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}