const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const mongodb = require('mongodb').MongoClient;

const cwd = process.cwd();

// const connectionStringURI = `mongodb://localhost:27017/socialNetworkDB`;

const PORT = 3001;
const app = express();
// let db;

// mongodb.connect(
//     // Defines connection between app and MongoDB instance
//     connectionStringURI,
//     // Sets connection string parser and Server Discover and Monitoring engine to true and avoids warning
//     { useNewUrlParser: true, useUnifiedTopology: true },
//     (err, client) => {
//       // Use client.db() constructor to add new db instance
//       db = client.db();
//       app.listen(port, () => {
//         console.log(`Example app listening at http://localhost:${port}`);
//       });
//     }
//   );

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });
  });