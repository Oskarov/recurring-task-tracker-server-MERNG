const {ApolloServer, PubSub} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const Post = require('./models/Post');
const User = require('./models/User');

const resolvers = require('./graphql/resolvers/index');
const {MONGODB} = require('./config');

const pubsub = new PubSub();

const server = new ApolloServer(
    {typeDefs, resolvers, context: ({ req })=> ({ req, pubsub }) }
)

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoDB connected');
        return server.listen({port: 5000})
    })
    .then(res => {
        console.log(`server running at ${res.url}`);
    })