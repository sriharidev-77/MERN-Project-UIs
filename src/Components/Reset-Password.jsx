
import "../assets";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1 = reset form, 2 = success
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  const handleReset = (e) => {
    e.preventDefault();

    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 6 characters, include one uppercase letter and one special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // 🔐 API call goes here
    setStep(2);
  };

  /* Redirect after success */
  useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('./assets/leaf_2.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-[90%] xl:w-[40%] md:w-[60%] sm:w-[70%] rounded-2xl backdrop-blur-xl bg-transparent shadow-2xl text-white text-center p-6">

        {/* ---------------- RESET PASSWORD ---------------- */}
        {step === 1 && (
          <>
            <h1 className="text-4xl font-semibold mb-8 bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Reset Password
            </h1>

            <form onSubmit={handleReset} className="flex flex-col items-center">

              {/* New Password */}
              <div className="relative w-full mb-8">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full h-14 px-4 pr-12 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-4 flex items-center"
                >
                  {showNew ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative w-full mb-2">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-14 px-4 pr-12 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-4 flex items-center"
                >
                  {showConfirm ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mb-4 mt-5 text-left w-full font-[1000]">
                  {error}
                </p>
              )}

              {/* Password Hint
              <p className="text-xs text-gray-300 mb-6 text-left w-full">
                Password must be at least <b>6 characters</b>,<br /> include
                <b> one uppercase letter</b> and <br />
                <b> one special character</b>.
              </p> */}

              <button className="mt-8 p-0.5 rounded-full bg-linear-to-br from-green-400 to-blue-600">
                <span className="block px-10 py-3 font-bold text-xl">
                  Reset Password
                </span>
              </button>
            </form>
          </>
        )}

        {/* ---------------- SUCCESS ---------------- */}
        {step === 2 && (
          <div className="py-12">
            <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-emerald-400 via-cyan-400 to-sky-400 bg-clip-text text-transparent">
              Password Reset Successful ✅
            </h2>

            <p className="text-lg mb-4">
              Your password has been updated successfully.
            </p>

            <p className="text-sm opacity-80">
              Redirecting to login page...
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
