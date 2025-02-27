const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    playerName:String,
    score:Number
});

const Score = mongoose.model("Score", scoreSchema, "Player");

module.exports = Score;