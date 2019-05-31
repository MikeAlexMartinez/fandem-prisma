const connectWithId = id =>
  id
    ? {
        connect: {
          id
        }
      }
    : {
        delete: true
      };

module.exports = {
  connectWithId
};
