import apiClient from '@/src/api/client';
import { ApiErrorResponse, ApiResponse } from '@/src/types/api';
import { LoginRequest, LoginResponse, UserRequest, UserResponse } from '@/src/types/auth';
import { isAxiosError } from 'axios';

export const postAuthRegister = async (newUser: UserRequest): Promise<UserResponse> => {
    try {
        const response = await apiClient.post<ApiResponse<UserResponse>>(`/auth/register`, newUser);

        if (response.status === 201 && response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || '회원가입에 실패했습니다.');
        }

    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData: ApiErrorResponse = error.response.data;
            console.error(`API Error: ${errorData.message} (Status: ${errorData.statusCode})`);
            throw new Error(errorData.message);
        } else {
            console.error('사용자 회원 가입 실패 (네트워크 오류):', error);
            throw new Error('네트워크에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
        }
    }
};

export const postAuthLogin = async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<ApiResponse<LoginResponse>>(`/auth/login`, loginData);

        if (response.status === 201 && response.data.success) {
            return response.data.data;
        } else {
            throw new Error(response.data.message || '로그인에 실패했습니다.');
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            const errorData: ApiErrorResponse = error.response.data;
            console.error(`API Error: ${errorData.message} (Status: ${errorData.statusCode})`);
            throw new Error(errorData.message || '로그인 중 오류가 발생했습니다.');
        } else {
            console.error('로그인 실패 (네트워크 오류):', error);
            throw new Error('네트워크에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
        }
    }
};