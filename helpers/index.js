const db = require("../database/dbConfig");

const getUser = username => {
  return db("users")
    .where({ username })
    .first();
};

const addUser = user => {
  return db("users").insert(user);
};

// const execute = async () => {
//   try {
//     const data = await getUser("mwindu");
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// execute();

module.exports = {
  getUser,
  addUser
};
