const connectWithId = id =>
  countryId
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
