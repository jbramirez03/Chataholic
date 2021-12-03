import Post from '../models/Post.js';

const queries = {
    Query: {
        posts: async (parent, args, context) => {
            const allPosts = await Post.find({});

            return allPosts
        }
    }
}

export default queries;