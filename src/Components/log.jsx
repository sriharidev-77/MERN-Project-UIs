// RestaurantLogin.jsx - ✅ FULLY INTEGRATED WITH YOUR BACKEND
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
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ NEW: Import axios

export default function RestaurantLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ NEW: Error handling
  const navigate = useNavigate();

  // ✅ REAL API INTEGRATION - Connects to YOUR /users/loginUser
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const payload = { email, password };

      // ✅ POST to YOUR backend route: http://localhost:5000/users/loginUser
      const response = await axios.post("http://localhost:9080/users/loginUser", payload);
      
      console.log("✅ Login successful:", response.data);
      
      // ✅ Store user data (no JWT yet, using your response format)
      localStorage.setItem("user", JSON.stringify(response.data));
      
      // ✅ Redirect to dashboard (create this route next)
      navigate("/CategoryPage");
      
    } catch (err) {
      console.error("❌ Login failed:", err);
      // ✅ Handle YOUR backend error format
      if (err.response?.status === 400 || err.response?.status === 500) {
        setError(err.response?.data?.message || "Invalid email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    document.body.classList.add('page-transition');
    setTimeout(() => {
      navigate('/register');
      document.body.classList.remove('page-transition');
    }, 300);
  };

  // ✅ Error message display
  const errorMessage = error && (
    <div className="mb-5 p-3 bg-rose-500/10 border border-rose-400/30 rounded-xl text-rose-300 text-sm animate-in slide-in-from-top-2 duration-300">
      {error}
    </div>
  );

  // ✅ REST OF YOUR JSX (UNCHANGED - just add errorMessage after header)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex items-center justify-center px-4 py-8 relative overflow-hidden page-enter">
      {/* FLOATING FOOD ICONS - UNCHANGED */}
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

      {/* FORM CARD - UNCHANGED STRUCTURE */}
      <div className="relative w-full max-w-6xl z-10">
        <div className="absolute inset-0 rounded-[2.25rem] bg-gradient-to-tr from-sky-500/20 via-emerald-400/15 to-amber-400/20 blur-3xl" />
        
        <div className="relative bg-slate-900/80 border border-white/10 rounded-[2.25rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] grid md:grid-cols-2 min-h-[520px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.25)_0%,rgba(15,23,42,0.9)_60%,rgba(15,23,42,1)_100%)]" />
          <div className="absolute inset-0 bg-slate-950/90" />

          {/* Hero Image Side - UNCHANGED */}
          <div className="relative h-72 md:h-full">
            <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg" alt="Fine dining" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/65 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 lg:p-14 text-white">
              <div className="space-y-4 max-w-md text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <p className="inline-flex items-center justify-center rounded-full bg-sky-500/25 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-sky-100 w-[220px] max-w-full self-center sm:w-auto">
                    Signature Dining
                  </p>
                  <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900/70 border border-sky-400/40 px-3 py-1 text-[11px] text-slate-100 shadow-md w-[240px] max-w-full self-center sm:w-auto">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Open • 11:00 AM – 11:00 PM</span>
                  </div>
                </div>
                <h1 className="text-3xl mb-6 md:text-4xl lg:text-5xl font-semibold leading-tight">SKYBOWL</h1>
                <p className="text-sm md:text-base mb-3 text-slate-100/85">Food is the only language that everyone understands.</p>
              </div>
              <div className="space-y-3 hidden sm:block">
                <div className="text-[11px] uppercase tracking-[0.35em] text-sky-200 mb-2">Tonight's Special</div>
                <p className="text-lg font-semibold">Truffle Mushroom Risotto</p>
              </div>
            </div>
          </div>

          {/* ✅ LOGIN FORM WITH API + ERROR HANDLING */}
          <div className="relative px-8 py-9 md:px-10 lg:px-14 flex flex-col justify-center">
            <header className="flex flex-col gap-2 mb-7">
              <h2 className="text-3xl font-semibold text-slate-50 mb-1">Welcome back</h2>
              <p className="text-sm text-slate-300">Login to manage reservations</p>
            </header>

            {/* ✅ ERROR MESSAGE */}
            {errorMessage}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              <div className="flex items-center justify-between text-xs text-slate-300">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-400/50 bg-slate-900/70 text-sky-400" />
                  <span>Remember me</span>
                </label>
                <Link
  to="/forget-password"
  className="text-sky-200 hover:text-sky-100 font-medium"
>
  Forgot password?
</Link>
              </div>

              <button type="submit" disabled={isLoading} className="group w-full rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-emerald-400 py-2.5 text-sm font-semibold text-slate-950 shadow-lg hover:shadow-sky-400/70 hover:-translate-y-0.5 transition-all disabled:opacity-70">
                <span className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <span className="h-4 w-4 border-2 border-slate-900/40 border-t-slate-900 rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </span>
              </button>
            </form>

            {/* REST UNCHANGED */}
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
              Don't have an account? <button onClick={goToRegister} type="button" className="font-semibold text-sky-200 hover:text-sky-100 transition-all">Register now</button>
            </p>
          </div>
        </div>
      </div>
    </div>  
  );
}
