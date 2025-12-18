import "../assets";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[url('./assets/leaf_2.jpg')] bg-cover bg-center bg-no-repeat">
        <div
          className="
            w-[90%]
            text-center
            rounded-2xl bg-transparent
            backdrop-blur-xl
            shadow-2xl
            text-white
            flex flex-col items-center
            xl:w-[40%] md:w-[60%] sm:w-[70%]
          "
        >
          <h1
            className="
              font-semibold mb-12 mt-10 text-4xl
              bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 
              bg-clip-text text-transparent
            ">

            Create Account

          </h1>


          {/*---------------------------- Name ----------------------------------*/}

          <input
            type="text"
            placeholder="Enter your Name"
            className="
              w-[80%]
              mb-8 px-4
              h-14
              rounded-lg
              text-black
              bg-white
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          {/* ------------------------- Email ----------------------------------- */}

          <input
            type="email"
            placeholder="Enter your Email"
            className="
              w-[80%]
              mb-8 px-4
              h-14
              rounded-lg
              text-black
              bg-white
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          {/* ---------------------------- Address --------------------------------*/}

          <textarea
            placeholder="Enter your Address"
            rows={3}
            className="
              w-[80%]
              mb-8 px-4 py-3
              rounded-lg
              text-black
              bg-white
              resize-none
              focus:outline-none focus:ring-2 focus:ring-green-500
            "
          />

          {/*------------------------------ Password ---------------------------------*/}

          <div className="relative w-[80%] mb-8">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              className="
                w-full px-4 pr-12 h-14
                rounded-lg text-black bg-white
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
            <button

              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-4"
            >

              {showPassword ? (
                <FaEye className="text-green-500 text-2xl" />
              ) : (
                <FaEyeSlash className="text-red-500 text-2xl" />
              )}

            </button>
          </div>

          {/*--------------------------- Confirm Password ---------------------*/}

          <div className="relative w-[80%] mb-10">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              className="
                w-full px-4 pr-12 h-14
                rounded-lg text-black bg-white
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute inset-y-0 right-0 flex items-center px-4"
            >
              {showConfirm ? (
                <FaEye className="text-green-500 text-2xl" />
              ) : (
                <FaEyeSlash className="text-red-500 text-2xl" />
              )}
            </button>
          </div>

          {/*---------------------------- Register Button --------------------------*/}

          <button
            className="
              mt-6 mb-8
              p-0.5 rounded-4xl
              bg-linear-to-br from-green-400 to-blue-600
              t
            "
          >
            <span className="block px-10 py-3 text-xl font-bold">
              <a href="">
                Register
              </a>
            </span>
          </button>

          <p className="w-[80%] text-lg tracking-wider font-extralight mb-6">

            Already have an account?

            <a href="" className="bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 
            bg-clip-text text-transparent
            ml-2 font-extrabold">

              Sign in
              
            </a>

          </p>

          {/*------------------------------ Google Signup -------------------------------*/}

          <button className="bg-white px-6 py-3.5 flex items-center gap-5 rounded-2xl mb-10 font-semibold">

            <FcGoogle className="text-4xl" />

            <p className="text-black">

                <a href="">

                  Sign up with Google

                </a>

            </p>

          </button>
        </div>
      </div>
    </>
  );
};

export default Register;