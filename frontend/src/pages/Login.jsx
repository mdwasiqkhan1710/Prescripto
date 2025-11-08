import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      //If User is trying to Register
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          setName("");
          setEmail("");
          setPassword("");

          setState("Login");
          toast.success(
            "Registered successfully! Login to your account to continue."
          );
        } else {
          toast.error(data.message);
        }
      } else {
        //If user is trying to Login
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate("/");
          scrollTo(0, 0);
          toast.success("Welcome to Prescripto!");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
          state === "Login" ? "md:flex-row-reverse" : "md:flex-row"
        } flex flex-col`}
      >
        {/* ----------------Image Section------------------- */}
        <div
          className={`md:w-1/2 w-full relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 min-h-[300px] md:min-h-full order-1`}
        >
          {/* Image Container with Background */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-8">
            <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
              {/* Sign Up Image */}
              <div
                className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${
                  state === "Sign Up"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <img
                  src={assets.about_image}
                  alt="about-image"
                  className="w-full max-h-[250px] md:max-h-[500px] object-contain drop-shadow-2xl"
                />
              </div>

              {/* Login Image */}
              <div
                className={`absolute inset-0 transition-all duration-700 flex items-center justify-center ${
                  state === "Login"
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }`}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Background shape for the appointment image */}
                  <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-white/20 rounded-full blur-xl"></div>
                  <img
                    src={assets.appointment_img}
                    alt="appointment-image"
                    className="relative w-full h-full max-h-[220px] md:max-h-[500px] object-contain drop-shadow-2xl z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ----------------Form Section------------------- */}
        <div
          className={`md:w-1/2 w-full flex items-center justify-center p-4 md:p-8 order-2`}
        >
          <form onSubmit={onSubmitHandler} className="w-full max-w-md">
            <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-8 rounded-xl text-[#414aafff] text-sm shadow-2xl border border-gray-300 bg-white">
              {/* Header */}
              <div className="text-center mb-2 md:mb-4">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {state === "Sign Up" ? "Create Account" : "Welcome Back"}
                </h2>
                <p className="text-gray-600 mt-2 text-sm md:text-base">
                  {state === "Sign Up"
                    ? "Sign up to book appointments instantly"
                    : "Login to access your account"}
                </p>
              </div>

              {/* Full Name - Only for Sign Up */}
              {state === "Sign Up" && (
                <div className="w-full">
                  <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                    Full Name
                  </label>
                  <input
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                    placeholder="Enter your full name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
              )}

              {/* Email */}
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                  Email Address
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  placeholder="your@email.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              {/* Password */}
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-2 text-sm md:text-base">
                  Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                  placeholder="Enter at least 8 characters"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg mt-2 md:mt-4 text-sm md:text-base"
              >
                {state === "Sign Up" ? "Create Account" : "Login to Account"}
              </button>

              {/* Switch between Login/Sign Up */}
              <div className="text-center mt-4 md:mt-6">
                {state === "Sign Up" ? (
                  <p className="text-gray-600 text-sm md:text-base">
                    Already have an account?{" "}
                    <span
                      onClick={() => setState("Login")}
                      className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-200"
                    >
                      Login here
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-600 text-sm md:text-base">
                    Don't have an account?{" "}
                    <span
                      onClick={() => setState("Sign Up")}
                      className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-200"
                    >
                      Register here
                    </span>
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
