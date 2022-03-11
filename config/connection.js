const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/shelterDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;