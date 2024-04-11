import { Photo } from "./photo";

export interface User {
    username: string;
    email: string;
    gender:string,
    password: string;
    photos: Photo[];
    _id?: string;
    created_at: string;
    updatedAt: string;
    __v: number;
}

export interface UserForLogin {
    email: string,
    password: string,
}
export interface UserForAuth {
    username: string;
    email: string;
    password: string;
    id: string;
  }
  export interface ProfileDetails {
    username: string;
    email: string;
    gender:string;
  }
