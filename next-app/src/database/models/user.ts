import bcrypt from "bcrypt";
import mongoose, { Model, Schema } from "mongoose";
import { User } from "@/types/zod/mongoose";

interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<User, {}, IUserMethods>(
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

// Compare password
UserSchema.methods.comparePassword = async function (password: string) {
  console.log("comparing password", password, this);
  return await bcrypt.compare(password, this.password);
};

// Hash password before saving
UserSchema.pre("save", async function (next) {
  console.log("hashing password", this);
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const UserModel = mongoose.models.user || mongoose.model("user", UserSchema);

export default UserModel as Model<User, {}, IUserMethods>;
