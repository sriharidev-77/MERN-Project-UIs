import { useState, useEffect } from "react"
import axios from "axios"

const CategoryPage = () => {
  const [categories, setCategories] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const [activeCategory, setActiveCategory] = useState("All")

  useEffect(() => {
    // Fetch live DB data
    axios.get("http://localhost:9080/category/all")
      .then(res => setCategories(res.data.data || []))
      .catch(err => console.error("Categories error:", err))

    axios.get("http://localhost:9080/menu/all")
      .then(res => setMenuItems(res.data.data || []))
      .catch(err => console.error("Menus error:", err))
  }, [])

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category?.name === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button 
            onClick={() => setActiveCategory("All")}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              activeCategory === "All" 
                ? "bg-orange-500 text-white shadow-lg" 
                : "bg-white/70 hover:bg-orange-200"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat._id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === cat.name
                  ? "bg-orange-500 text-white shadow-lg" 
                  : "bg-white/70 hover:bg-orange-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group">
                <img 
                  src={item.image || "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl">{item.name}</h3>
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-600 font-semibold">
                      {item.category?.name} • {item.type}
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      {item.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {activeCategory === "All" ? "No menu items yet." : `No items in ${activeCategory} category yet. Add via backend!`}
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default CategoryPage
