import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/svg/logoipsum-logo-51.svg";
import logolight from "../../assets/svg/logolight.svg";
import light from "../../assets/svg/white.svg";
import { delete_cookie, getCookie } from "../../utils/cookie";
import "./nav.css";

const Navbar = ({ login, setLogin }) => {
  const [theme, setTheme] = React.useState("Light");
  React.useEffect(() => {
    if (localStorage.getItem("theme") === "Light") {
      document.getElementsByTagName("body")[0].classList.remove("dark");
      setTheme("Light");
    } else {
      document.getElementsByTagName("body")[0].classList.add("dark");
      setTheme("Dark");
    }
  }, []);

  const handleTheme = () => {
    if (theme === "Light") {
      setTheme("Dark");
      document.getElementsByTagName("body")[0].classList.add("dark");
      localStorage.setItem("theme", "Dark");
    } else {
      setTheme("Light");
      document.getElementsByTagName("body")[0].classList.remove("dark");
      localStorage.setItem("theme", "Light");
    }
  };
  return (
    <nav class="bg-gray-200 border-gray-200 px-2 sm:px-4 py-6  dark:bg-neutral-900 ">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <div>
          <Link to="/">
            {theme === "Dark" ? (
              <img src={light} class="mr-3 h-6 sm:h-9" alt="SnapBook Logo" />
            ) : (
              <img
                src={logolight}
                class="mr-3 h-6 sm:h-9"
                alt="SnapBook Logo"
              />
            )}
          </Link>
        </div>
        <div>
          <div className="flex gap-5">
            <label for="toggleB" class="flex items-center cursor-pointer">
              <div class="relative">
                <input
                  type="checkbox"
                  id="toggleB"
                  class="sr-only"
                  onClick={handleTheme}
                />
                <div class="block bg-gray-600 w-10 h-6 rounded-full"></div>
                <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition"></div>
              </div>
              <div class="ml-3 text-gray-700">
                {theme === "Dark" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-brightness-high text-white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                  </svg>
                )}
                {theme === "Light" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    classname="bi bi-moon"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />
                  </svg>
                )}
              </div>
            </label>
            {!login && (
              <>
                <Link
                  to="/login"
                  type="button"
                  class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </Link>
                <Link
                  type="button"
                  class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  to="/signup"
                >
                  Signup
                </Link>
              </>
            )}
            {login && (
              <>
                <Link
                  to="/profile"
                  type="button"
                  class="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Profile
                </Link>
                <button
                  className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    delete_cookie("token");
                    delete_cookie("UName");
                    delete_cookie("UID");
                    setLogin(false);
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
