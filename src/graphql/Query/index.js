import gql from "graphql-tag";

export const getPosts = gql`
  {
    getPosts {
      id
      body
      created_at
      comments {
        id
        body
        username
        created_at
      }
      likes {
        id
        username
        created_at
      }
      likeCount
      commentCount
      username
    }
    getTags {
      name
    }
  }
`;

export const getUserData = gql`
  {
    getUser {
      id
      username
      email
      created_at
    }
    getUserPost {
      id
      body
      username
      comments {
        id
        body
        username
        created_at
      }
      likes {
        id
        username
        created_at
      }
      likeCount
      commentCount
      tags {
        name
      }
      created_at
    }
  }
`;
export const DELETE_POST = gql`
  mutation ($postId: ID!) {
    deletePost(postId: $postId)
  }
`;
export const ADD_POST = gql`
  mutation ($body: String!, $tags: String!) {
    createPost(body: $body, tags: $tags) {
      id
      body
      username
      created_at
    }
  }
`;
