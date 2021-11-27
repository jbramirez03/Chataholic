const schema = `
    type Post {
        message: String
        author: String
    }

    type Mutation {
        addPost(message: String!, author: String!): Post
    }

    type Subscription {
        newPost: Post
    }
`;

