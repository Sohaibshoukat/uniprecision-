import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      const data = await response.json();
      if (response.ok) {
        if (data.role == 'Admin') {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("adminID", data.userid)
          setEmail('')
          setPassword('')
          showAlert('Login Success', 'success');
          navigate("/admin-dashboard/");
        } else {
          showAlert('Email and Password In-correct', 'danger')
        }
      } else {
        showAlert(data.error, 'danger')
      }
    } catch (error) {
      console.log(error)
      showAlert(error.error, 'danger');
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="./assets/Logo.png"
          alt="Image Logo"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <form onSubmit={handleLogin} className="flex flex-col gap-2">
            {/* Email input */}
            <input
              className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
              type="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
            />
            {/* Password input */}
            <input
              className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
              type="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            {/* Forgot password link */}
            {/* <div className="mt-4 flex justify-between font-semibold text-sm">
              <Link
                className="text-blue-600 hover:text-blue-700 text-xl font-Para hover:underline hover:underline-offset-4"
                to={'/forgetpassword'}
              >
                Forgot Password?
              </Link>
            </div> */}
            {/* Login button */}
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 text-xl font-Para hover:bg-blue-700 px-4 py-2 text-white uppercase rounded tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
};

export default Login;
