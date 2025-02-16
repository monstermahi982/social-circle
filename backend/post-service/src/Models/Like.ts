import { Schema, model, ObjectId } from "mongoose";

interface IAction {
  action: number;
  userId: Schema.Types.ObjectId | IAction;
  postId: Schema.Types.ObjectId | IAction;
  isBlock: boolean;
}

const actionSchema = new Schema<IAction>(
  {
    action: {
      type: Number,
      enum: [0,1,2],
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

export const Action = model<IAction>("Action", actionSchema);