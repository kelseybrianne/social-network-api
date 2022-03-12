const { Schema, model } = require("mongoose");

var validateEmail = function(email) {
    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email)
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique
      unique: true,
      required: true,
      // trimmed
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // Must match a valid email address (Mongoose's matching validation)
      validate: [validateEmail, 'Please provide a valid email address'],
      match: [
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        "Please provide a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Array of _id values referencing the User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);
module.exports = User;
