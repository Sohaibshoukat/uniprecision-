import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StateData } from "../Constants/StateData";
import AlertContext from "../Context/Alert/AlertContext";


export default function SignupPage() {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate = useNavigate()


    const [name, setName] = useState("");
    const [organization, setOrganization] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("Malaysia");
    const [role, setRole] = useState("");
    const [Type, setType] = useState("");

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Send POST request to signup API endpoint
            const response = await fetch("http://localhost:3000/guest/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    organization,
                    mobile_number: mobileNumber,
                    email,
                    password,
                    address_line1: addressLine1,
                    address_line2: addressLine2,
                    postcode,
                    city,
                    state,
                    country,
                    role,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setName("");
                setOrganization("");
                setMobileNumber("");
                setEmail("");
                setPassword("");
                setAddressLine1("");
                setAddressLine2("");
                setPostcode("");
                setCity("");
                setState("");
                setCountry("");
                setRole("");
                navigate("/login")
                showAlert(data.message, 'success')
            } else {
                showAlert(data.error, 'danger')
            }
        } catch (error) {
            // Handle error response
            showAlert(error.error, 'danger')
            // Display error message to the user
        }
    };


    return (
        <>
            <section className="h-screen w-[80%] flex flex-col lg:flex-row justify-between space-y-10 md:space-y-0 md:space-x-16 md:items-center my-2 md:my-0  m-auto">
                <div className="hidden md:block basis-[40%]">
                    <img
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        alt="Sample image"
                    />
                </div>
                <div className="basis-[55%]">
                    <div className="text-center md:text-left">
                        <label className="my-10 font-Para text-3xl font-bold">Register to get Access</label>
                    </div>
                    <div className="flex flex-col gap-2 my-5 xl:my-10">
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <select
                                    name=""
                                    id="type"
                                    value={Type}
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="">Select Type</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Organization">Organization</option>
                                </select>
                            </div>
                            {Type=='Organization'&&<input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Organization"
                                value={organization}
                                required
                                onChange={(e) => setOrganization(e.target.value)}
                            />}
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="tel"
                                    placeholder="Mobile Number"
                                    required
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="text"
                                    placeholder="Email Address"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Address Line 1"
                                required
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                            />
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="text"
                                placeholder="Address Line 2"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                            <div className="flex flex-col md:flex-row gap-2">
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="text"
                                    required
                                    placeholder="Postcode"
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value)}
                                />
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="text"
                                    placeholder="City"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row gap-2">
                                <select
                                    name=""
                                    id="state"
                                    value={state}
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">Select State</option>
                                    {StateData.map((item, index) => (
                                        <option value={item} key={index}>{item}</option>
                                    ))}
                                </select>
                                <input
                                    className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                    type="text"
                                    placeholder="Malaysia"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>
                            <input
                                className="text-lg w-full px-4 py-2 text-black border border-solid border-gray-500 rounded-lg"
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-row gap-2">
                                    <input
                                        type="radio"
                                        id="Radiologist"
                                        value="radiologist"
                                        checked={role === "radiologist"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="Radiologist" className="text-lg font-Para">Radiologist</label>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <input
                                        type="radio"
                                        id="Doctor"
                                        value="doctor"
                                        checked={role === "doctor"}
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                    <label htmlFor="Doctor" className="text-lg font-Para">Doctor</label>
                                </div>
                            </div>
                            <div className="text-center md:text-left">
                                <button
                                    className="mt-4 bg-blue-600 text-xl font-Para hover:bg-blue-700 px-4 py-2 text-white uppercase rounded tracking-wider"
                                    type="submit"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4 font-semibold font-Para text-base md:text-lg text-slate-500 text-center md:text-left">
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
    );
}