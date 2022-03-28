import Mongoose from "mongoose";

const { Schema } = Mongoose;

const traillistSchema = new Schema({
    name: String,
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

export const Traillist = Mongoose.model("Traillist", traillistSchema);