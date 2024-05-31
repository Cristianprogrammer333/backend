import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const tasKSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
    },
    {
        versionKey: false,
        timestamp: true,
    }
);
tasKSchema.plugin(mongoosePaginate);
export default model("task", tasKSchema);