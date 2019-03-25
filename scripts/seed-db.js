const { Prisma } = require("prisma-binding");

const db = new Prisma({
  secret: process.env.PRISMA_MANAGEMENT_API_SECRET,
  endpoint: process.env.PRISMA_ENDPOINT
});

module.exports = db;
