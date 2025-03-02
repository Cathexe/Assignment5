const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    playerName:String,
    score:Number
});

const Score = mongoose.model("HighScore", scoreSchema);

module.exports = Score;