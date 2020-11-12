const Post = require('../../models/Post');
const {AuthenticationError} = require('apollo-server');
const checkAuth = require('../../util/checkAuth');
const {validatePostInput} = require('../../util/validators');
const {UserInputError} = require('apollo-server');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({createdAt: -1});

                for (const [key, value] of Object.entries(posts)) {
                    if (value.isPrivate === true) {
                        delete posts[key];
                    }
                }

                return posts;
            } catch (err) {
                throw new Error((err));
            }
        },
        async getPost(_, {postId}) {
            try {
                const post = await Post.findById(postId);
                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found')
                }
            } catch (e) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        async createPost(_, {postInput: { body, isPrivate, importance, color, flag, repetitionType, repetitionRange}}, context) {
            const user = checkAuth(context);

            const {valid, errors} = validatePostInput(body, isPrivate, importance, color, flag, repetitionType, repetitionRange);
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const createdDate = new Date().toISOString();
            const newPost = new Post({
                body,
                isPrivate,
                importance,
                color,
                flag,
                repetitionType,
                repetitionRange,
                createdAt: createdDate,
                updatedAt: createdDate,
                user: user.id,
                username: user.username,
            })

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            });

            return post;
        },
        async deletePost(_, {postId}, context) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);
                if (user.username === post.username) {
                    await post.delete();
                    return 'Post deleted'
                } else {
                    throw new AuthenticationError('Action is not allowed')
                }
            } catch (e) {
                throw new Error(e);
            }
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, {pubsub}) => pubsub.asyncIterator('NEW_POST')
        }
    }
};

