import { Schema, Types, model, Document } from "mongoose";

export interface IAuthUser extends Document {
  password: string;
  email: string;
  tokenVersion: number;
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
