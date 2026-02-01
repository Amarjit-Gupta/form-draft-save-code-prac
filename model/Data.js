import mongoose from "mongoose";

const userFormSchema = new mongoose.Schema(
    {
        // kis user ka form (cookie auth)
        user: { type: mongoose.Schema.Types.ObjectId, ref: "AuthUser", required: true, unique: true },
        name: { type: String, default: "" },
        email: { type: String, default: "" },
        password: { type: String, default: "" },
        // multiselect dropdown
        country: { type: [String], default: [] },
        // checkbox (multiple hobbies)
        hobbies: { type: [String], default: [] },
        // radio button true / false (public)
        isActive: { type: Boolean, default: true },
        // multi-step support
        currentStep: { type: Number, default: 1 },
        // draft or final submit
        status: { type: String, enum: ["draft", "submitted"], default: "draft" }
    },
    { timestamps: true }
);

const Data = mongoose.models.UserForm || mongoose.model("UserForm", userFormSchema);
export default Data;
