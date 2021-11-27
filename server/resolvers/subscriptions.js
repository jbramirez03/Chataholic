// import { Post } from '../models/index.js';
import pubsub from '../server.js';

const subscriptions = {
    Subscription: {
        newPost: {
            // More on pubsub below
            subscribe: () => pubsub.asyncIterator(['POST_MESSAGE']),
        },
    },
};

export default subscriptions;