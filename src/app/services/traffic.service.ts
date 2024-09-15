import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { CreateTrafficDTO, TrafficDTOIncludeOwnership, TrafficIdDTO } from '../dto/traffic';
import { SyncAllResponse } from '../dto/base';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {
  private _traffics: Map<string, TrafficDTOIncludeOwnership> = new Map();

  constructor(private socketService: SocketService) {
    this.socketService.socket.on("traffic:create", (p: TrafficDTOIncludeOwnership) => this.onCreateTraffic(p));
    this.socketService.socket.on("traffic:begin-service", (p: TrafficIdDTO) => this.onTrafficBeginService(p));
    this.socketService.socket.on("traffic:end-service", (p: TrafficIdDTO) => this.onTrafficEndService(p));
    this.socketService.socket.on("traffic:deleted", (p: TrafficIdDTO) => this.onDeleteTraffic(p));
    this.socketService.socket.on("sync-all", (p: SyncAllResponse) => this.onSync(p));
  }

  get traffics() {
    return this.convertTrafficMapToArray(this._traffics);
  }

  createTraffic(info: CreateTrafficDTO) {
    this.socketService.socket.emit("traffic:create", info);
  }

  deleteTraffic(info: TrafficIdDTO) {
    this.socketService.socket.emit("traffic:delete", info)
  }

  beginServiceOnTraffic(info: TrafficIdDTO) {
    this.socketService.socket.emit("traffic:begin-service", info);
  }

  endServiceOnTraffic(info: TrafficIdDTO) {
    this.socketService.socket.emit("traffic:end-service", info);
  }

  onCreateTraffic(info: TrafficDTOIncludeOwnership) {
    this._traffics.set(info.id, info);
  }

  onDeleteTraffic(info: TrafficIdDTO) {
    this._traffics.delete(info.id);
  }

  onTrafficEndService(info: TrafficIdDTO) {
    this.onDeleteTraffic(info);
  }

  onTrafficBeginService(info: TrafficIdDTO) {
    const traffic = this._traffics.get(info.id);
    if (!traffic) throw new Error("Traffic Not Found");
    const trafficCopy = { ...traffic };
    trafficCopy.isWaiting = false;
    this._traffics.set(info.id, trafficCopy);
  }

  onSync(info: SyncAllResponse) {
    info.traffics.forEach((server) => {
      this._traffics.set(server.id, server);
    })
  }

  private convertTrafficMapToArray(traffics: Map<string, TrafficDTOIncludeOwnership>) {
    return Array.from(traffics.values());
  }
}
