import { useState, useEffect } from "react";
import axios from "axios";
import { 
  FaLockOpen, FaKey, FaFingerprint, FaLock, FaEnvelope, FaCircleCheck 
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function RestaurantForgetPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Pass, 4: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTime, setResendTime] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:9080/users";

  // Security Icons and Timer logic remains the same...
  useEffect(() => {
    if (step === 2 && resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTime === 0) {
      setCanResend(true);
    }
  }, [resendTime, step]);

  // --- API HANDLERS ---

  // STEP 1: Request OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE}/forgot-password`, { email });
      setStep(2);
      setResendTime(30);
      setCanResend(false);
    } catch (err) {
      setError(err.response?.data?.message || "Email not found");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE}/verify-otp`, { 
        email, 
        otp: otp.join("") 
      });
      setStep(3); // Move to password reset page
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Submit New Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post(`${API_BASE}/reset-password`, { 
        email, 
        newPassword 
      });
      setStep(4); // Success screen
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => navigate('/');

  // --- RENDERING ---

  // STEP 1: EMAIL INPUT (UI remains as you designed)
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background Icons... */}
        <div className="relative w-full max-w-6xl z-10">
          <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.25rem] overflow-hidden shadow-2xl grid md:grid-cols-2">
            {/* Left Side: Image Content... */}
            <div className="px-8 py-9 md:px-14 flex flex-col justify-center">
              <h2 className="text-3xl font-semibold text-slate-50 mb-4">Forgot Password?</h2>
              {error && <p className="text-rose-400 text-sm mb-4">{error}</p>}
              <form onSubmit={handleSendOTP} className="space-y-5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 p-3 text-slate-50"
                  placeholder="Enter your email"
                />
                <button type="submit" disabled={isLoading} className="w-full bg-emerald-500 p-3 rounded-xl font-bold">
                  {isLoading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: OTP VERIFICATION
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-900 p-10 rounded-[2rem] border border-emerald-400/50 w-full max-w-md">
          <h2 className="text-2xl text-white font-bold text-center mb-6">Verify OTP</h2>
          {error && <p className="text-rose-400 text-center mb-4">{error}</p>}
          <form onSubmit={handleVerifyOTP} className="space-y-6">
            <div className="flex justify-between gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[i] = e.target.value;
                    setOtp(newOtp);
                    if (e.target.value && i < 3) document.getElementById(`otp-${i+1}`).focus();
                  }}
                  className="w-14 h-14 text-center bg-slate-800 text-white rounded-lg border border-white/10 text-xl"
                />
              ))}
            </div>
            <button type="submit" className="w-full bg-emerald-400 p-3 rounded-xl text-slate-950 font-bold">
              Verify Code
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 3: NEW PASSWORD INPUT
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-900 p-10 rounded-[2rem] border border-sky-400/50 w-full max-w-md">
          <h2 className="text-2xl text-white font-bold text-center mb-6">Set New Password</h2>
          {error && <p className="text-rose-400 text-center mb-4">{error}</p>}
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-800 text-white p-3 rounded-xl border border-white/10"
                placeholder="New Password"
              />
              <button 
                type="button" 
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-sky-400 text-xs"
              >
                {showNewPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
            <button type="submit" className="w-full bg-sky-400 p-3 rounded-xl text-slate-950 font-bold">
              Update Password
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 4: SUCCESS SCREEN (UI remains as you designed)
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center bg-slate-900 p-12 rounded-[2.25rem] border border-emerald-400">
            <FaCircleCheck className="text-6xl text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl text-white font-bold mb-4">Password Updated!</h2>
            <button onClick={goToLogin} className="bg-emerald-400 px-8 py-3 rounded-xl font-bold">Back to Login</button>
        </div>
    </div>
  );
}