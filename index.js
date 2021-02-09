const {ApolloServer, PubSub} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const Post = require('./models/Post');
const User = require('./models/User');

const resolvers = require('./graphql/resolvers/index');
const {MONGODB} = require('./config');

const pubsub = new PubSub();
const PORT = process.env.PORT || 5000

const server = new ApolloServer(
    {typeDefs, resolvers, context: ({req}) => ({req, pubsub})}
)

mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoDB connected');
        return server.listen({port: PORT});
    })
    .then(res => {
        console.log(`server running at ${res.url}`);
    })
    .catch(err => {
        console.error(err);
    })