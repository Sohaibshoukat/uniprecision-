import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AlertContext from "../Context/Alert/AlertContext";

const Forgetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const AletContext = useContext(AlertContext);
  const { showAlert } = AletContext;

  const handleForgetPassword = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend.uniprecision.com.my/guest/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setEmail('')
        showAlert('We have update your password with temp password check your email and login with it', 'success');
          navigate("/login");
      } else {
        showAlert(data.error, 'danger')
      }
    } catch (error) {
      showAlert(error.error);
    }
  };

  return (
    <>
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src="./Logo.png"
          alt="Sample image"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center md:text-left">
          <form onSubmit={handleForgetPassword} className="flex flex-col gap-2">
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
            {/* Login button */}
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 text-xl font-Para hover:bg-blue-700 px-4 py-2 text-white uppercase rounded tracking-wider"
                type="submit"
              >
                Send Reuqest
              </button>
            </div>
          </form>

        </div>
        {/* Register link */}
        <div className="mt-4 font-semibold font-Para text-lg text-slate-500 text-center md:text-left">
          Don't have an account?{" "}
          <Link
            className="text-red-600 hover:underline hover:underline-offset-4"
            to="/signup"
          >
            Register
          </Link>
        </div>
      </div>
    </section>
      <div className="w-[100%] text-center">
        <h2>© 2024 Uniprecision Telerad Sdn. Bhd. (1549296-V) | <a href="https://uniprecision.com.my/privacy-policy/">Privacy Policy </a> | <a href="https://uniprecision.com.my/terms-and-conditions/"> Terms and Condition </a></h2>
      </div>
    </>
  );
};

export default Forgetpassword;
