const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");
const formatDate = require("../utils/formatDate");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Use getter method to format the timestamp on query
      get: timestamp => formatDate(timestamp)
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the reactionSchema
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
  }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema
  .virtual("reactionCount")
  .get(function () {
    return this.reactions.length;
  })

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
