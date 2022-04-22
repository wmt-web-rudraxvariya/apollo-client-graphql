import React from "react";
import Avt from "../assets/images/profile.png";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../graphql/Query";
import { useQuery } from "@apollo/client";
import Loader from "../components/Loader";
import ErrorNotification from "../components/ErrorNotification";
import moment from "moment";
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";

const Profile = ({ login }) => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(getUserData);
  refetch();

  const [viewAll, setViewAll] = React.useState(4);
  if (!login) {
    return navigate("/login");
  }
  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <ErrorNotification />
        {navigate("/")}
      </>
    );

  const handleViewAll = () => {
    if (viewAll <= 4) {
      setViewAll(data?.getUserPost.length);
    } else {
      setViewAll(4);
    }
  };
  return (
    <div>
      <div className="relative">
        <div style={{ minHeight: "178px" }}>
          <img
            src="https://picsum.photos/900/150?random=0"
            className="w-full"
            alt=""
          />
        </div>
        <div
          className="absolute text-center -bottom-16"
          style={{ left: "45%" }}
        >
          <img src={Avt} alt="" className="h-32 w-32 rounded-full" />
          <span className="mt-2 text-lg">{data.getUser[0].username}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 px-10 my-28 gap-5">
        <div className="col-span-1 rounded-3xl py-6 px-4 shadow-xl dark:bg-gray-900 bg-gray-200  h-60">
          <span className="text-lg">About</span>
          <div className="flex justify-between mt-5 items-center ">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <span className="font-light text-sm">Username</span>
            </div>
            <div>
              <span className="text-sm">{data.getUser[0].username}</span>
            </div>
          </div>
          <div className="flex justify-between mt-5 items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <span className="font-light text-sm">E-mail</span>
            </div>
            <div>
              <span className="text-sm">{data.getUser[0].email}</span>
            </div>
          </div>
          <div className="flex justify-between mt-5 items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
              <span className="font-light text-sm">Created At</span>
            </div>
            <div>
              <span className="text-sm">
                {moment(data.getUser[0].created_at).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="ml-10">
            <span className="text-xl ">Your Posts</span>
            {data?.getUserPost.length === 0 && (
              <div className="flex flex-col">
                <span className="text-lg ">No posts yet</span>
                <div className="mr-17 mt-4 ml-0">
                  <AddPost refetch={refetch} />
                </div>
              </div>
            )}
          </div>
          {data?.getUserPost.length > 0 && (
            <div className="mr-24  mt-4 ml-10">
              <AddPost />
            </div>
          )}
          {data?.getUserPost?.map((item, i) => {
            if (i < viewAll) {
              return (
                <>
                  <PostCard item={item} key={i} i={i} refetch={refetch} />
                </>
              );
            }
            return null;
          })}

          {data?.getUserPost.length > 4 && (
            <div className="flex justify-center my-5">
              <button
                onClick={handleViewAll}
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {viewAll <= 6 ? "View All" : "Show less"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
