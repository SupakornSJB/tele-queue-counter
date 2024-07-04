import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import {
  CreateTrafficBroadcastResponse,
  CreateTrafficRequest,
  DeleteTrafficBroadcastResponse,
  DeleteTrafficRequest,
  ITrafficPublic,
  SaveAndDeleteTrafficRequest,
  UpdateTrafficBroadcastResponse,
  UpdateTrafficRequest
} from '../interfaces/traffic';
import { BehaviorSubject } from 'rxjs';
import { SyncAllDataResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {
  private _traffics: Map<string, Omit<ITrafficPublic, "id">> = new Map();
  public traffics: BehaviorSubject<ITrafficPublic[]> = new BehaviorSubject<ITrafficPublic[]>([]);

  constructor(private socketService: SocketService) {
    this.socketService.socket.on("traffic:create", (p: ITrafficPublic) => this.onCreateTraffic(p));
    this.socketService.socket.on("traffic:delete", (p: DeleteTrafficBroadcastResponse) => this.onDeleteTraffic(p));
    this.socketService.socket.on("traffic:update", (p: UpdateTrafficBroadcastResponse) => this.onUpdateTraffic(p));
    this.socketService.socket.on("sync-all", (p: SyncAllDataResponse) => this.onSync(p));
  }

  createTraffic(info: CreateTrafficRequest) {
    this.socketService.socket.emit("traffic:create", info);
  }

  deleteTraffic(info: DeleteTrafficRequest) {
    this.socketService.socket.emit("traffic:delete", info)
  }

  saveAndDelete(info: SaveAndDeleteTrafficRequest) {
    this.socketService.socket.emit("traffic:save-and-delete", info);
  }

  updateTraffic(info: UpdateTrafficRequest) {
    this.socketService.socket.emit("traffic:update", info);
  }

  onCreateTraffic(info: CreateTrafficBroadcastResponse) {
    this._traffics.set(info.id, {
      startTime: info.startTime,
      serverId: info.serverId,
      note: info.note,
      owner: info.owner,
      isWaiting: info.isWaiting,
    })
    this.traffics.next(this.convertTrafficToArray());
  }

  onDeleteTraffic(info: DeleteTrafficBroadcastResponse) {
    this._traffics.delete(info.id);
    this.traffics.next(this.convertTrafficToArray());
  }

  onUpdateTraffic(info: UpdateTrafficBroadcastResponse) {
    this._traffics.set(info.change.id, info.change);
    this.traffics.next(this.convertTrafficToArray());
  }

  onSync(info: SyncAllDataResponse) {
    this._traffics = this.convertArrayToTraffic(info.traffics);
    this.traffics.next(info.traffics);
  }

  private convertTrafficToArray() {
    return Array.from(this._traffics.entries()).map((entry) => { return { id: entry[0], ...entry[1] } })
  }

  private convertArrayToTraffic(trafficList: ITrafficPublic[]) {
    const newMap: Map<string, Omit<ITrafficPublic, "id">> = new Map()
    trafficList.forEach((traffic) => {
      newMap.set(traffic.id, { serverId: traffic.serverId, startTime: traffic.startTime, note: traffic.note, owner: traffic.owner, isWaiting: traffic.isWaiting })
    })
    return newMap;
  }
}
