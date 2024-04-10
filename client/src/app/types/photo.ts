import { User } from './user';

export interface Photo {
  title?: string;
  image?: string;
  description?: string;
  category?: string;
  _id?: string;
  like?: { liked: boolean; likesCount: number };
  likes?: { userId: string }[];
  owner?: User;
  likesCount?:number;
  postId?: string;
  userId?: User;
}

export interface PhotoCreate {
  title: string;
  description: string;
  category: string;
  image: string;
}

export interface Like {
  liked: boolean;
  likesCount: number;
}
