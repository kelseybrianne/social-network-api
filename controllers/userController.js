const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET a single user by its _id and populated thought and friend data
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      // Populates the thoughts property so it is not just an array of ObjectIDs. Now it contains all of the information for each thought as well. (Thoughts have been added in thoughtController.js line 23 in the createThought method)
      .populate("friends")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update user by its id
  updateUser(req, res) {
      User.where({ _id: req.params.userId })
        .update(req.body)
        .then((updatedUserData) => res.json(updatedUserData))
        .catch((err) => res.status(500).json(err));
  },
  // remove user by its id
  deleteUser(req, res) {
      User.deleteOne({_id: req.params.userId})
        .then((deletedUserData) => res.json(deletedUserData))
        .catch((err) => res.status(500).json(err));
  }
};
