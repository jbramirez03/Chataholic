const schema = `
    type Post {
        message: String
        author: String
    }

    input posted {
        message: String
        author: String
    }

    type Mutation {
        addPost(input: posted!): Post
    }

    type Subscription {
        newPost: Post
    }

    type Query {
        posts: [Post]
    }
`;

export default schema;