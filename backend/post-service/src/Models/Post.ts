import mongoose, { Schema, Document } from "mongoose";

export interface PostDocument extends Document {
  title: string;
  content: string;
  author: number;
  isPublished: boolean;
  createdAt: Date;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Number, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Post = mongoose.model<PostDocument>("Post", PostSchema);
