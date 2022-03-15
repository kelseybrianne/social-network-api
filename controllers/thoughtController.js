const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Video created, but found no user with that ID",
            })
          : res.json("Created the video 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.where({ _id: req.params.id })
      .update(req.body)
      .then((updatedThoughtData) => res.json(updatedThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.deleteOne({ _id: req.params.id })
      .then((deletedThoughtData) => res.json(deletedThoughtData))
      .catch((err) => res.status(500).json(err));
  },
};
