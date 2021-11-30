import { gql } from '@apollo/client';

export const POST_MESSAGE = gql`
mutation AddPost($message: String!, $author: String!){
    addPost(message: $message, author: $author){
        author
        message
    }
}
`;