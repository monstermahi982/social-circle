import Joi from "joi";

// Input DTOs with validation schemas
export const CreatePostDto = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string(),
  userId: Joi.number(),
  actionItems: Joi.any(),
});

export const UpdatePostDto = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string(),
  userId: Joi.number(),
  actionItems: Joi.any(),
});

// TypeScript types derived from schemas
export type CreatePostDtoType = z.infer<typeof CreatePostDto>;
export type UpdatePostDtoType = z.infer<typeof UpdatePostDto>;

// Response DTOs
export interface PostResponseDto {
  title: number;
  description: string;
  userId: string;
  actionItems: any;
  isVerified: boolean;
  isBlocked: boolean;
}

export interface PostListResponseDto {
  posts: PostResponseDto[];
  total: number;
}
