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
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* <div className="absolute inset-0 pointer-events-none">
        {securityIcons.map((iconProps, i) => (
          <div key={i} className={`absolute ${iconProps.pos} ${iconProps.anim} [animation-delay:${iconProps.delay}] opacity-30 ${iconProps.color} ${iconProps.size}`}>
            <iconProps.icon />
          </div>
        ))}
      </div> */}

      <div className="relative w-full max-w-6xl z-10">
        <div className="absolute inset-0 rounded-[2.25rem] bg-linear-to-tr from-sky-500/20 via-emerald-400/15 to-amber-400/20 blur-3xl" />
        
        <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] grid md:grid-cols-2 min-h-[520px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25)_0%,rgba(15,23,42,0.9)_60%,rgba(15,23,42,1)_100%)]" />
          <div className="absolute inset-0 bg-slate-950/90" />

          {/* ✅ LEFT SIDE: Hero Image */}
          <div className="relative h-72 md:h-full">
            <img 
              src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" 
              alt="Secure recovery interface" 
              className="h-full w-full object-cover" 
            />
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/85 via-slate-950/70 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-14 text-white">
              <div className="space-y-4 max-w-md text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="inline-flex items-center justify-center rounded-full bg-emerald-500/25 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-100 w-[220px] max-w-full self-center sm:w-auto">
                    Secure Recovery
                  </p>
                  <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/70 border border-emerald-400/40 px-3 py-1 text-[11px] text-slate-100 shadow-md w-[240px] max-w-full self-center sm:w-auto">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Protected</span>
                  </div>
                </div>
                <h1 className="text-3xl mb-6 md:text-4xl lg:text-5xl font-semibold leading-tight">Reset Securely</h1>
                <p className="text-sm md:text-base mb-3 text-slate-100/85">Your account recovery is protected with enterprise-grade security standards.</p>
              </div>
              <div className="space-y-3 hidden sm:block">
                <div className="text-[11px] uppercase tracking-[0.35em] text-emerald-200 mb-2">Security</div>
                <p className="text-lg font-semibold text-emerald-100">End-to-End Encrypted</p>
              </div>
            </div>
          </div>

          {/* ✅ RIGHT SIDE: Your Existing Form (Enhanced Styling) */}
          <div className="px-8 py-9 md:px-14 lg:px-16 flex flex-col justify-center relative z-10">
            <div className="text-center mb-8 md:mb-0 md:text-left">
              <h2 className="text-3xl md:text-4xl font-semibold text-transparent mb-4 bg-linear-to-r from-slate-50 to-emerald-100 bg-clip-text text-transparent">
                Forgot Password?
              </h2>
              <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto md:mx-0">
                Enter your email to receive a secure OTP for password recovery.
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl backdrop-blur-sm">
                <p className="text-rose-400 text-sm font-medium">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/15 bg-slate-900/50 backdrop-blur-sm p-4 text-slate-50 placeholder-slate-400 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 text-lg"
                  placeholder="yourname@company.com"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading} 
                className="group w-full bg-linear-to-r from-emerald-500 to-emerald-600 p-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-emerald-500/25 hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:from-emerald-400"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                      </svg>
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Secure OTP
                    </>
                  )}
                </span>
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-white/10 text-center">
              <p className="text-xs text-slate-400">
                Your data is protected with 256-bit encryption and enterprise security standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


  // STEP 2: OTP VERIFICATION
  if (step === 2) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-slate-900 p-10 rounded-4xl border border-emerald-400/50 w-full max-w-md">
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