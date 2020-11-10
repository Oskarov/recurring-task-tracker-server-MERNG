const {gql} = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        isPrivate: Boolean!
        importance: Int!
        color:String!
        flag: String!
        repetitionType: Int!
        repetitionRange: Int!
        updatedAt: String!
        createdAt: String!
        failures: Int!
        successes: Int!
        comments: [Comment]!,
        likes: [Like]!
        commentsCount: Int!
        likesCount: Int!
    }
    type Comment{
        id: ID!
        createdAt: String!
        username: String!
        body: String!
    }
    type Like{
        id: ID!
        createdAt: String!
        username: String!
    }
    type User{
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String
    }
    type Query{
        getPosts: [Post]
        getPost(postId: ID!): Post
    }
    input RegisterInput{
        username: String!
        password: String!
        confirmedPassword: String!
        email: String!
    }
    input PostInput{
        body: String!
        isPrivate: Boolean
        importance: Int
        color:String
        flag: String
        repetitionType: Int
        repetitionRange: Int
    }
    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(postInput: PostInput): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }
    type Subscription{
        newPost: Post!
    }
`;