import { Schema, model, ObjectId } from "mongoose";

interface IComment {
  comment: string;
  userId: Schema.Types.ObjectId | IComment;
  postId: Schema.Types.ObjectId | IComment;
  isBlock: boolean;
}

const commentSchema = new Schema<IComment>(
  {
    comment: {
      type: String,
      required: true,
    },

    isBlock: {
      type: Boolean,
      default: false,
      required: false,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);