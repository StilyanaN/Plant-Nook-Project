import { User } from "./user";

export interface Photo {
    title: string;
    image: string;
    description: string;
    category: string;
    likes: string[];
    owner: User; 
    photoId: string;
   
}
