import { useQuery } from "@apollo/client";
import React from "react";
import Swal from "sweetalert2";
import { getPosts } from "../graphql/Query";
import moment from "moment";
import Social from "../assets/images/social.png";
import { Link } from "react-router-dom";
import ErrorNotification from "../components/ErrorNotification";
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";
const Home = ({ login }) => {
  const { data, loading, error, refetch } = useQuery(getPosts);
  const arr = [1, 2, 3, 4, 5, 5, 6, 6, 8, 7, 7, 6];
  if (!login) {
    return (
      <div className="grid grid-cols-2 my-32 px-5 items-center gap-2">
        <div>
          <img src={Social} alt="" />
        </div>
        <div>
          <span className="text-2xl">Please Login / Signup to Continue..</span>
        </div>
      </div>
    );
  }
  if (loading)
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
  if (error) {
    <ErrorNotification />;
  }
  return (
    <>
      <div className="py-5 ml-10 mr-44 ">
        <AddPost refetch={refetch} />
      </div>
      <div className="flex gap-3 py-1 ml-10 w-5/6 overflow-x-scroll">
        {data?.getTags?.map((item, i) => (
          <div
            className="rounded-3xl p-1 border capitalize text-sm"
            style={{ minWidth: "100px", textAlign: "center" }}
          >
            {item.name}
          </div>
        ))}
      </div>
      {data?.getPosts?.map((item, i) => (
        <PostCard item={item} key={i} i={i} refetch={refetch} />
      ))}
    </>
  );
};

export default Home;
