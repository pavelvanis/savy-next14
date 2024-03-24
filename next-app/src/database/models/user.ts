import * as z from "zod";
import mongoose, { Model, Schema, Document } from "mongoose";
import { User } from "@/types/zod/mongoose";

const ZodUser = z.object({
  name: z.string(),
});

interface IUserMethods {}

const UserSchema: Schema = new Schema<User, {}, IUserMethods>(
  {
    user_id: {
      type: String,
      unique: true,
      required: [true, "User ID is required"],
    },
    first_name: {
      type: String,
      required: [true, "Name is required"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel as Model<User, {}, IUserMethods>;
