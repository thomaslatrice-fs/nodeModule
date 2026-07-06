const express = require("express");
const app = express();

app.use(express.json());
//localhost: 3000/

let users = [
  {
    id: 601,
    data: "This is a message!",
  },

  {
    id: 901,
    data: "This is a message!",
  },

  {
    id: 612,
    data: "This is a message!",
  },
];

//actuator/root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Service is up",
    data: "Data goes here",
    metadata: {
      hostname: "localhost",
      method: "GET",
    },
  });
});

//GET all
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

//GET by ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

//POST by ID
app.post("/users", (req, res) => {
  const newUser = {
    id: Date.now(),
    data: req.body.data,
  };
  users.push(newUser);
  res.status(201).json({
    message: "User added",
    user: newUser,
    users: users,
  });
});

//PUT by ID
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }
  users[userIndex] = {
    id: id,
    name: req.body.name,
  };
  res.status(200).json({
    message: "User updated",
    user: users[userIndex],
    users: users,
  });
});

//DELETE by ID
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deleteUser = users.splice(userIndex, 1);

  res.status(200).json({
    message: "User deleted",
    deleteduser: deleteUser[0],
    users: users,
  });
});

module.exports = app;
