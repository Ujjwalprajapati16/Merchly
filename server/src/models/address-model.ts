import mongoose from "mongoose";
import type { address } from "../types/Address-types.ts";

const addressSchema = new mongoose.Schema<address>({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressLine1: {
        type: String,
        required: true,
    },
    addressLine2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export default mongoose.model<address>("Address", addressSchema);