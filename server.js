///////////////////////////////
// DEPENDENCIES
////////////////////////////////
// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 3000
const { PORT = 3000, DATABASE_URL } = process.env;
// import express
const express = require("express");
// create application object
const app = express();
// import mongoose
const mongoose = require("mongoose");
// import middlware
const cors = require("cors");
const morgan = require("morgan");
///////////////////////////////
// DATABASE CONNECTION
////////////////////////////////
// Establish Connection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  // Connection Events
  mongoose.connection
    .on("open", () => console.log("Connected to Mongoose"))
    .on("close", () => console.log("Disconnected from Mongoose"))
    .on("error", (error) => console.log(error));
///////////////////////////////
// MODELS
////////////////////////////////
const CheeseSchema = new mongoose.Schema({
    name: String,
    countryOfOrigin: String,
    image: String,
  });
  
  const Cheese = mongoose.model("Cheese", CheeseSchema);
  
  ///////////////////////////////
  // MiddleWare
  ////////////////////////////////
  app.use(cors()); // to prevent cors errors, open access to all origins
  app.use(morgan("dev")); // logging
  app.use(express.json()); // parse json bodies
///////////////////////////////
// ROUTES
////////////////////////////////
// create a test route
app.get("/", (req, res) => {
  res.send("wassuppppp");
});
// Cheese INDEX ROUTE
app.get("/cheese", async (req, res) => {
    try {
      // send all the cheese
      res.json(await Cheese.find({}));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // Cheese CREATE ROUTE
  app.post("/cheese", async (req, res) => {
    try {
      // send all the cheese
      res.json(await Cheese.create(req.body));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
// Cheese Update ROUTE
app.put("/cheese/:id", async (req, res) => {
    try {
      // send all the cheese
      res.json(
        await Cheese.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // Cheese Delete ROUTE
  app.delete("/cheese/:id", async (req, res) => {
    try {
      // send all the cheese
      res.json(await Cheese.findByIdAndRemove(req.params.id));
    } catch (error) {
      //send error
      res.status(400).json(error);
    }
  });
  
  // Cheese Show ROUTE
  app.get("/cheese/:id", async (req, res) => {
      try {
        // send all the cheese
        res.json(await Cheese.findById(req.params.id));
      } catch (error) {
        //send error
        res.status(400).json(error);
      }
    });
///////////////////////////////
// LISTENER
////////////////////////////////
app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}...`));