import { z } from "zod";

// Input DTOs with validation schemas
export const CreateUserDto = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  phoneNumber: z.string(),
  type: z.enum(["admin", "user"]),
});

export const UpdateUserDto = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  phoneNumber: z.string().optional(),
});

// TypeScript types derived from schemas
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;

// Response DTOs
export interface UserResponseDto {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  type: string;
  isVerified: boolean;
  isBlocked: boolean;
}

export interface UserListResponseDto {
  users: UserResponseDto[];
  total: number;
}
