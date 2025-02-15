export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  type: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
  isVerified: boolean;
  isBlocked: boolean;
}
