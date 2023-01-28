const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config()
const { Schema } = mongoose;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Description = mongoose.model("/description", ProductSchema);

// GET

app.get("/description", (req, res) => {
    Description.find({}, (err, docs) => {
        if (!err) {
            res.send(docs)
        }
        else {
            res.status(500).json({ message: err })
        }
    })
})

//Get by id

app.get("/description/:id", (req, res) => {
    const { id } = req.params;
    Description.findById(id, (err, docs) => {
        if (!err) {
            if (docs) {
                res.send(docs)
            }
            else {
                res.status(404).json({ message: "404 Not Found" })
            }
        }
        else {
            res.status(500).json({ message: err })
        }
    })
})


// Post
app.post("/description", (req, res) => {
    const description = new Description({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
    })
    description.save()
    res.status({message:"SUCCESFULL"})
})

// Delete
app.delete("/description/:id", (req,res) => {
    const {id} = req.params;
    Description.findByIdAndDelete(id,(err)=>{
        if(!err){
            res.send("Delete")
        }
        else{
            res.status(500).json({message:err})
        }
    })
})

// mongoose connected

const PORT = process.env.PORT;
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);

mongoose.connect(DB, (err) => {
    if (!err) {
        console.log("DB CONNECT");
        app.listen(PORT, () => {
            console.log(`PORT ${PORT}`);
        })
    }
})