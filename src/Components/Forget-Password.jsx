import "../assets";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState(1); // 1 = email, 2 = otp

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email) return;
    // 🔐 API call goes here
    setStep(2);
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-[url('./assets/leaf_2.jpg')]
        bg-cover bg-center bg-no-repeat
      "
    >
      <div
        className="
          w-[90%]
          xl:w-[40%] md:w-[60%] sm:w-[70%]
          rounded-2xl backdrop-blur-xl bg-transparent
          shadow-2xl text-white text-center p-5
          overflow-hidden
        "
      >
        {/* Title */}
        <h1
          className="w-[90%] m-auto
            p-5 text-4xl font-semibold mb-10
            bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400
            bg-clip-text text-transparent
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]
          "
        >
          Forgot Password
        </h1>

        {/* ---------------- STEP 1: EMAIL ---------------- */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="flex flex-col items-center">
            <p className="mb-6 text-lg font-light">
              Enter your registered email to receive OTP
            </p>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="
                w-full h-14 px-4 mb-8
                rounded-lg text-black bg-white
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
              required
            />

            <button className="p-0.5 rounded-full bg-linear-to-br from-green-400 to-blue-600 mb-6">
              <span className="block px-10 py-3 font-bold text-xl">
                Send OTP
              </span>
            </button>
          </form>
        )}

        {/* ---------------- STEP 2: OTP ---------------- */}
        {step === 2 && (
          <div>
            <p className="mb-8 text-lg font-light">
              Enter the 6-digit OTP sent to
              <span
                className="
                  block mt-2 font-semibold text-black
                  break-all sm:wrap-break-words
                "
              >
                {email}
              </span>
            </p>

            {/* OTP Inputs (Always One Line) */}
            <div className="w-full max-w-sm mx-auto mb-10">

              <div className="flex justify-between gap-1 sm:gap-2">

                {otp.map((digit, index) => (

                  <input

                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="
                      flex-1 min-w-10
                      h-12 sm:h-14
                      text-center text-lg sm:text-xl
                      font-bold rounded-lg
                      text-black bg-white
                      focus:outline-none focus:ring-2 focus:ring-green-500 
                    "
                  />
                ))}
              </div>
            </div>

            <button className="p-0.5 rounded-full bg-linear-to-br from-green-400 to-blue-600">
              <a href="" className="block px-10 py-3 font-bold text-xl">
                Verify OTP
              </a>
            </button>

            <p className="mt-6 text-sm font-light">
              Didn’t receive OTP?
              <a
                href=""
                className="
                  ml-2
                  bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400
                  bg-clip-text text-transparent
                  font-bold
                  border-b-2 border-transparent
                  hover:border-emerald-400"
              >
                Resend
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
