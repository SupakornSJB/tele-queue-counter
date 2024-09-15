import { ServerIdDTO } from "./server";

export class CreateTrafficDTO {
  readonly serverId: string;
}

export class TrafficIdDTO {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class TrafficDTO extends TrafficIdDTO {
  readonly server: ServerIdDTO;
  readonly isWaiting: boolean;
  readonly creationTime: Date;

  constructor(id: string, serverId: string, isWaiting: boolean, creationTime: Date) {
    super(id);
    this.server = new ServerIdDTO(serverId);
    this.isWaiting = isWaiting;
    this.creationTime = creationTime;
  }
}

export class TrafficDTOIncludeOwnership extends TrafficDTO {
  readonly isOwner: boolean;

  constructor(id: string, serverId: string, isWaiting: boolean, isOwner: boolean, creationTime: Date) {
    super(id, serverId, isWaiting, creationTime);
    this.isOwner = isOwner;
  }
}

