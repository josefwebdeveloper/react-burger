export interface User {
    email: string;
    password?: string;
    name?: string;
}
export interface UserResponse {
    success: boolean
    user: User
    accessToken: string
    refreshToken: string
}
export interface UserRequest {
    email: string;
    password: string;
}

