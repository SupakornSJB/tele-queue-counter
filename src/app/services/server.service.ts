import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { CreateServerDTO, PublicServerDTO, ServerIdDTO } from '../dto/server';
import { SyncAllResponse } from '../dto/base';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _servers: Map<string, PublicServerDTO> = new Map();

  constructor(private socketService: SocketService) {
    this.socketService.socket.on("server:create", (info: PublicServerDTO) => this.onCreateServer(info));
    this.socketService.socket.on("server:delete", (info: ServerIdDTO) => this.onDeleteServer(info));
    this.socketService.socket.on("sync-all", (info: SyncAllResponse) => this.onSync(info));
  }

  get servers() {
    return this.convertServerMapToArr(this._servers);
  }

  createServer(info: CreateServerDTO) {
    this.socketService.socket.emit("server:create", info);
  }

  deleteServer(serverId: string) {
    this.socketService.socket.emit("server:delete", new ServerIdDTO(serverId));
  }

  saveAndDelete(info: ServerIdDTO) {
    this.socketService.socket.emit("server:save-and-delete", info)
  }

  onCreateServer(info: PublicServerDTO) {
    this._servers.set(info.id, info);
  }

  onDeleteServer(info: ServerIdDTO) {
    this._servers.delete(info.id);
  }

  onSync(info: SyncAllResponse) {
    info.servers.forEach((server) => {
      this._servers.set(server.id, server);
    })
  }

  convertServerMapToArr(serverMap: Map<string, PublicServerDTO>) {
    return Array.from(serverMap.values());
  }
}
