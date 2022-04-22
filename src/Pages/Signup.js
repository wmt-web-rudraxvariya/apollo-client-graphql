import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { delete_cookie, setCookie } from "../utils/cookie";

const Signup = ({ setLogin }) => {
  const SIGNUP_USER = gql`
    mutation (
      $email: String!
      $username: String!
      $confirmPassword: String!
      $password: String!
    ) {
      register(
        registerInput: {
          username: $username
          email: $email
          password: $password
          confirmPassword: $confirmPassword
        }
      ) {
        id
        email
        username
        token
      }
    }
  `;
  const [userData, setUserData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState(null);
  const [ferror, setFerror] = React.useState("");
  const [addUser] = useMutation(SIGNUP_USER);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    addUser({
      variables: userData,
    })
      .then((val) => {
        console.log("val", val);
        setLoading(false);
        setData(val?.data?.register);
        delete_cookie("token");
        delete_cookie("UName");
        delete_cookie("UID");
        //set cookie for 1 day
        setCookie("UID", val?.data?.register?.id, 1);
        setCookie("UName", val?.data?.register?.username, 1);
        setCookie("token", val?.data?.register?.token, 1);
        setLogin(true);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setFerror(err.message);
      });
  };
  if (loading)
    return (
      <div className="flex justify-center align-middle pt-20">
        <svg
          role="status"
          class="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  if (data) {
    Swal.fire({
      title: "Success!",
      text: "You have successfully registered in!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/");
    });
  }
  if (ferror) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: ferror,
    }).then(() => {
      setFerror("");
    });
  }

  // const PrevFile = (e) => {
  //   console.log("asd", e.target.files);
  //   setImag(e.target.files[0]);
  //   console.log("imag", e.target.files);
  //   console.log("type imag", typeof imag);
  // };
  return (
    <>
      <div className="flex justify-center pt-14 ">
        <form
          className={`${loading ? "loading " : ""}w-5/6`}
          onSubmit={(e) => handleSubmit(e)}
        >
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Username
            </label>
            <input
              type="username"
              name="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              onChange={(e) => {
                setUserData({
                  ...userData,
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-6">
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              email
            </label>
            <input
              type="email"
              name="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              onChange={(e) => {
                setUserData({
                  ...userData,
                  email: e.target.value,
                });
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
              name="password"
              placeholder="*******"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => {
                setUserData({
                  ...userData,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Confirm password
            </label>
            <input
              placeholder="*******"
              type="password"
              name="confirmPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={(e) => {
                setUserData({
                  ...userData,
                  confirmPassword: e.target.value,
                });
              }}
            />
            {/* <input type="file" onChange={(e) => PrevFile(e)} /> */}
          </div>

          <button
            type="submit"
            class="text-white bg-blue-700 mb-10 block hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
      {Object.keys(ferror).length > 0 && (
        <div className="my-10 p-10 border-red-400 border mx-24 text-red-600">
          <ul>
            {Object.values(ferror).map((err) => (
              <li className="list-disc" key={err}>
                {err}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Signup;
