import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }
}, { timestamps: true });

const User = mongoose.models.AuthUser || mongoose.model("AuthUser", userSchema);

export default User;