import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Notification from "../components/notify/Notification";
import { AppContext } from "../Context/AppContext";
import { SERVER_DOMAIN } from "../utils/Constaint";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function Login({ setIsLogin }) {
  const { notify, setNotify } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${SERVER_DOMAIN}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      if (resJson.status === 200) {
        localStorage.setItem("token", resJson.access_token);
        console.log("Login Successfully");
        console.log(resJson.access_token);
        setIsLogin(true);
        setNotify("");
        navigate("/");
      } else {
        setMessage(resJson.message);
        console.log(resJson.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const responseMessage = (response) => {
    console.log(response);
    const user = jwt_decode(response.credential);
    console.log(user);
  };
  const errorMessage = (error) => {
    setMessage(error);
  };
  return (
    <section className="h-screen">
      <div className="relative px-6 h-full text-gray-800 z-0">
        {notify !== "" && <Notification message={notify} type="success" />}
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form>
              <div
                id="login-with-google"
                className="flex flex-row items-center justify-center"
              >
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
              </div>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  name="email"
                  onChange={handleEmail}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  name="password"
                  onChange={handlePassword}
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label className="form-check-label inline-block text-gray-800">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-gray-800">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
                  </Link>
                </p>
              </div>
              {message ? (
                <div
                  className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base red-yellow-700"
                  role="alert"
                >
                  {message}
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
