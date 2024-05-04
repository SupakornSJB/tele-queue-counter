import { IServer } from "./server";
import { ITrafficPublic } from "./traffic";

export interface IUser {
  id: string;
  name: string;
  color: string;
}

export type IUserPublic = Omit<IUser, 'id'> & { isOwner: boolean };

export type CreateUserRequest = Omit<IUserPublic, "isOwner">;

export interface CreateUserResponse {
  id: string;
}

export interface DeleteUserRequest {
  id: string;
}

export interface SyncAllDataResponse {
  user: IUserPublic;
  servers: IServer[];
  traffics: ITrafficPublic[];
}
