// src/CategoryPage.jsx
import { useState, useMemo, useCallback } from "react";
import { 
  FiBell, 
  FiSearch, 
  FiUser, 
  FiEdit3, 
  FiLogOut, 
  FiSave, 
  FiArrowLeft,
  FiGrid,
  FiBookOpen,
  FiShoppingBag
} from "react-icons/fi";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Grill Sandwich",
    price: 30,
    rating: 5.0,
    category: "Sandwich",
    type: "Veg",
    description: "Beetroot, potato, bell pepper, sandwich masala.",
    image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
    baseGrams: 50,
  },
  {
    id: 2,
    name: "Chicken Popeyes",
    price: 20,
    rating: 4.0,
    category: "Chicken",
    type: "Non-Veg",
    description: "Crispy fried chicken popeyes style.",
    image: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg",
    baseGrams: 50,
  },
  {
    id: 3,
    name: "Bison Burgers",
    price: 50,
    rating: 2.0,
    category: "Burger",
    type: "Non-Veg",
    description: "Juicy bison patty with cheese.",
    image: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    baseGrams: 50,
  },
  {
    id: 4,
    name: "Paneer Tikka",
    price: 45,
    rating: 4.8,
    category: "Veg",
    type: "Veg",
    description: "Grilled paneer with spices and bell peppers.",
    image: "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg",
    baseGrams: 50,
  },
  {
    id: 5,
    name: "Fresh Lime Soda",
    price: 25,
    rating: 4.9,
    category: "Drinks",
    type: "Drink",
    description: "Refreshing lime soda with mint.",
    image: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg",
    baseGrams: 50,
  },
  {
    id: 6,
    name: "Chocolate Cake",
    price: 55,
    rating: 4.9,
    category: "Cake",
    type: "Dessert",
    description: "Rich chocolate fudge cake.",
    image: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
    baseGrams: 50,
  },
];

const MENU_SECTIONS = [
  {
    id: "veg",
    name: "Vegetarian",
    image:
      "https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh vegetarian delights",
    itemCount: 2,
    color: "from-emerald-500 to-green-500",
    icon: "🥬"
  },
  {
    id: "non-veg",
    name: "Non-Vegetarian",
    image:
      "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Juicy meat specialties",
    itemCount: 2,
    color: "from-red-500 to-orange-500",
    icon: "🍗"
  },
  {
    id: "drinks",
    name: "Vegan",
    image:
      "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Vegans",
    itemCount: 1,
    color: "from-blue-500 to-cyan-500",
    icon: "🥤"
  },
  {
    id: "cake",
    name: "Jain",
    image:
      "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Jain",
    itemCount: 1,
    color: "from-pink-500 to-rose-500",
    icon: "🍰"
  },
];

const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
};

const CategoryPage = () => {
  const [activeView, setActiveView] = useState("all");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMenuSection, setActiveMenuSection] = useState("veg");
  const [showSectionItems, setShowSectionItems] = useState(false);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userViewOpen, setUserViewOpen] = useState(false);
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(mockUserData);

  const categories = useMemo(
    () => ["All", ...new Set(MENU_ITEMS.map((i) => i.category))],
    []
  );

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchCategory =
        activeCategory === "All" || item.category === activeCategory;

      let matchMenuSection = true;
      if (showSectionItems) {
        const sectionMap = {
          veg: item.type === "Veg",
          "non-veg": item.type === "Non-Veg",
          drinks: item.type === "Drink",
          cake: item.type === "Dessert",
        };
        matchMenuSection = sectionMap[activeMenuSection] || false;
      }

      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchCategory && matchMenuSection && matchSearch;
    });
  }, [activeCategory, search, showSectionItems, activeMenuSection]);

  const addToCart = useCallback((id) => {
    setCart((prev) => {
      const item = MENU_ITEMS.find((i) => i.id === id);
      if (!item) return prev;

      const current = prev[id] || { qty: 0, grams: 0 };
      const qty = current.qty + 1;
      const grams = item.baseGrams * qty;

      return { ...prev, [id]: { qty, grams } };
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const current = prev[id];
      if (!current) return prev;

      const item = MENU_ITEMS.find((i) => i.id === id);
      if (!item) return prev;

      const qty = current.qty - 1;
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      const grams = item.baseGrams * qty;
      return { ...prev, [id]: { qty, grams } };
    });
  }, []);

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, data]) => {
          const item = MENU_ITEMS.find((i) => i.id === Number(id));
          if (!item) return null;
          const qty = data.qty;
          const grams = data.grams || item.baseGrams * qty;
          const unitPricePerGram = item.price / item.baseGrams;
          const linePrice = unitPricePerGram * grams;
          return { ...item, qty, grams, linePrice };
        })
        .filter(Boolean),
    [cart]
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.linePrice, 0);
  const tax = subtotal * 0.06;
  const charges = subtotal > 0 ? 24 : 0;
  const total = subtotal + tax + charges;

  const title = showSectionItems
    ? `${
        activeMenuSection.charAt(0).toUpperCase() +
        activeMenuSection.slice(1).replace("-", " ")
      }`
    : activeView === "all"
    ? "All Dishes"
    : activeView === "orders"
    ? "Order Summary"
    : "Main Menu";

  const handleSectionClick = useCallback((sectionId) => {
    setActiveMenuSection(sectionId);
    setActiveView('all'); 
    setShowSectionItems(true); 
  }, []);

  const goBackToMenuCards = useCallback(() => {
    setShowSectionItems(false);
    setActiveView('menu');
  }, []);

  // User handlers
  const handleEditUser = () => {
    setEditData(userData);
    setIsEditing(true);
  };

  const handleSaveUser = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUserViewOpen(false);
    setActiveView("all");
    setMobileMenuOpen(false);
  };

  // Nav Button Helper
  const NavButton = ({ label, view, icon: Icon, color, isActive, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center w-full p-4 mb-2 rounded-2xl transition-all duration-300 overflow-hidden ${
        isActive
          ? "text-white shadow-[0_0_30px_rgba(0,0,0,0.3)]"
          : "text-slate-400 hover:text-white"
      }`}
    >
      {/* Active "Neon Pill" Background */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 backdrop-blur-md rounded-2xl border border-white/10`} />
      )}
      
      {/* Hover Slide Effect */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl scale-95 group-hover:scale-100" />

      {/* Content */}
      <div className="relative flex items-center gap-4 z-10">
        <div className={`p-2.5 rounded-xl transition-all duration-300 ${
          isActive 
            ? `bg-gradient-to-br ${color} shadow-lg text-white scale-110` 
            : "bg-slate-800/50 group-hover:bg-slate-700"
        }`}>
          <Icon className="text-xl" />
        </div>
        <span className={`font-bold tracking-wide transition-all duration-300 ${isActive ? "text-white translate-x-1" : ""}`}>
          {label}
        </span>
      </div>

      {/* Active Indicator Dot */}
      {isActive && (
        <div className={`absolute right-4 h-2 w-2 rounded-full bg-gradient-to-r ${color} shadow-[0_0_10px_currentColor] animate-pulse`} />
      )}
    </button>
  );

  return (
    <>
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .scroll-hide::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .scroll-hide {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}
      </style>

      {/* GLOBAL BACKGROUND - DULLED FOR BETTER ALIGNMENT WITH LOGIN PAGE */}
      <div className="h-screen overflow-hidden relative bg-slate-950 flex font-sans selection:bg-emerald-500/30">
        
        {/* Animated Background Orbs - REDUCED OPACITY & SATURATION */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Top Right: Darker Emerald */}
          <div className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full bg-emerald-600/20 blur-[120px] opacity-40 animate-pulse" style={{animationDuration: '6s'}} />
          
          {/* Bottom Left: Subtle Teal */}
          <div className="absolute bottom-[-20%] left-[-10%] w-[900px] h-[900px] rounded-full bg-teal-600/15 blur-[120px] opacity-40" />
          
          {/* Center-ish: Faint Amber (Barely visible warmth) */}
          <div className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[100px] opacity-30 mix-blend-screen" />
        </div>

        {/* --- SIDEBAR (REDUCED WIDTH to 18rem) --- */}
        <aside className="hidden md:flex h-full w-[18rem] bg-slate-900/40 backdrop-blur-2xl border-r border-white/5 flex-col py-8 px-5 relative z-30 shadow-2xl">
          
          {/* Logo Section */}
          <div className="flex items-center gap-4 mb-12 px-2">
            <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-emerald-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                 <span className="animate-[float_3s_ease-in-out_infinite]">S</span>
              </div>
            </div>
            {/* Fix clipping with pb-1 and leading-tight */}
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-200 to-white bg-clip-text text-transparent pb-1 leading-tight">
                Sky Bowl
              </span>
              <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">Premium Food</span>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="space-y-1 mb-auto">
            {/* <NavButton 
              label="All Dishes" 
              icon={FiGrid}
              color="from-emerald-500 to-teal-600"
              isActive={activeView === "all" && !showSectionItems && !userViewOpen}
              onClick={() => { setActiveView("all"); setShowSectionItems(false); setUserViewOpen(false); }}
            /> */}
            <NavButton 
              label="Menu" 
              icon={FiBookOpen}
              color="from-teal-500 to-cyan-600"
              isActive={activeView === "menu" && !showSectionItems && !userViewOpen}
              onClick={() => { setActiveView("menu"); setShowSectionItems(false); setUserViewOpen(false); }}
            />
            <NavButton 
              label="Your Cart" 
              icon={FiShoppingBag}
              color="from-amber-500 to-orange-600"
              isActive={activeView === "orders" && !userViewOpen}
              onClick={() => { setActiveView("orders"); setShowSectionItems(false); setUserViewOpen(false); }}
            />
          </nav>

          {/* User Profile at Bottom */}
          <div className="pt-6 border-t border-white/5">
             <NavButton 
              label="Profile" 
              icon={FiUser}
              color="from-fuchsia-600 to-purple-700"
              isActive={userViewOpen}
              onClick={() => { setUserViewOpen(true); setActiveView("user"); }}
            />
          </div>
        </aside>

        {/* --- MOBILE SIDEBAR OVERLAY (UPDATED TO MATCH DESKTOP STYLE) --- */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-80 bg-slate-900/95 backdrop-blur-2xl border-r border-white/10 text-slate-100 flex flex-col py-8 px-5 shadow-2xl relative overflow-hidden">
               {/* Mobile Background Orbs for consistency */}
               <div className="absolute top-[-10%] right-[-10%] w-40 h-40 rounded-full bg-emerald-500/20 blur-3xl opacity-20 pointer-events-none" />
               <div className="absolute bottom-[-10%] left-[-10%] w-40 h-40 rounded-full bg-teal-500/20 blur-3xl opacity-20 pointer-events-none" />

               {/* Mobile Logo */}
               <div className="flex items-center gap-4 mb-12 px-2 relative z-10">
                  <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20">
                     <span>S</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-2xl tracking-tight bg-gradient-to-r from-emerald-200 via-teal-200 to-white bg-clip-text text-transparent pb-1 leading-tight">
                      Sky Bowl
                    </span>
                    <span className="text-xs font-semibold text-slate-500 tracking-widest uppercase">Premium Food</span>
                  </div>
               </div>
               
               {/* Mobile Nav - Replicating Desktop Style */}
               <nav className="space-y-1 mb-auto relative z-10">
                <NavButton 
                  label="All Dishes" 
                  icon={FiGrid}
                  color="from-emerald-500 to-teal-600"
                  isActive={activeView === "all" && !showSectionItems && !userViewOpen}
                  onClick={() => { setActiveView("all"); setShowSectionItems(false); setUserViewOpen(false); setMobileMenuOpen(false); }}
                />
                <NavButton 
                  label="Menu" 
                  icon={FiBookOpen}
                  color="from-teal-500 to-cyan-600"
                  isActive={activeView === "menu" && !showSectionItems && !userViewOpen}
                  onClick={() => { setActiveView("menu"); setShowSectionItems(false); setUserViewOpen(false); setMobileMenuOpen(false); }}
                />
                <NavButton 
                  label="Orders" 
                  icon={FiShoppingBag}
                  color="from-amber-500 to-orange-600"
                  isActive={activeView === "orders" && !userViewOpen}
                  onClick={() => { setActiveView("orders"); setShowSectionItems(false); setUserViewOpen(false); setMobileMenuOpen(false); }}
                />
               </nav>

               <div className="pt-6 border-t border-white/5 relative z-10">
                 <NavButton 
                  label="Profile" 
                  icon={FiUser}
                  color="from-fuchsia-600 to-purple-700"
                  isActive={userViewOpen}
                  onClick={() => { setUserViewOpen(true); setActiveView("user"); setMobileMenuOpen(false); }}
                />
               </div>
            </div>
            <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 h-screen px-6 lg:px-12 py-8 lg:py-10 flex lg:flex-row gap-8 relative z-10 overflow-hidden">
          {/* CENTER CONTENT */}
          <div className="flex-1 flex flex-col min-h-0">
            {userViewOpen ? (
              <UserProfilePage
                userData={userData}
                editData={editData}
                isEditing={isEditing}
                onEdit={handleEditUser}
                onSave={handleSaveUser}
                onCancel={handleCancelEdit}
                onLogout={handleLogout}
                onBack={() => {
                  setUserViewOpen(false);
                  setActiveView("all");
                }}
              />
            ) : activeView === "orders" ? (
              <OrderContent
                cartItems={cartItems}
                subtotal={subtotal}
                tax={tax}
                charges={charges}
                total={total}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                onBack={() => setActiveView("all")}
              />
            ) : (
              /* DASHBOARD CONTENT */
              <div className="flex flex-col h-full">
                
                {/* --- HEADER SECTION --- */}
                <div className="mb-8 shrink-0">
                  <div className="flex items-center justify-between gap-4 h-20">
                    
                    {/* LEFT: Sky Bowl + Mobile Toggle */}
                    <div className="flex items-center gap-4">
                      {/* Mobile Menu Toggle */}
                      <button
                        className="md:hidden h-12 w-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xl hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 font-bold text-lg"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        ☰
                      </button>
                      
                      {/* Sky Bowl - LEFT ALIGNED (Fixed clipping with pb-1) */}
                      <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] pb-1 leading-tight">
                        Sky Bowl
                      </h1>
                    </div>

                    {/* RIGHT: Search + Notification */}
                    <div className="flex items-center gap-4 flex-1 justify-end max-w-2xl">
                      
                      {/* Search Bar */}
                      <div className="relative group flex-1 max-w-md hidden md:block">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/80 group-focus-within:text-emerald-300 transition-colors">
                            <FiSearch className="text-lg" />
                          </span>
                          <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-slate-900/80 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 shadow-xl transition-all duration-300"
                            placeholder="Search dishes..."
                          />
                        </div>
                      </div>

                      {/* Mobile Search (Smaller) */}
                      <div className="md:hidden relative w-36">
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="w-full pl-10 pr-10 py-2.5 rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-xl text-xs text-white placeholder-slate-400 focus:outline-none"
                          placeholder="Search..."
                        />
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 text-sm" />
                      </div>

                      {/* Notification Bell */}
                      <button className="relative group p-3.5 rounded-2xl bg-slate-800/50 border border-white/10 text-white shadow-xl hover:shadow-emerald-500/30 hover:bg-slate-800/80 transition-all duration-300 active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <FiBell className="text-xl relative z-10" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-rose-500 animate-ping border-2 border-slate-900" />
                        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500 border border-slate-900" />
                      </button>
                    </div>
                  </div>

                  {/* Subtitle / Breadcrumb */}
                  {activeView !== 'menu' && (
                    <div className="mt-6 flex items-center gap-3 opacity-90">
                      <div className="h-1 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400" />
                      <p className="text-sm font-bold text-emerald-200 uppercase tracking-[0.3em] drop-shadow-md">
                        {title}
                      </p>
                    </div>
                  )}
                </div>

                {/* SCROLLABLE/STATIC CONTENT */}
                <div className="flex-1 min-h-0">
                  {/* BACK BUTTON */}
                  {showSectionItems && (
                    <div className="mb-6">
                      <button
                        onClick={goBackToMenuCards}
                        className="group flex items-center gap-3 text-emerald-300 hover:text-white text-base font-bold mb-4 transition-all duration-300 hover:translate-x-1"
                      >
                        <FiArrowLeft />
                        <span>Back to Menu</span>
                      </button>
                    </div>
                  )}

                  {/* STATIC PREMIUM MENU CARDS - RESPONSIVE FIX */}
                  {activeView === "menu" && !showSectionItems && (
                    <div className="h-full flex flex-col items-center justify-start pb-24 overflow-y-auto scroll-hide">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-0 pt-4">
                        {MENU_SECTIONS.map((section, idx) => (
                          <MenuSectionCard
                            key={section.id}
                            section={section}
                            onClick={() => handleSectionClick(section.id)}
                            idx={idx}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* SCROLLABLE ITEMS GRID */}
                  {(activeView === "all") && (
                     <div className="h-full overflow-y-auto scroll-hide pb-24">
                        {/* Category chips */}
                        <div className="flex flex-wrap gap-3 mb-8">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`px-6 py-2.5 text-sm font-bold rounded-full border transition-all duration-300 backdrop-blur-xl shadow-lg ${
                                activeCategory === cat
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-emerald-500/40 transform scale-105"
                                  : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* SMART RESPONSIVE GRID - Fixes the "creaming" issue */}
                        <div className="grid gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 min-[1600px]:grid-cols-3 auto-rows-fr">
                          {filteredItems.map((item) => (
                            <MenuCard
                              key={item.id}
                              item={item}
                              addToCart={addToCart}
                            />
                          ))}
                          {filteredItems.length === 0 && (
                            <p className="text-lg text-slate-400 col-span-full text-center py-12 font-medium">
                              No {showSectionItems ? activeMenuSection : "items"} available right now.
                            </p>
                          )}
                        </div>
                     </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT ORDER SUMMARY - INCREASED WIDTH to 96 (384px) */}
          {!userViewOpen && activeView !== "orders" && (
            <aside className="hidden xl:flex h-full w-96 bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-20">
              <div className="p-8 pt-6 pb-4 border-b border-white/10 shrink-0">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-black bg-gradient-to-r from-white via-emerald-100 to-slate-200 bg-clip-text text-transparent tracking-tight">
                    Order Summary
                  </h2>
                  {cartCount > 0 && (
                    <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-bold bg-rose-500 text-white rounded-lg shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>

              <div
                className="flex-1 min-h-0 overflow-y-auto px-4 pb-4 pt-4 scroll-hide"
                style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
              >
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <p className="text-lg font-bold text-slate-300">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Add some Sky Bowls to get started!
                    </p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 mb-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-xl object-cover shadow-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-emerald-400 font-bold">
                          ₹{item.linePrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-rose-500 hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold text-white w-6 text-center">
                          {item.qty}
                        </span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white hover:bg-emerald-400 transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-white/10 pt-6 pb-8 px-8 bg-black/20 shrink-0">
                 <div className="flex justify-between text-xl font-black text-white pt-2">
                    <span>Total</span>
                    <span className="text-emerald-400">₹{total.toFixed(2)}</span>
                  </div>
                <button
                  disabled={cartItems.length === 0}
                  className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-lg shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Checkout
                </button>
              </div>
            </aside>
          )}
        </main>
      </div>
    </>
  );
};

/* --- SUB COMPONENTS --- */

// --- PREMIUM DISH CARD WITH DEEP SPACE GRADIENT ---
const MenuCard = ({ item, addToCart }) => (
  // Updated Background: Lighter, more colorful gradient "Midnight Aurora" style
  <div className="group relative bg-gradient-to-br from-indigo-900/30 via-slate-900/60 to-slate-950/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20 hover:-translate-y-2 hover:border-emerald-500/30 h-full flex flex-col">
    
    {/* Image Section */}
    <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      
      {/* Top Right Grams Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-bold text-white tracking-wide">{item.baseGrams}g</span>
        </div>
      </div>

      {/* Rating Badge */}
      <div className="absolute top-3 left-3 z-10 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
        <span className="text-yellow-400 text-xs">★</span>
        <span className="text-xs font-bold text-white">{item.rating.toFixed(1)}</span>
      </div>
    </div>

    {/* Content Section - Flex Col for Layout Safety */}
    <div className="p-5 flex-1 flex flex-col min-h-0">
      {/* Text Area */}
      <div className="mb-4"> 
        <div className="flex justify-between items-start mb-2 gap-2">
          {/* Clamp title to 1 line to prevent pushing, min-w-0 for flex children */}
          <h3 className="text-lg font-black text-white leading-tight truncate min-w-0 flex-1 group-hover:text-emerald-300 transition-colors">
            {item.name}
          </h3>
          <span className="text-xl font-bold text-emerald-400 whitespace-nowrap drop-shadow-sm shrink-0">
            ₹{item.price}
          </span>
        </div>

        {/* Clamp description to 2 lines MAX. Added mb-2 for spacing from buttons */}
        <p className="text-sm text-slate-300 line-clamp-2 font-medium leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Bottom Action Area - Pushed to bottom with mt-auto */}
      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0 shrink">
           {/* Veg/Non-Veg Indicator */}
           <div className={`h-4 w-4 rounded-md flex items-center justify-center border ${item.type === 'Veg' ? 'border-emerald-500' : 'border-red-500'} shrink-0`}>
              <div className={`h-2 w-2 rounded-full ${item.type === 'Veg' ? 'bg-emerald-500' : 'bg-red-500'}`} />
           </div>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider truncate">{item.category}</span>
        </div>

        {/* Gradient Add Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item.id);
          }}
          className="relative overflow-hidden group/btn px-5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/40 border border-white/10 transition-all duration-300 active:scale-95 shrink-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-white transition-colors">
            Add
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
          </span>
        </button>
      </div>
    </div>
  </div>
);

// --- REFACTORED USER PROFILE PAGE: SINGLE SCREEN DASHBOARD ---
const UserProfilePage = ({ userData, editData, isEditing, onEdit, onSave, onCancel, onLogout, onBack }) => {
  return (
    <div className="flex flex-col h-full bg-slate-900/60 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/10 p-8 lg:p-12 overflow-hidden z-20">
      
      {/* Top Header Row */}
      <div className="flex items-center gap-4 mb-8 shrink-0">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-emerald-400 hover:text-white text-xl font-bold transition-all duration-300 hover:translate-x-1"
        >
          <FiArrowLeft className="text-2xl" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Single-Screen Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        
        {/* LEFT PANEL: IDENTITY CARD */}
        <div className="flex-1 lg:max-w-md bg-white/5 rounded-3xl p-8 flex flex-col items-center justify-center border border-white/5 shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="w-40 h-40 mb-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/10 relative z-10">
             <FiUser className="w-20 h-20 text-white" />
          </div>
          
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 z-10 text-center">
            {userData.name}
          </h1>
          <p className="text-slate-400 font-medium mb-8 z-10">Premium Member</p>

          <button
              onClick={onLogout}
              className="mt-auto w-full py-4 rounded-2xl bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2 z-10"
            >
              <FiLogOut /> Logout
          </button>
        </div>

        {/* RIGHT PANEL: DETAILS & FORM */}
        <div className="flex-[2] bg-white/5 rounded-3xl p-8 lg:p-12 flex flex-col border border-white/5 shadow-xl relative overflow-hidden">
           <div className="flex items-center justify-between mb-8 z-10">
              <h2 className="text-2xl font-bold text-white">Account Details</h2>
               {!isEditing ? (
                <button
                  onClick={onEdit}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold shadow-lg hover:bg-indigo-500 transition-all text-sm"
                >
                  <FiEdit3 /> Edit
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={onSave}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-bold shadow-lg hover:bg-emerald-400 transition-all text-sm"
                  >
                    <FiSave /> Save
                  </button>
                  <button
                    onClick={onCancel}
                    className="px-6 py-3 rounded-xl bg-slate-700 text-white font-bold hover:bg-slate-600 transition-all text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
           </div>

           <div className="space-y-6 z-10 flex-1 flex flex-col justify-center">
               <InputField
                  label="Full Name"
                  value={isEditing ? editData.name : userData.name}
                  onChange={(e) => isEditing && setEditData({...editData, name: e.target.value})}
                  disabled={!isEditing}
                />
                <InputField
                  label="Email Address"
                  type="email"
                  value={isEditing ? editData.email : userData.email}
                  onChange={(e) => isEditing && setEditData({...editData, email: e.target.value})}
                  disabled={!isEditing}
                />
                <InputField
                  label="Phone Number"
                  value={isEditing ? editData.phone : userData.phone}
                  onChange={(e) => isEditing && setEditData({...editData, phone: e.target.value})}
                  disabled={!isEditing}
                />
           </div>
        </div>

      </div>
    </div>
  );
};

const InputField = ({ label, value, onChange, disabled, type = "text" }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-slate-400 uppercase tracking-wide">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full p-4 rounded-xl bg-black/20 border border-white/10 text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    />
  </div>
);

const MenuSectionCard = ({ section, onClick, idx }) => {
  const animationDelay = idx * 100;
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative h-64 md:h-80 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-2"
      style={{
        animation: `slideInUp 0.6s ease-out ${animationDelay}ms forwards`,
        opacity: 0,
      }}
    >
      <div className="absolute inset-0">
        <img
          src={section.image}
          alt={section.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
      </div>

      <div className="relative h-full flex flex-col justify-between p-6 md:p-8 z-10 text-left">
        <div className="flex justify-between items-start">
            <span className="text-4xl md:text-5xl drop-shadow-lg">{section.icon}</span>
            <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                {section.itemCount} items
            </span>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2 drop-shadow-md group-hover:text-emerald-300 transition-colors">
            {section.name}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-2 font-medium">
            {section.description}
          </p>
        </div>
      </div>
    </button>
  );
};

const OrderContent = ({
  cartItems,
  subtotal,
  tax,
  charges,
  total,
  addToCart,
  removeFromCart,
  onBack
}) => (
  <div className="bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] shadow-2xl border border-white/10 p-8 flex flex-col h-full w-full z-20">
    <div className="flex items-center gap-4 mb-8">
      <button
        onClick={onBack}
        className="p-3 rounded-full hover:bg-white/10 text-white transition-all"
      >
         <FiArrowLeft className="text-2xl" />
      </button>
      <h2 className="text-3xl font-black text-white tracking-tight">
        Your Order
      </h2>
    </div>

    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full overflow-hidden">
        {/* Cart List */}
         <div className="flex-1 overflow-y-auto scroll-hide pr-2 space-y-4">
            {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <img src={item.image} className="w-20 h-20 rounded-xl object-cover" />
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-emerald-400 font-bold">₹{item.linePrice.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => removeFromCart(item.id)} className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center hover:bg-rose-500 transition-colors">-</button>
                        <span className="text-xl font-bold text-white">{item.qty}</span>
                        <button onClick={() => addToCart(item.id)} className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-400 transition-colors font-bold">+</button>
                    </div>
                </div>
            ))}
         </div>

         {/* Footer Totals */}
         <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex justify-between text-slate-400 mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>
             <div className="flex justify-between text-slate-400 mb-4">
                <span>Tax & Fees</span>
                <span>₹{(tax + charges).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-3xl font-black text-white mb-8">
                <span>Total</span>
                <span className="text-emerald-400">₹{total.toFixed(2)}</span>
            </div>
            <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl hover:shadow-lg hover:-translate-y-1 transition-all">
                Place Order
            </button>
         </div>
    </div>
  </div>
);

export default CategoryPage;
