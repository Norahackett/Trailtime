import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
    name: String,
    latitude: Number,
    longitude: Number,
    description: String,
    traillistid: {
        type: Schema.Types.ObjectId,
        ref: "Traillist",
    },
});

export const Trail = Mongoose.model("Trail", trailSchema);