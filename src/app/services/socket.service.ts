import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  public isReady: Subject<boolean> = new Subject<boolean>();

  constructor(public socket: Socket) {
    this.isReady.next(false);
    socket.on("connect", () => {
      this.isReady.next(true);
      console.log("Hello, Socket")
    });
  }
}
