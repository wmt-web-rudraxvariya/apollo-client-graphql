import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { setCookie } from "../utils/cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = ({ setLogin }) => {
  const [userData, setUserData] = React.useState({
    username: "",
    password: "",
  });
  const LOGIN_USER = gql`
    mutation loginuser($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        id
        email
        username
        token
      }
    }
  `;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loginUser] = useMutation(LOGIN_USER);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser({
      variables: userData,
    })
      .then((val) => {
        setLoading(false);
        setData(val?.data?.login);
        //set cookie for 1 day
        setCookie("UID", val?.data?.login?.id, 1);
        setCookie("UName", val?.data?.login?.username, 1);
        setCookie("token", val?.data?.login?.token, 1);
        setLogin(true);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err.message);
        console.log(err.message);
      });
  };
  if (loading) return <Loader />;
  if (data) {
    Swal.fire({
      title: "Success!",
      text: "You have successfully logged in!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
    });
  }
  if (err) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err,
    }).then((result) => {
      if (result.isConfirmed) {
        setErr(null);
      }
    });
  }
  return (
    <div className="flex justify-center pt-14 ">
      <form className="w-5/6" onSubmit={handleSubmit}>
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Username
          </label>
          <input
            type="username"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
            onChange={(event) => {
              setUserData({ ...userData, username: event.target.value });
            }}
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={(event) => {
              setUserData({ ...userData, password: event.target.value });
            }}
          />
        </div>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
