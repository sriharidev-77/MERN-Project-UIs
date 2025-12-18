import "../assets"
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";


const Login = () => {

    const [show, setShow] = useState(false);

    return (

        <>

            <div className="min-h-screen flex items-center justify-center bg-[url('./assets/leaf_2.jpg')] bg-cover bg-center bg-no-repeat " >

                <div className="
                w-[90%] 
                text-center 
                rounded-2xl bg-transparent
                backdrop-blur-xl 
                shadow-2xl 
                text-white 
                flex flex-col items-center
                xl:w-[40%]  md:w-[60%] sm:w-[70%]">

                    <h1 className=" 
                    font-semibold mb-16 mt-10 text-4xl
                    bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 
                    bg-clip-text 
                    text-transparent">

                        Welcome

                    </h1>

                    <input
                        type="text"
                        placeholder="Enter the Email"
                        className="
                        m-auto
                        w-[80%]  
                        mb-10 px-4
                        rounded-lg text-black 
                        outline-2px 
                        h-14
                        bg-white 
                        focus:outline-none focus:ring-3 focus:ring-green-500 "
                    />


                    <div className="relative w-[80%] mb-5">

                        <input
                            type={show ? "text" : "password"}
                            placeholder="Enter the Password"
                            className="
                                w-full
                                px-4 
                                pr-12
                                h-14
                                rounded-lg
                                text-black
                                bg-white
                                focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="button"

                            onClick={() => setShow(!show)}

                            className="
                            absolute
                            inset-y-0
                            right-0
                            flex
                            items-center
                            px-4 
                            focus:outline-none"
                        >
                            {show ? (
                                <FaEye className="text-green-500 text-2xl" />
                            ) : (
                                <FaEyeSlash className="text-red-500 text-2xl" />
                            )}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="w-[80%] mb-6 text-right">
                        <a
                            href="/forgot-password"
                            className="
                                text-sm font-medium
                                text-white
                                hover:text-black 
                                hover:font-extrabold
                                transition-colors duration-200
                                underline-offset-4 hover:underline
                                "
                        >
                            Forgot password ?
                        </a>
                    </div>


                    <button className="
                   
                     rounded-4xl 
                     mt-10 mb-10 
                     flex items-center justify-center 
                     p-0.5
                     font-medium
                     rounded-base bg-linear-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600">

                        <a href="" className="
                        text-xl m-auto 
                        relative 
                        px-8 py-2.5 
                        font-bold">

                            Sign in

                        </a>

                    </button>

                    <p className="w-[80%] text-lg text-center tracking-wider font-extralight">

                        Don't have an account ?

                        <a href="" className="
                        bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400  
                         bg-clip-text 
                         text-transparent
                          font-bold ml-2">

                            Sign up

                        </a>

                    </p>


                    <button className="bg-white px-6 py-3.5 flex mt-10 items-center gap-5 rounded-2xl mb-15 font-semibold">

                        <FcGoogle className="text-4xl" />
                        <a href=""><p className="text-black">Sign in with Google</p></a>

                    </button>


                </div>
            </div>
        </>

    )
}

export default Login