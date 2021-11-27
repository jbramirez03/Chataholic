import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
    message: {
        type: String
    },
    author: {
        type: String
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
