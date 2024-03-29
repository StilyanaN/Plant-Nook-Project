export interface User {
    username: string;
    email: string;
    password: string;
    photos: string[];
    _id: string;
}

export interface UserForLogin {
    email: string,
    password: string,
    error?: string
}
export interface UserForAuth {
    email?: string,
    userId?: string,
    username?: string,
    error?: string
}