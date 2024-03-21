import { Link } from "react-router-dom";


export default function SignupPage() {
    return (
        <>
            <section className=" h-screen flex flex-col lg:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 md:items-center my-2 mx-5 md:mx-0 md:my-0">
                <div className="md:w-1/3 max-w-sm">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image"
                    />
                </div>
                <div>
                    <div className="text-center md:text-left">
                        <label className="my-10 font-Para text-3xl font-bold">Register to get Access</label>
                    </div>
                    <div className="flex flex-col gap-2 my-5 xl:my-10">
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="You Name"
                            />
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Organisation"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="tel"
                                placeholder="Mobile Number"
                            />
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Email Address"
                            />
                        </div>
                        <input
                            className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                            type="text"
                            placeholder="Address Line 1"
                        />
                        <input
                            className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                            type="text"
                            placeholder="Address Line 2"
                        />
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Postcode"
                            />
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="City"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-2">
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="State"
                            />
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Country"
                            />
                        </div>
                        <input
                            className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                            type="password"
                            placeholder="Password"
                        />
                        <div className="text-center md:text-left">
                            <button
                                className="mt-4 bg-blue-600 text-xl font-Para hover:bg-blue-700 px-4 py-2 text-white uppercase rounded  tracking-wider"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 font-semibold  font-Para text-lg text-slate-500 text-center md:text-left">
                        Already Have have an account?{" "}
                        <Link
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            to="/login"
                        >
                            Sign-In
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
}