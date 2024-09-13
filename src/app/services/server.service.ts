import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject } from 'rxjs';
import { CreateServerDTO, PublicServerDTO, ServerIdDTO } from '../dto/server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _servers: Map<string, Omit<PublicServerDTO, "id">> = new Map();
  public servers: BehaviorSubject<PublicServerDTO[]> = new BehaviorSubject<PublicServerDTO[]>([]);

  constructor(private socketService: SocketService) {
    this.socketService.socket.on("server:create", (info: CreateServerDTO) => this.onCreateServer(info));
    this.socketService.socket.on("server:delete", (info: ServerIdDTO) => this.onDeleteServer(info));
    this.socketService.socket.on("sync-all", (info: SyncAllDataResponse) => this.onSync(info));
  }

  createServer(info: CreateServerDTO) {
    this.socketService.socket.emit("server:create", info);
  }

  deleteServer(info: ServerIdDTO) {
    this.socketService.socket.emit("server:delete", info);
  }

  saveAndDelete(info: ServerIdDTO) {
    this.socketService.socket.emit("server:save-and-delete", info)
  }

  onCreateServer(info: CreateServerDTO) {
    this._servers.set(info.id, { name: info.name, startTime: info.startTime });
    this.servers.next(this.convertServerToArray());
  }

  onDeleteServer(info: ServerIdDTO) {
    this._servers.delete(info.id);
    this.servers.next(this.convertServerToArray());
  }

  onSync(info: SyncAllDataResponse) {
    this._servers = this.convertArrayToServer(info.servers);
    this.servers.next(info.servers);
  }

  private convertServerToArray() {
    return Array.from(this._servers.entries()).map((entry) => { return { id: entry[0], ...entry[1] } })
  }

  private convertArrayToServer(serverList: PublicServerDTO[]) {
    const newMap: Map<string, Omit<PublicServerDTO, "id">> = new Map()
    serverList.forEach((server => {
      return newMap.set(server.id, { name: server.name, startTime: server.startTime })
    }))

    return newMap;
  }
}
