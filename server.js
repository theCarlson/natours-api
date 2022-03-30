// server.js for things other than those used with Express
const colors = require('colors');
const connectDB = require('./db');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...'.red.bold);
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

connectDB();

const port = process.env.PORT || 8000;

// Start Server:
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`.brightCyan);
});

// Handle All Unhandled Rejected Promises in Async Code:
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION, Shutting down...'.red.bold);
  console.log(err.name.red.underline, err.message.red.underline);
  server.close(() => {
    process.exit(1);
  });
});
