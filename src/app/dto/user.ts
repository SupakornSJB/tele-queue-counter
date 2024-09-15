export class AuthUserDTO {
  readonly token: string;

  constructor(token: string) {
    this.token = token
  }
}

export class UserDTO {
  readonly name: string;

  constructor(username: string) {
    this.name = username;
  }
}
