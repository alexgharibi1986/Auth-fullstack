import { Schema, Types, model } from "mongoose";

export interface IAuthUser {
  password: string;
  email: string;
  id?: Types.ObjectId;
}

const authUserSchema = new Schema<IAuthUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("AuthUsers", authUserSchema);
