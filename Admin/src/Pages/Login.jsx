import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const [Email, setEmail] = useState(null)

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="./draw2.webp"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <label className="my-10 font-Para text-3xl font-bold">Sign in to get Access</label>
        </div>
        <div className="flex flex-col gap-2 my-10">
          <input
            className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
            type="text"
            value={Email}
            onChange={(e) => { setEmail(e.target.value) }}
            placeholder="Email Address"
          />
          <input
            className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
            type="password"
            placeholder="Password"
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <a
              className="text-blue-600 hover:text-blue-700 text-xl font-Para hover:underline hover:underline-offset-4"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 text-xl font-Para hover:bg-blue-700 px-4 py-2 text-white uppercase rounded  tracking-wider"
              type="submit"
              onClick={() => {
                sessionStorage.setItem('token', "1452");
                navigate("/")
              }}
            >
              Login
            </button>
          </div>
        </div>
        <div className="mt-4 font-semibold  font-Para text-lg text-slate-500 text-center md:text-left">
          Don&apos;t have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;