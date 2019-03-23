const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/mutations');
const Query = require('./resolvers/queries');
const db = require('db');

// Create the graphql Yoga Server
function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    },
    context: req => ({
      ...req, db
    })
  });
}

module.exports = createServer;
