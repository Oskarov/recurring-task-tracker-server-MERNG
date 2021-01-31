const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const {isBasicString} = require('../../util/validators');
const {UserInputError, AuthenticationError} = require('apollo-server');

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context) {
            const { username } = checkAuth(context);

            const {valid, errors} = isBasicString({name: 'body', value: body} );
            
            if (!valid) {
                throw new UserInputError('Errors', {errors});
            }

            const post = await Post.findById(postId);

            if (post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()
                });
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not exists');
            }
        },
        async deleteComment(_, {postId, commentId}, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            if (post){
              const commentIndex = post.comments.findIndex(element => element.id == commentId);

              if (post.comments[commentIndex].username === username) {
                  post.comments.splice(commentIndex, 1);
                  await post.save();
                  return post;
              } else {
                  throw new AuthenticationError('Action not allowed');
              }
            } else {
                throw new UserInputError('Post not exists');
            }

        },
        async likePost(_, {postId}, context) {
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);

            if (post) {
                if (post.likes.find(like=> like.username === username)){
                    //for unlike
                    post.likes = post.likes.filter(like => like.username != username);
                } else {
                    post.likes.unshift({
                        username,
                        createdAt: new Date().toISOString(),
                    })
                }
                await post.save();
                return post;
            } else {
                throw new UserInputError('Post not exists');
            }
        }
    }
}