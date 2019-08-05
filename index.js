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
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

//FIND BY ID
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;

  users
    .findById(id)
    .then(singleUser => {
      if (!singleUser) {
        res.status(404).json("The user with the specified ID does not exist.");
      }
      res.status(200).json(singleUser);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  if (!userInfo.name) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
  if (!userInfo.bio) {
    return res
      .status(400)
      .json({ message: "Please provide name and bio for the user." });
  }
  users
    .insert(userInfo)
    .then(newUser => {
      res.status(201).json(newUser);
      console.log(userInfo.name);
    })
    .catch(error => {
      res.status(500).json({
        message: "There was an error while saving the user to the database"
      });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.name || !changes.bio ) {
    return res.status(400).json({message: "Please provide name and bio for the user"})
}

  users
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } 
      if(!updated) {
        res.status(404).json({ message: "The user with the specified ID does not exist" });
      }
      
    })
    .catch(error => {
      res.status(500).json({ message: "The user information could not be modified" });
    });
});


server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  users
    .remove(id)
    .then(user => {
        if (user){
            res.status(200).json({ message: "User deleted" })}
         
      else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

server.listen(port, () => {
  console.log("API running");
});
