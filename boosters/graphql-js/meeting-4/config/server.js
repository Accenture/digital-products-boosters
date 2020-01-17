require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');
const fs = require('fs');
const resolvers = require('../resolvers');

const schema = fs.readFileSync('./config/schema.graphql');
const typeDefs = gql`
  ${schema}
`;

const context = ({ req }) => req.headers.authorization.split(' ')[1];

const server = new ApolloServer({ context, typeDefs, resolvers });

module.exports = server;
