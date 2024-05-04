import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { CreateServerBroadcastResponse, CreateServerRequest, DeleteServerBroadcaseResponse, DeleteServerRequest, IServer, SaveAndDeleteServerRequest } from '../interfaces/server';
import { BehaviorSubject } from 'rxjs';
import { SyncAllDataResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private _servers: Map<string, Omit<IServer, "id">> = new Map();
  public servers: BehaviorSubject<IServer[]> = new BehaviorSubject<IServer[]>([]);

  constructor(private socketService: SocketService) {
    this.socketService.socket.on("server:create", (info: CreateServerBroadcastResponse) => this.onCreateServer(info));
    this.socketService.socket.on("server:delete", (info: DeleteServerBroadcaseResponse) => this.onDeleteServer(info));
    this.socketService.socket.on("sync-all", (info: SyncAllDataResponse) => this.onSync(info));
  }

  createServer(info: CreateServerRequest) {
    this.socketService.socket.emit("server:create", info);
  }

  deleteServer(info: DeleteServerRequest) {
    this.socketService.socket.emit("server:delete", info);
  }

  saveAndDelete(info: SaveAndDeleteServerRequest) {
    this.socketService.socket.emit("server:save-and-delete", info)
  }

  onCreateServer(info: CreateServerBroadcastResponse) {
    console.table(info);
    this._servers.set(info.id, { name: info.name, startTime: info.startTime });
    this.servers.next(this.convertServerToArray());
  }

  onDeleteServer(info: DeleteServerBroadcaseResponse) {
    this._servers.delete(info.id);
    this.servers.next(this.convertServerToArray());
  }

  onSync(info: SyncAllDataResponse) {
    console.log("server: on sync")
    this._servers = this.convertArrayToServer(info.servers);
    console.log(this._servers);
    this.servers.next(info.servers);
  }

  private convertServerToArray() {
    return Array.from(this._servers.entries()).map((entry) => { return { id: entry[0], ...entry[1] } })
  }

  private convertArrayToServer(serverList: IServer[]) {
    const newMap: Map<string, Omit<IServer, "id">> = new Map()
    serverList.forEach((server => {
      return newMap.set(server.id, { name: server.name, startTime: server.startTime })
    }))

    return newMap;
  }
}
