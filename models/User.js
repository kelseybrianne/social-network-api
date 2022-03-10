const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            // unique
            unique: true,
            required: true,
            // trimmed
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // Must match a valid email address (Mongoose's matching validation)
            match: '/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/'
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        // Create a virtual called friendCount that retrieves the length of the user's friends array field on query
        toJSON: {
            virtuals: true
        }
    }
);

userSchema
  .virtual('friendCount')
  .get(function() {
      return this.friends.length;
  })

const User = model('user', userSchema);
module.exports = User;

