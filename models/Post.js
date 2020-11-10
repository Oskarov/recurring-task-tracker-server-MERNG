const {model, Schema} = require('mongoose');

const postSchema = new Schema(
    {
        body: String,
        username: String,
        isPrivate: Boolean,
        importance: Number,
        color:String,
        flag: String,
        repetitionType: Number,
        repetitionRange: Number,
        updatedAt: String,
        createdAt: String,
        failures: Number,
        successes: Number,
        likesCount: Number,
        commentsCount: Number,


        comments: [
            {
                body: String,
                username: String,
                createdAt: String,
                userId: String
            }
        ],
        likes: [
            {
                username: String,
                createdAt: String,
                userId: String
            }
        ],
        user: {
            type: Schema.Types.ObjectID,
            reg: 'users'
        }
    }
)

module.exports = model('Post', postSchema);