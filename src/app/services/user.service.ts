import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { CreateUserRequest } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private socketService: SocketService,
  ) { }

  createUser(info: CreateUserRequest) {
    this.socketService.socket.emit("user:auth", info, () => this.syncAll());
  }

  syncAll() {
    this.socketService.socket.emit("sync-all");
  }
}
