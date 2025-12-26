// RestaurantForgetPassword.jsx - PERFECT FOOD SECURITY + 30s TIMER
import { useState, useEffect } from "react";
import { 
  FaLockOpen, 
  FaKey, 
  FaFingerprint, 
  FaLock, 
  FaEnvelope, 
  FaCircleCheck 
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function RestaurantForgetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTime, setResendTime] = useState(30); // ✅ 30s timer
  const [canResend, setCanResend] = useState(false); // ✅ Resend disabled initially
  const [showResendMessage, setShowResendMessage] = useState(false); // ✅ Modern resend message
  const navigate = useNavigate();

  // ✅ SECURITY ICONS - SAME animations as login/register
  const securityIcons = [
    { icon: FaLockOpen, pos: "top-20 left-10", anim: "animate-bounce", delay: "-1s", color: "text-indigo-400/50", size: "text-5xl" },
    { icon: FaKey, pos: "top-32 right-20", anim: "animate-pulse", delay: "-2s", color: "text-emerald-400/40", size: "text-4xl" },
    { icon: FaFingerprint, pos: "top-1/2 left-8", anim: "animate-spin", delay: "-0.5s", color: "text-purple-500/45", size: "text-6xl" },
    { icon: FaLock, pos: "bottom-32 right-16", anim: "animate-ping", delay: "-1.5s", color: "text-sky-400/40", size: "text-5xl" },
    { icon: FaEnvelope, pos: "bottom-20 left-24", anim: "animate-bounce", delay: "-3s", color: "text-amber-400/40", size: "text-4xl" },
    { icon: FaKey, pos: "top-2/4 right-24", anim: "animate-pulse", delay: "-2.5s", color: "text-rose-400/40", size: "text-5xl" }
  ];

  // ✅ 30s Resend Timer
  useEffect(() => {
    if (step === 2 && resendTime > 0) {
      const timer = setTimeout(() => setResendTime(resendTime - 1), 1000);
      return () => clearTimeout(timer);
    } else if (resendTime === 0) {
      setCanResend(true);
    }
  }, [resendTime, step]);

  const handleSendOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setResendTime(30); // Reset timer
      setCanResend(false);
    }, 1500);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1500);
  };

  const handleResendOTP = () => {
    setResendTime(30);
    setCanResend(false);
    setShowResendMessage(true);
    setTimeout(() => setShowResendMessage(false), 3000); // Hide message after 3s
  };

  const goToLogin = () => navigate('/');

  // STEP 1: Email Input
  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {securityIcons.map((iconProps, i) => (
            <div key={i} className={`absolute ${iconProps.pos} ${iconProps.anim} [animation-delay:${iconProps.delay}] opacity-30 ${iconProps.color} ${iconProps.size}`}>
              <iconProps.icon />
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-6xl z-10">
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-sky-500/20 via-emerald-400/15 to-amber-400/20 blur-3xl" />
          
          <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] grid md:grid-cols-2 min-h-[520px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25)_0%,rgba(15,23,42,0.9)_60%,rgba(15,23,42,1)_100%)]" />
            <div className="absolute inset-0 bg-slate-950/90" />

            {/* ✅ FOOD SECURITY HERO IMAGE */}
            <div className="relative h-72 md:h-full">
              <img 
                src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg" 
                alt="Food safety inspection in professional kitchen" 
                className="h-full w-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/70 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-14 text-white">
                <div className="space-y-4 max-w-md text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="inline-flex items-center justify-center rounded-full bg-emerald-500/25 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-100 w-[220px] max-w-full self-center sm:w-auto">
                      Food Safety Certified
                    </p>
                    <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/70 border border-emerald-400/40 px-3 py-1 text-[11px] text-slate-100 shadow-md w-[240px] max-w-full self-center sm:w-auto">
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>HACCP Compliant</span>
                    </div>
                  </div>
                  <h1 className="text-3xl mb-6 md:text-4xl lg:text-5xl font-semibold leading-tight">Secure Recovery</h1>
                  <p className="text-sm md:text-base mb-3 text-slate-100/85">Your account data is protected with restaurant-grade security standards.</p>
                </div>
                <div className="space-y-3 hidden sm:block">
                  <div className="text-[11px] uppercase tracking-[0.35em] text-emerald-200 mb-2">Security Standards</div>
                  <p className="text-lg font-semibold text-emerald-100">256-bit Encryption</p>
                </div>
              </div>
            </div>

            {/* Email Form */}
            <div className="relative px-8 py-9 md:px-10 lg:px-14 flex flex-col justify-center">
              <header className="flex flex-col gap-2 mb-7">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <FaLockOpen className="text-2xl text-emerald-400" />
                </div>
                <h2 className="text-3xl font-semibold text-slate-50 mb-1">Forgot Password?</h2>
                <p className="text-sm text-slate-300">Enter your email. We'll send a secure 4-digit OTP to reset your password.</p>
              </header>

              <form onSubmit={handleSendOTP} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-slate-100 mb-3 flex items-center gap-2">
                    <FaEnvelope className="text-emerald-400 text-sm" />
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">@</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-slate-900/70 pl-8 pr-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full rounded-xl bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg hover:shadow-emerald-400/70 hover:-translate-y-0.5 transition-all disabled:opacity-70"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </span>
                </button>
              </form>

              <p className="mt-6 text-center text-[11px] text-slate-300">
                Back to <button onClick={goToLogin} className="font-semibold text-emerald-300 hover:text-emerald-200">Sign in</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: OTP Input
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {securityIcons.map((iconProps, i) => (
            <div key={i} className={`absolute ${iconProps.pos} ${iconProps.anim} [animation-delay:${iconProps.delay}] opacity-30 ${iconProps.color} ${iconProps.size}`}>
              <iconProps.icon />
            </div>
          ))}
        </div>

        <div className="relative w-full max-w-md z-10">
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-emerald-500/20 via-sky-400/15 to-emerald-400/20 blur-3xl" />
          
          <div className="relative bg-slate-900/80 border border-emerald-400/50 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] p-10">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/20 rounded-3xl flex items-center justify-center border-4 border-emerald-400/50">
                <FaKey className="text-3xl text-emerald-400" />
              </div>
              <h2 className="text-3xl font-semibold text-slate-50 mb-2">Verify OTP</h2>
              <p className="text-slate-400 mb-2">Enter 4-digit code sent to</p>
              <p className="font-semibold text-slate-200">{email}</p>
            </div>

            {/* ✅ RESEND MESSAGE - MODERN UX */}
            {showResendMessage && (
              <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-400/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm text-emerald-300">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span>✅ OTP resent to {email}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="grid grid-cols-4 gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[index] = e.target.value.replace(/[^0-9]/g, '');
                      setOtp(newOtp);
                      if (e.target.value && index < 3) {
                        document.getElementById(`otp-${index + 1}`)?.focus();
                      }
                    }}
                    id={`otp-${index}`}
                    className="w-full h-16 text-2xl font-bold text-center rounded-xl border-2 border-white/20 bg-slate-900/70 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 shadow-inner text-slate-50"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join("").length !== 4}
                className="group w-full rounded-xl bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:shadow-emerald-400/70 hover:-translate-y-0.5 transition-all disabled:opacity-70"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify OTP <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* ✅ 30s COUNTDOWN TIMER + RESEND */}
            <div className="mt-8 text-center pt-6 border-t border-slate-800">
              <button 
                onClick={handleResendOTP}
                disabled={!canResend}
                className={`text-sm transition-all ${
                  canResend 
                    ? 'text-emerald-400 hover:text-emerald-300 font-semibold flex items-center justify-center gap-2 mx-auto' 
                    : 'text-slate-500 cursor-not-allowed'
                }`}
              >
                {canResend ? (
                  <>
                    <FaEnvelope className="text-sm" />
                    Resend OTP
                  </>
                ) : (
                  `Resend OTP in ${resendTime}s`
                )}
              </button>
            </div>

            <p className="mt-6 text-center text-[11px] text-slate-300">
              Back to <button onClick={goToLogin} className="font-semibold text-emerald-300 hover:text-emerald-200">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // STEP 3: Success (unchanged)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {securityIcons.map((iconProps, i) => (
          <div key={i} className={`absolute ${iconProps.pos} ${iconProps.anim} [animation-delay:${iconProps.delay}] opacity-30 ${iconProps.color} ${iconProps.size}`}>
            <iconProps.icon />
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-md z-10 text-center">
        <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-emerald-500/30 via-sky-400/20 to-emerald-400/30 blur-3xl animate-pulse" />
        
        <div className="relative bg-slate-900/90 border border-emerald-400/50 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] p-12">
          <div className="w-24 h-24 mx-auto mb-8 bg-emerald-500/20 rounded-3xl flex items-center justify-center border-4 border-emerald-400/50 animate-bounce">
            <FaCircleCheck className="text-4xl text-emerald-400" />
          </div>
          
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 bg-clip-text text-transparent mb-4">
            Reset Complete!
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-sm mx-auto">
            Your password has been reset successfully. You can now sign in with your new password.
          </p>
          
          <button
            onClick={goToLogin}
            className="group w-full rounded-xl bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:shadow-emerald-400/70 hover:-translate-y-0.5 transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              Go to Login <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

