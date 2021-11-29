import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
    subscription onNewPost {
      newPost {
        message
        author
      }
    }
  `

