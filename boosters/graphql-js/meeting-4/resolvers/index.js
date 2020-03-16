const resolvers = {
  Date: require('./date'),
  Mutation: require('./mutation'),
  Query: require('./query'),
  Repository: require('./repository'),
  RepositoryCollaboratorsEdge: require('./repository-collaborators-edge'),
  User: require('./user'),
};

module.exports = resolvers;
