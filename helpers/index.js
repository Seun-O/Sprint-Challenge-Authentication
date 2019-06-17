const db = require("../database/dbConfig");

const find = () => {
  return db("users");
};

const addUser = user => {
  return db("users").insert(user);
};

const execute = async () => {
  try {
    const data = await find();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

execute();

module.exports = {
  find,
  addUser
};
