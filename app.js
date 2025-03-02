const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

const Score = require("./models/HighScore");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const mongoURI = "mongodb://localhost:27017/scores";
mongoose.connect(mongoURI);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", ()=>{
    console.log("Connected to MongoDB Database");
});

app.get("/score", async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }); 
        console.log("Scores Retrieved:", scores); 
        res.json(scores);
    } catch (err) {
        console.error("Database Fetch Error:", err); 
        res.status(500).json({ error: "Failed to get score." });
    }
});

app.post("/addtolist", async (req,res)=>{
    try{
        const {playerName, score} = req.body;
        console.log(playerName);
        const newHighScore = new Score({playerName, score});
        const saveScore = await newHighScore.save()

        res.redirect("/")
        console.log(saveScore)
    }catch(err){
        res.status(501).json({error:"Failed to add new score."});
    }
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
});

app.get("/highscores", (req, res) => {
    res.sendFile(path.join(__dirname, "highscores.html"));
});

app.listen(port,function(){
    console.log(`Server is running on port: ${port}`)
});