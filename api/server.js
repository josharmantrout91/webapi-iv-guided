const express = require("express");
const helmet = require("helmet");

const db = require("../data/db.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", async (req, res) => {
  try {
    const shoutouts = await db("shoutouts");
    const messageOfTheDay = process.env.MOTD || "Ayyo World! Whaddup!";
    res.status(200).json({ motd: messageOfTheDay, shoutouts });
  } catch (error) {
    console.log("\nERROR", error);
    res.status(500).json({
      errorMessage: "Sorry, aint got no messages or shoutouts for yall"
    });
  }
});

server.post("/", async (req, res) => {
  try {
    const [id] = await db("shoutouts").insert(req.body);
    const shoutouts = await db("shoutouts");

    res.status(201).json(shoutouts);
  } catch (error) {
    console.error("\nERROR", error);
    res.status(500).json({ error: "Cannot add the shoutout" });
  }
});

module.exports = server;
