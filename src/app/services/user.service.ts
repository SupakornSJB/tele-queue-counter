import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { UserDTO } from '../dto/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private socketService: SocketService,
  ) { }

  createUser(info: UserDTO) {
    this.socketService.socket.emit("user:auth", info, () => this.syncAll());
  }

  syncAll() {
    this.socketService.socket.emit("sync-all");
  }
}
