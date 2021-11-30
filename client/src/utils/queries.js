import { gql } from '@apollo/client';

export const POSTS = gql`
    query Posts{
        posts{
            message
            author
        }
    }
`;