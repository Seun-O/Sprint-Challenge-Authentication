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
  try {
    const user = req.body;
    if (!user.password || !user.username) {
      res
        .status(400)
        .json({ message: "Please include a username and password" });
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
  } catch (err) {
    res.status(500).json({ err, message: "Internal server error." });
  }
}

async function login(req, res) {
  // implement user login
  try {
    const body = req.body;
    if (!body.username || !body.password) {
      res.status(400).json({ message: "Username and password required." });
    } else {
      const user = await db.getUser(body.username);
      if (!user) {
        res
          .status(401)
          .json({ message: "Enter a valid username or password." });
      }
      if (user && bcrypt.compareSync(body.password, user.password)) {
        res.status(202).json({ message: "Logged in successfully" });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal server error." });
  }
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
