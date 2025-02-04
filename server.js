const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connecting to database
const DB = process.env.DATABASE;
mongoose.connect(DB, {}).then(() => console.log('DB connection successful!'));

// server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`server running on port ${port} -> http://127.0.0.1:${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDELED REJECTION ❌');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION ❌');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
