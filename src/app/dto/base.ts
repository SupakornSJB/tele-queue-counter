import { PublicServerDTO } from "./server";
import { TrafficDTOIncludeOwnership } from "./traffic";

export class SyncAllResponse {
  servers: PublicServerDTO[];
  traffics: TrafficDTOIncludeOwnership[];

  constructor(servers: PublicServerDTO[], traffics: TrafficDTOIncludeOwnership[]) {
    this.servers = servers;
    this.traffics = traffics;
  }
}
