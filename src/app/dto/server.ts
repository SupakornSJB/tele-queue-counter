export class ServerIdDTO {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export class CreateServerDTO extends ServerIdDTO {
  readonly name: string;

  constructor(id: string, name: string) {
    super(id);
    this.name = name;
  }
}

export class PublicServerDTO extends CreateServerDTO {
  readonly creationTime: Date;
  readonly isActive: boolean;
}
