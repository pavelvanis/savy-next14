import { IUser } from "@/types/types";
import bcrypt from "bcrypt";
import mongoose, { Model, Schema } from "mongoose";

interface User extends IUser, mongoose.Document {
  password: string;
}

interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<User,{}, IUserMethods>(
  {
    // Tink properties
    permanentUserId: {
      type: String,
      unique: true,
      required: [true, "Permanent User ID is required"],
    },
    // User credentials
    firstName: {
      type: String,
      required: [true, "Name is required"],
    },
    lastName: {
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

/**
 * Asynchronously compares the provided password with the user's hashed password.
 */
UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel as Model<User, {}, IUserMethods>;
