import { useMutation } from "@apollo/client";
import moment from "moment";
import React from "react";
import {
  COMMENT_POST,
  DELETE_COMMENT_POST,
  LIKE_POST,
} from "../graphql/Mutation";
import { getCookie } from "../utils/cookie";
import { DELETE_POST } from "../graphql/Query";
import Swal from "sweetalert2";
import { Orbit, Waveform } from "@uiball/loaders";

const PostCard = ({ item, i, refetch }) => {
  const [comm, setComm] = React.useState(false);
  const [likePost] = useMutation(LIKE_POST);
  const [commentPost] = useMutation(COMMENT_POST);
  const [deleteComment] = useMutation(DELETE_COMMENT_POST);
  const [commentInput, setCommentInput] = React.useState("");
  const [deletePost] = useMutation(DELETE_POST);
  const [loading, setLoading] = React.useState(false);
  const [cLoading, setCLoading] = React.useState(false);
  const handleLike = (id) => {
    setLoading(true);
    try {
      likePost({
        variables: {
          postId: id,
        },
      })
        .then((val) => {
          console.log(val);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        });
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const handleComment = () => {
    setComm(!comm);
  };
  const checkLike = () => {
    const UName = getCookie("UName");
    const likedPost = item.likes.some((item) => {
      return item?.username === UName;
    });
    return likedPost;
  };
  const checkComment = () => {
    const UName = getCookie("UName");
    const CPost = item.comments.some((item) => {
      return item?.username === UName;
    });
    return CPost;
  };

  const handleUserComment = (id) => {
    setCLoading(true);
    setCommentInput("");
    try {
      commentPost({
        variables: {
          postId: id,
          body: commentInput,
        },
      })
        .then((val) => {
          refetch();
          setCLoading(false);
          console.log(val);
        })
        .catch((err) => {
          setCLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        });
    } catch (err) {
      setCLoading(false);
      console.log(err);
    }
  };
  const deleteUserComment = (itemId, id) => {
    setCLoading(true);
    try {
      deleteComment({
        variables: {
          postId: itemId,
          commentId: id,
        },
      })
        .then((val) => {
          setCLoading(false);
          console.log(val);
          refetch();
        })
        .catch((err) => {
          setCLoading(false);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message,
          });
        });
    } catch (err) {
      setCLoading(false);
      console.log(err);
    }
  };
  const DeleteUserPost = (id) => {
    Swal.fire({
      title: "Do you want to Delete post?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          deletePost({
            variables: {
              postId: id,
            },
          })
            .then((val) => {
              refetch();
              console.log(val);
            })
            .catch((err) => {
              console.log(err.message);
            });
        } catch (err) {
          console.log(err);
        }
        Swal.fire("Deleted Succesfully!", "", "success");
      }
    });
  };
  const CheckDelete = () => {
    const UName = getCookie("UName");
    if (item.username === UName) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div className="flex justify-items-start w-full">
        <div className="shadow-xl rounded-lg dark:bg-gray-900 bg-gray-200 h-auto mx-10 my-5 p-2 md:w-4/5">
          <div>
            <div className="flex justify-between items-center">
              <div className="flex justify-items-start items-center gap-2 ">
                <div className="">
                  <img
                    src="https://picsum.photos/200/200"
                    className="rounded-full w-10 h-10"
                    alt=""
                  />
                </div>
                <div>
                  <div>
                    <p className="text-sm ">{item.username}</p>
                    <p className="text-xs font-light">
                      {moment(item.created_at).format("DD/MM/YYYY")}
                    </p>
                  </div>
                </div>
              </div>
              {CheckDelete() && (
                <div>
                  <button
                    type="button"
                    onClick={() => DeleteUserPost(item.id)}
                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                      <path
                        fill-rule="evenodd"
                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <div className="my-2 pl-2">
              <p>{item.body}</p>
            </div>
            <div>
              <img
                src={`https://picsum.photos/800/450?random=${i}`}
                height="auto"
                width="100%"
                alt=""
              />
            </div>
            <div className="flex gap-5 py-3 px-1 items-center">
              {!loading && (
                <>
                  {!checkLike() && (
                    <>
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-hand-thumbs-up cursor-pointer"
                          viewBox="0 0 16 16"
                          onClick={() => {
                            handleLike(item.id);
                          }}
                        >
                          <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                        </svg>
                        <span className="">{item.likeCount}</span>
                      </div>
                    </>
                  )}
                  {checkLike() && (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="bi bi-hand-thumbs-up-fill cursor-pointer"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          handleLike(item.id);
                        }}
                      >
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                      </svg>
                      <span className="">{item.likeCount}</span>
                    </>
                  )}
                </>
              )}
              {loading && <Orbit size={25} color="white" />}

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-chat-left-text cursor-pointer"
                  viewBox="0 0 16 16"
                  onClick={handleComment}
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                </svg>
                <span className="-mt-1">{item.commentCount}</span>
              </div>
            </div>
            {comm && (
              <div className="w-full py-2  gap-2">
                <div className="flex gap-5">
                  <input
                    type="text"
                    id="comment"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Type comment here..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    required
                  />
                  <button
                    class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => {
                      handleUserComment(item.id);
                    }}
                  >
                    submit
                  </button>
                </div>
                <div className="py-3 flex flex-col gap-3">
                  {item.comments &&
                    !cLoading &&
                    item.comments.map((comment) => (
                      <div className="flex gap-5 items-center justify-between">
                        <div>
                          <div className="flex justify-items-start items-center gap-2 ">
                            <div className="">
                              <img
                                src="https://picsum.photos/200/200"
                                className="rounded-full w-10 h-10"
                                alt=""
                              />
                            </div>
                            <div>
                              <div>
                                <p className="text-sm ">{comment.username}</p>
                                <p className="text-xs font-light">
                                  {moment(comment.created_at).format(
                                    "DD/MM/YYYY"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <span className="text-sm">{comment.body}</span>
                        </div>
                        {checkComment() && (
                          <div>
                            <button
                              type="button"
                              onClick={() =>
                                deleteUserComment(item.id, comment.id)
                              }
                              class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  {cLoading && <Orbit size={25} color="white" />}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
