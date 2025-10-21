
export interface UserRequest {
    name: string;
    phone: string;
    gender: string;
    birth_date: string;
    is_kdm: boolean;
}

export interface UserResponse {
    name: string;
    phone: string;
    role: string;
}

export interface LoginRequest {
    name: string;
    phone: string;
}

export interface LoginResponse {
    id: string;
    name: string;
    phone: string;
    role: string;
}