const axios = require("axios");
const bcrypt = require("bcryptjs");

const { authenticate } = require("../auth/authenticate");
const db = require("../helpers");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body;
  if (!user.password || !user.username) {
    res.status(400).json({ message: "Please include a username and password" });
  }

  if (user.password.length < 8) {
    res.status(406).json({ message: "Password length too short." });
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    user.username = user.username.toLowerCase();
    const data = await db.addUser(user);
    res.status(201).json({ data, message: "User successfully created!" });
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
