// implement your API here

const express = require("express");
const server = express();
const port = 8000;
server.use(express.json());
const users = require("./data/db");

server.get("/", (req, res) => {
  res.send("GET working");
});

// FIND
server.get("/api/users", (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "Error from fetching all users" });
    });
});

//FIND BY ID
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  users
    .findById(id)
    .then(singleUser => {
      res.status(200).json(singleUser);
    })
    .catch(error => {
      res.status(500).json({ message: "Failed to find specific user" });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  users
    .insert(userInfo)
    .then(newUser => {
      res.status(200).json(newUser);
    })
    .catch(error => {
      res.status(500).json({ message: "Error - POST did not work" });
    });
});

server.put("/api/users/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    users
      .update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: "User not found" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Error, PUT failed" });
      });
  });

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  users
    .remove(id)
    .then(user => {
      res.status(200).json({ message: "User deleted" });
    })
    .catch(error => {
      res.status(500).json({ message: "User NOT deleted" });
    });
});



server.listen(port, () => {
  console.log("API running");
});
