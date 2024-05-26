import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);
// The minimize option is set to false to store the empty object in the database if the cartData is empty.if it is not set to false, the empty object will not be stored in the database.

const userModel = mongoose.models.user || mongoose.model("users", userSchema);

export default userModel;
