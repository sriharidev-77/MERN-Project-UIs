import { useState, useEffect } from "react";
import axios from "axios";
import { FaLeaf, FaDrumstickBite, FaOm, FaSeedling, FaBars } from "react-icons/fa";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // ✅ NEW: User state for navbar
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load user from localStorage (from your login)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      console.log("✅ User loaded:", userData.email || userData.loginid);
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:9080/category/all")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Categories error:", err));

    axios
      .get("http://localhost:9080/menu/all")
      .then((res) => setMenuItems(res.data.data || []))
      .catch((err) => console.error("Menus error:", err));
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category?.name === activeCategory);

  const typeFilters = [
    { key: "All", label: "All", icon: FaBars },
    { key: "Veg", label: "Veg", icon: FaLeaf },
    { key: "Non-Veg", label: "Non Veg", icon: FaDrumstickBite },
    { key: "Jain", label: "Jain", icon: FaOm },
    { key: "Vegan", label: "Vegan", icon: FaSeedling },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-sky-950 to-slate-900 flex text-slate-100">
      {/* SIDEBAR - UNCHANGED */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-64 
          bg-slate-900/90 border-r border-white/10 
          backdrop-blur-xl 
          transform transition-transform duration-300 
          md:translate-x-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-4 border-b border-white/10">
            <h1 className="text-xl font-semibold tracking-wide">
              Bistro <span className="text-sky-400">Menu</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse and manage dishes
            </p>
          </div>

          <div className="px-4 pt-4 pb-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-3">
              Dietary Types
            </p>
            <div className="space-y-2">
              {typeFilters.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all
                    ${
                      activeCategory === key
                        ? "bg-gradient-to-r from-sky-500/80 to-emerald-400/80 text-slate-950 shadow-lg"
                        : "bg-slate-900/60 hover:bg-slate-800 text-slate-200"
                    }
                  `}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900/80">
                    <Icon className="text-xs" />
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 pt-5 pb-4 flex-1 overflow-y-auto">
            <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500 mb-3">
              Categories
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                  ${
                    activeCategory === "All"
                      ? "bg-slate-800 text-sky-300"
                      : "hover:bg-slate-800/70 text-slate-300"
                  }
                `}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all
                    ${
                      activeCategory === cat.name
                        ? "bg-slate-800 text-sky-300"
                        : "hover:bg-slate-800/70 text-slate-300"
                    }
                  `}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 border-t border-white/10 text-[11px] text-slate-500">
            <p>Logged in as</p>
            <p className="text-slate-200 font-medium truncate">
              {user?.email || user?.loginid || "Restaurant Admin"}
            </p>
          </div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* ✅ NAVBAR WITH USER EMAIL */}
        <header className="sticky top-0 z-20 bg-slate-950/80 border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 transition-colors"
                onClick={() => setSidebarOpen((v) => !v)}
              >
                <FaBars />
              </button>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-100">
                  Menu Catalogue
                </h2>
                <p className="text-xs text-slate-400">Filter by category & dietary type</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* ✅ USER EMAIL DISPLAY */}
              {user ? (
                <div className="flex flex-col items-end text-xs text-slate-300 hidden sm:flex">
                  <span className="text-slate-400 text-[11px]">Logged in as:</span>
                  <span className="font-semibold text-sky-300 truncate max-w-[180px]">
                    {user.email || user.loginid || user.firstname || "user@bistro.com"}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400">Please login</span>
              )}
              {/* User avatar */}
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 flex items-center justify-center text-xs font-bold shadow-lg">
                {user?.email ? user.email[0]?.toUpperCase() : "U"}
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT - UNCHANGED */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/70 border border-sky-500/40 px-4 py-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase tracking-[0.25em] text-slate-200">
                {activeCategory === "All" ? "All Items" : activeCategory}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Total items: {filteredItems.length}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-900/80 border border-white/10 rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden group flex flex-col hover:shadow-sky-500/30 transition-all"
                >
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={
                        item.image ||
                        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"
                      }
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                    <span className="absolute top-3 left-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs text-slate-100 border border-white/10">
                      {item.category?.name || "Uncategorized"}
                    </span>
                    <span className="absolute top-3 right-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-slate-950">
                      ₹{item.price}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-base line-clamp-1">
                        {item.name}
                      </h3>
                      <span
                        className={`
                          text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide
                          ${
                            item.type?.toLowerCase() === "veg"
                              ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/40"
                              : "bg-rose-500/15 text-rose-200 border border-rose-400/40"
                          }
                        `}
                      >
                        {item.type || "Type"}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {item.description || "No description provided."}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-[11px] text-slate-400">
                        ID: {item._id?.slice(0, 6)}...
                      </span>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="text-yellow-400">★</span>
                        <span>{item.rating || "4.5"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-slate-400 text-lg">
                  {activeCategory === "All"
                    ? "No menu items yet."
                    : `No items in ${activeCategory} category yet. Add via backend!`}
                </p>
              </div>
            )}
          </div>
        </main>

        <style jsx>{`
          .line-clamp-1 {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CategoryPage;
