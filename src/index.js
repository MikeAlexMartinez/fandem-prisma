require('dotenv-safe').config();
const createServer = require('./create-server');
const db = require('./db');

const server = createServer();

// User cookie parser

// user middleware to fetch current user

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL,
  },
}, deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
