import { useQuery, gql } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const Post = (props) => {
  const { id } = useParams();
  const GET_POST = gql`
    query {
      getPost(postId: "${id}") {
        id
        username
        created_at
        body
        comments {
          id
          body
          username
          created_at
        }
        likes {
          id
          username
        }
        likeCount
        commentCount
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POST);
  const arr = [1, 2, 3, 4, 5, 5, 6, 6, 8, 7, 7, 6];

  if (loading) {
    return (
      <>
        <div className="flex gap-4 px-10 flex-wrap">
          {arr.map(() => {
            return (
              <div class="border mt-10 border-gray-300 shadow rounded-md p-4 max-w-sm w-1/3 mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  console.log("data", data);
  return (
    <div>
      Post<h1>Hello</h1>
    </div>
  );
};

export default Post;
