import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { ADD_POST } from "../graphql/Query";
import Loader from "./Loader";

const AddPost = ({ refetch }) => {
  const [bodyData, setBodyData] = useState({
    body: "",
    tags: "",
  });
  const [addPost] = useMutation(ADD_POST);
  const [loading, setLoading] = useState(false);
  const handleAddPost = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      addPost({
        variables: bodyData,
      })
        .then((val) => {
          setLoading(false);
          Swal.fire({
            title: "Success!",
            text: "Post added succesfully!",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            refetch();
          });
        })
        .catch((err) => {
          setLoading(false);
          Swal.fire({
            title: "Error!",
            text: err.message,
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    } catch {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;
  return (
    <form id="formm" onSubmit={(e) => handleAddPost(e)}>
      <div className="py-10 w-full  rounded-xl dark:bg-gray-900 bg-gray-100 ">
        <div className="flex px-5 items-center gap-2">
          <div>
            <img
              src="https://picsum.photos/200/200"
              alt=""
              className="w-16 h-10 rounded-full"
            />
          </div>
          <div className="w-full">
            <input
              type="username"
              id="email"
              class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="what's on your mind?"
              required
              autoComplete="off"
              onChange={(e) => {
                setBodyData({
                  ...bodyData,
                  body: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <input
              type="text"
              class="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="tags"
              required
              autoComplete="off"
              onChange={(e) => {
                setBodyData({
                  ...bodyData,
                  tags: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddPost;
