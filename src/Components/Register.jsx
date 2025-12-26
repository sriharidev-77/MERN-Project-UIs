// RestaurantRegister.jsx - ✅ FULLY INTEGRATED WITH YOUR BACKEND
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { 
  FaFacebook, 
  FaApple, 
  FaUtensils, 
  FaWineGlass, 
  FaPizzaSlice, 
  FaUser,      
  FaDrumstickBite, 
  FaHotdog      
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ NEW: Import axios

export default function RestaurantRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Maps to 'mobile' in backend
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState(""); // ✅ NEW: Required by schema
  const [address2, setAddress2] = useState(""); // ✅ NEW: Required by schema
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW: Error handling
  const navigate = useNavigate();

  // ✅ REAL API INTEGRATION - Maps frontend fields to backend schema
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const payload = {
        name,           // ✅ Matches schema
        email,          // ✅ Matches schema  
        password,       // ✅ Gets hashed in backend
        mobile: phone,  // ✅ Frontend 'phone' → Backend 'mobile'
        address1,       // ✅ Matches schema
        address2,       // ✅ Matches schema
      };

      // ✅ POST to your backend /users route
      const response = await axios.post("http://localhost:9080/users/adduser", payload);
      
      console.log("✅ User created:", response.data);
      
      setIsSuccess(true); // ✅ Show success screen
      
      // Auto redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      // ✅ Handle backend errors
      console.error("❌ Registration failed:", err);
      if (err.response?.status === 400) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/');
  };

  // ✅ Show error message
  const errorMessage = error && (
    <div className="mb-4 p-3 bg-rose-500/10 border border-rose-400/30 rounded-xl text-rose-300 text-sm">
      {error}
    </div>
  );

  // ✅ Show success screen (unchanged)
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* FLOATING FOOD ICONS */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 animate-bounce [animation-delay:-1s] opacity-30 text-5xl text-emerald-400/50">
            <FaUtensils />
          </div>
          <div className="absolute top-32 right-20 animate-pulse [animation-delay:-2s] opacity-25 text-4xl text-amber-400/40">
            <FaWineGlass />
          </div>
          <div className="absolute top-1/2 left-8 -translate-y-1/2 animate-spin [animation-delay:-0.5s] opacity-35 text-6xl text-orange-500/45">
            <FaPizzaSlice />
          </div>
          <div className="absolute bottom-32 right-16 animate-ping [animation-delay:-1.5s] opacity-25 text-5xl text-sky-400/40">
            <FaUser />
          </div>
          <div className="absolute bottom-20 left-24 animate-bounce [animation-delay:-3s] opacity-30 text-4xl text-yellow-500/40">
            <FaDrumstickBite />
          </div>
          <div className="absolute top-2/4 right-24 animate-pulse [animation-delay:-2.5s] opacity-28 text-5xl text-rose-400/40">
            <FaHotdog />
          </div>
        </div>

        {/* SUCCESS SCREEN */}
        <div className="relative w-full max-w-md z-10 text-center">
          <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-emerald-500/30 via-sky-500/20 to-emerald-400/30 blur-3xl animate-pulse" />
          
          <div className="relative bg-slate-900/90 border border-emerald-400/50 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-400/10" />
            
            <div className="relative z-10">
              {/* Success Check Icon */}
              <div className="w-24 h-24 mx-auto mb-8 bg-emerald-500/20 rounded-3xl flex items-center justify-center border-4 border-emerald-400/50 animate-bounce">
                <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-500 bg-clip-text text-transparent mb-4">
                Registration Successful!
              </h2>
              
              <p className="text-lg text-slate-300 mb-8 max-w-sm mx-auto">
                Welcome to Bistro Bliss! Your account has been created successfully. 
                Redirecting to login...
              </p>
              
              <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl px-6 py-3 text-emerald-300 font-medium">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                <span>Redirecting in <span className="text-emerald-400 font-bold">2</span>s</span>
              </div>
              
              <button
                onClick={goToLogin}
                className="mt-8 group w-full rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:shadow-emerald-500/50 hover:-translate-y-1 transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  Go to Login <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ FORM SCREEN WITH NEW FIELDS + ERROR HANDLING
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* FLOATING FOOD ICONS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce [animation-delay:-1s] opacity-30 text-5xl text-emerald-400/50">
          <FaUtensils />
        </div>
        <div className="absolute top-32 right-20 animate-pulse [animation-delay:-2s] opacity-25 text-4xl text-amber-400/40">
          <FaWineGlass />
        </div>
        <div className="absolute top-1/2 left-8 -translate-y-1/2 animate-spin [animation-delay:-0.5s] opacity-35 text-6xl text-orange-500/45">
          <FaPizzaSlice />
        </div>
        <div className="absolute bottom-32 right-16 animate-ping [animation-delay:-1.5s] opacity-25 text-5xl text-sky-400/40">
          <FaUser />
        </div>
        <div className="absolute bottom-20 left-24 animate-bounce [animation-delay:-3s] opacity-30 text-4xl text-yellow-500/40">
          <FaDrumstickBite />
        </div>
        <div className="absolute top-2/4 right-24 animate-pulse [animation-delay:-2.5s] opacity-28 text-5xl text-rose-400/40">
          <FaHotdog />
        </div>
      </div>

      {/* FORM CONTAINER */}
      <div className="relative w-full max-w-6xl">
        <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-sky-500/20 via-emerald-400/15 to-amber-400/20 blur-3xl" />
        
        <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] grid md:grid-cols-2">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25)_0%,rgba(15,23,42,0.9)_60%,rgba(15,23,42,1)_100%)]" />
          <div className="absolute inset-0 bg-slate-950/90" />

          {/* ✅ REGISTER FORM WITH ALL REQUIRED FIELDS */}
          <div className="relative px-8 py-9 md:px-10 lg:px-14 flex flex-col justify-center order-2 md:order-1">
            <header className="flex flex-col gap-2 mb-7">
              <h2 className="text-3xl font-semibold text-slate-50 mb-1">Create your account</h2>
              <p className="text-sm text-slate-300">Register to book tables and earn rewards</p>
            </header>

            {/* ✅ ERROR MESSAGE */}
            {errorMessage}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Full name</label>
                <input 
                  type="text" 
                  required 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                  placeholder="John Doe" 
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Email</label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">@</span>
                  <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 pl-8 pr-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              {/* ✅ NEW: Address 1 (REQUIRED BY SCHEMA) */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Address Line 1</label>
                <input 
                  type="text" 
                  required 
                  value={address1} 
                  onChange={(e) => setAddress1(e.target.value)} 
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                  placeholder="Street, Building No." 
                />
              </div>

              {/* ✅ NEW: Address 2 (REQUIRED BY SCHEMA) */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Address Line 2</label>
                <input 
                  type="text" 
                  required 
                  value={address2} 
                  onChange={(e) => setAddress2(e.target.value)} 
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                  placeholder="City, State, ZIP" 
                />
              </div>

              {/* Phone → mobile */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Phone</label>
                <input 
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                  placeholder="+91 98765 43210" 
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-100 mb-3">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full rounded-xl border border-white/15 bg-slate-900/70 px-3 py-2.5 pr-16 text-sm text-slate-50 shadow-inner placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400" 
                    placeholder="••••••••" 
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-2 flex items-center px-3 text-[11px] text-sky-200 hover:text-sky-100">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-slate-300">
                <input type="checkbox" required className="mt-[2px] h-4 w-4 rounded border-slate-400/50 bg-slate-900/70 text-sky-400" />
                <label>I agree to the <span className="text-sky-200 hover:text-sky-100 cursor-pointer">Terms & Conditions</span>.</label>
              </div>

              <button 
                type="submit" 
                disabled={isLoading} 
                className="group w-full rounded-xl bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 py-2.5 text-sm font-semibold text-slate-950 shadow-lg hover:shadow-emerald-400/70 hover:-translate-y-0.5 transition-all disabled:opacity-70"
              >
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-[11px] text-slate-400">
              <span className="flex-1 h-px bg-slate-700/70" /><span>or continue with</span><span className="flex-1 h-px bg-slate-700/70" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 py-2 text-xs font-medium text-slate-100 hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <FcGoogle className="text-lg" /><span className="hidden sm:inline">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 py-2 text-xs font-medium text-slate-100 hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <FaFacebook className="text-sky-400 text-base" /><span className="hidden sm:inline">Facebook</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 py-2 text-xs font-medium text-slate-100 hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 transition-all">
                <FaApple className="text-slate-100 text-base" /><span className="hidden sm:inline">Apple</span>
              </button>
            </div>

            <p className="mt-6 text-center text-[11px] text-slate-300">
              Already have an account? <button onClick={goToLogin} type="button" className="font-semibold text-sky-200 hover:text-sky-100">Login instead</button>
            </p>
          </div>

          {/* Hero Image Side - UNCHANGED */}
          <div className="relative h-72 md:h-full order-1 md:order-2">
            <img src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg" alt="Chef plating gourmet dishes" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/90 via-slate-950/65 to-sky-900/40" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-14 text-white">
              <div className="space-y-4 max-w-md text-center md:text-right ml-auto">
                <div className="inline-flex items-center justify-center md:justify-end rounded-full bg-emerald-500/25 px-4 py-1 text-[11px] uppercase tracking-[0.3em] text-emerald-100">Member Perks</div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">Savor every moment,<br/>earn every bite.</h1>
                <p className="text-sm md:text-base text-slate-100/85">Join for priority reservations and exclusive tasting menus.</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-2 text-xs text-slate-200">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-emerald-400/50 px-3 py-1 shadow-md">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />Instant welcome drink
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-sky-400/40 px-3 py-1 shadow-md">Collect points every order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
