import Post from '../models/index.js';
import { pubsub } from '../server.js';

const mutations = {
    Mutation: {
        addPost: async (parent, args, context) => {
            const addedPost = await Post.create(args.input);
            pubsub.publish('POST_MESSAGE', {
                newPost: addedPost,
            });

            return addedPost;
        }
    }
}

export default mutations;