import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import React from "react";
import { getCookie } from "./utils/cookie";
import Post from "./Pages/Post";
import ErrPage from "./Pages/404";
import Sidebar from "./Layout/Sidebar";
import Profile from "./Pages/Profile";
import { setContext } from "@apollo/client/link/context";
import RightBar from "./Layout/RightBar";

const httpLink = createHttpLink({
  uri: "https://powerful-reef-94594.herokuapp.com/",
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getCookie("token");
  console.log("token", token);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    if (getCookie("token") !== null) {
      setLogin(true);
    }
  }, []);

  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Navbar login={login} setLogin={setLogin} />
          <div className="grid grid-cols-6 bg-gray-50 dark:bg-gray-800 text-black dark:text-white">
            <div className="col-start-1 col-end-2 hidden md:block bg-gray-300 dark:bg-gray-900 ">
              <Sidebar />
            </div>

            <div className="col-start-1 col-end-7 md:col-start-2 md:col-end-6">
              <main style={{ minHeight: "85vh" }}>
                <Routes>
                  <Route
                    path="/"
                    element={<Home login={login} setLogin={setLogin} />}
                  />
                  <Route path="/profile" element={<Profile login={login} />} />
                  <Route
                    path="/login"
                    element={<Login setLogin={setLogin} />}
                  />
                  <Route
                    path="/signup"
                    element={<Signup setLogin={setLogin} />}
                  />
                  <Route path="/post/:id" element={<Post />} />
                  <Route path="*" element={<ErrPage />} />
                </Routes>
              </main>
            </div>
            <div className="hidden md:block col-span-1 bg-gray-300 dark:bg-gray-900 ">
              <RightBar />
            </div>
          </div>
          <Footer />
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
};

export default App;
