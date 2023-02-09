import mongoose from "mongoose";

const weatherSchema = new mongoose.Schema({
    temp: String,
    conditions: String
})

export default mongoose.model("Weather", weatherSchema)