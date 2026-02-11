// import { useState } from 'react'
// import { useSearchParams, Link } from 'react-router-dom'
// import { Filter, Grid, List, Search, X } from 'lucide-react'
// import Loader from '../components/common/Loader'

// const Products = () => {
//   const [searchParams, setSearchParams] = useSearchParams()
//   const [loading, setLoading] = useState(false)
//   const [viewMode, setViewMode] = useState('grid')
//   const [showFilters, setShowFilters] = useState(false)

//   const categories = [
//     { _id: '1', name: 'T-Shirts', slug: 't-shirts' },
//     { _id: '2', name: 'Mugs', slug: 'mugs' },
//     { _id: '3', name: 'Photo Frames', slug: 'frames' },
//     { _id: '4', name: 'Cushions', slug: 'cushions' },
//     { _id: '5', name: 'Hoodies', slug: 'hoodies' }
//   ]

//   const sampleProducts = [
//     {
//       _id: '1',
//       name: 'Premium Cotton T-Shirt',
//       description: '100% premium cotton, comfortable fit for all-day wear',
//       price: 599,
//       discountPrice: 499,
//       type: 't-shirt',
//       category: '1',
//       rating: 4.8,
//       images: [{ url: '/tshirt.jpg' }]
//     },
//     {
//       _id: '2',
//       name: 'Custom Printed Mug',
//       description: 'High-quality ceramic mug with vibrant print',
//       price: 299,
//       type: 'mug',
//       category: '2',
//       rating: 4.5,
//       images: [{ url: '/mug.jpg' }]
//     },
//     {
//       _id: '3',
//       name: 'Wooden Photo Frame',
//       description: 'Elegant wooden frame for your memories',
//       price: 399,
//       discountPrice: 349,
//       type: 'frame',
//       category: '3',
//       rating: 4.7,
//       images: [{ url: '/frame.jpg' }]
//     },
//     {
//       _id: '4',
//       name: 'Premium Hoodie',
//       description: 'Warm and comfortable hoodie with custom print',
//       price: 899,
//       type: 'hoodie',
//       category: '5',
//       rating: 4.9,
//       images: [{ url: '/hoodie.jpg' }]
//     },
//     {
//       _id: '5',
//       name: 'Round Neck T-Shirt',
//       description: 'Basic round neck t-shirt for daily wear',
//       price: 449,
//       type: 't-shirt',
//       category: '1',
//       rating: 4.3,
//       images: [{ url: '/tshirt2.jpg' }]
//     },
//     {
//       _id: '6',
//       name: 'Travel Mug',
//       description: 'Insulated travel mug keeps drinks hot/cold',
//       price: 549,
//       discountPrice: 499,
//       type: 'mug',
//       category: '2',
//       rating: 4.6,
//       images: [{ url: '/travel-mug.jpg' }]
//     }
//   ]

//   const selectedCategory = searchParams.get('category') || ''

//   if (loading) return <Loader />

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Our Products
//           </h1>
//           <p className="text-gray-600">
//             Customize your favorite products with our design tools
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Filters Sidebar */}
//           <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//             <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={() => setShowFilters(false)}
//                   className="lg:hidden"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* Categories */}
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => setSearchParams({})}
//                     className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
//                   >
//                     All Products
//                   </button>
//                   {categories.map(category => (
//                     <button
//                       key={category._id}
//                       onClick={() => setSearchParams({ category: category.slug })}
//                       className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === category.slug ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
//                     >
//                       {category.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Products Grid */}
//           <div className="flex-1">
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-4">
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow"
//                 >
//                   <Filter className="h-5 w-5" />
//                   Filters
//                 </button>
//                 <p className="text-gray-600">
//                   {sampleProducts.length} products found
//                 </p>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
//                 >
//                   <Grid className="h-5 w-5" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
//                 >
//                   <List className="h-5 w-5" />
//                 </button>
//               </div>
//             </div>

//             {viewMode === 'grid' ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {sampleProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
//                   >
//                     <div className="relative overflow-hidden aspect-square">
//                       <div className="w-full h-full bg-gray-200 flex items-center justify-center">
//                         <div className="text-4xl">🎨</div>
//                       </div>
//                       <Link
//                         to={`/products/${product._id}`}
//                         className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
//                       >
//                         <span className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold">
//                           View Details
//                         </span>
//                       </Link>
//                       {product.discountPrice && (
//                         <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                           Sale
//                         </div>
//                       )}
//                     </div>

//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
//                           {product.type}
//                         </span>
//                         <div className="flex items-center gap-1">
//                           <div className="text-yellow-400">★</div>
//                           <span className="text-sm text-gray-600">{product.rating}</span>
//                         </div>
//                       </div>
                      
//                       <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
//                         {product.name}
//                       </h3>
                      
//                       <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//                         {product.description}
//                       </p>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           {product.discountPrice ? (
//                             <>
//                               <span className="text-2xl font-bold text-gray-900">
//                                 ₹{product.discountPrice}
//                               </span>
//                               <span className="text-lg text-gray-400 line-through">
//                                 ₹{product.price}
//                               </span>
//                             </>
//                           ) : (
//                             <span className="text-2xl font-bold text-gray-900">
//                               ₹{product.price}
//                             </span>
//                           )}
//                         </div>
                        
//                         <Link
//                           to={`/design/${product._id}`}
//                           className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
//                         >
//                           Customize →
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {sampleProducts.map((product) => (
//                   <div
//                     key={product._id}
//                     className="bg-white rounded-2xl shadow-lg p-6 flex gap-6"
//                   >
//                     <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
//                       <div className="text-4xl">🎨</div>
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold text-gray-900 mb-2">
//                         {product.name}
//                       </h3>
//                       <p className="text-gray-600 mb-4">
//                         {product.description}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <span className="text-2xl font-bold text-gray-900">
//                             ₹{product.discountPrice || product.price}
//                           </span>
//                           {product.discountPrice && (
//                             <span className="text-lg text-gray-400 line-through ml-2">
//                               ₹{product.price}
//                             </span>
//                           )}
//                         </div>
//                         <Link to={`/design/${product._id}`} className="btn-primary">
//                           Customize Now
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Products

















import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  X, 
  Star, 
  TrendingUp, 
  Sparkles,
  ShoppingBag,
  Zap,
  Heart,
  ArrowRight,
  ChevronRight,
  Check,
  Palette,
  Shield,
  Truck,
  Gift,
  Clock
} from 'lucide-react'
import Loader from '../components/common/Loader'
import { motion, AnimatePresence } from 'framer-motion'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSort, setSelectedSort] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const categories = [
    { 
      _id: '1', 
      name: 'T-Shirts', 
      slug: 't-shirts',
      icon: '👕',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      _id: '2', 
      name: 'Mugs', 
      slug: 'mugs',
      icon: '☕',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      _id: '3', 
      name: 'Photo Frames', 
      slug: 'frames',
      icon: '🖼️',
      color: 'from-emerald-500 to-green-500'
    },
    { 
      _id: '4', 
      name: 'Cushions', 
      slug: 'cushions',
      icon: '🛋️',
      color: 'from-pink-500 to-rose-500'
    },
    { 
      _id: '5', 
      name: 'Hoodies', 
      slug: 'hoodies',
      icon: '🧥',
      color: 'from-purple-500 to-violet-500'
    },
    { 
      _id: '6', 
      name: 'Caps', 
      slug: 'caps',
      icon: '🧢',
      color: 'from-red-500 to-orange-500'
    },
    { 
      _id: '7', 
      name: 'Phone Cases', 
      slug: 'phone-cases',
      icon: '📱',
      color: 'from-indigo-500 to-blue-500'
    },
    { 
      _id: '8', 
      name: 'Posters', 
      slug: 'posters',
      icon: '📰',
      color: 'from-yellow-500 to-amber-500'
    }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured', icon: <Sparkles className="h-4 w-4" /> },
    { id: 'newest', name: 'Newest', icon: <Zap className="h-4 w-4" /> },
    { id: 'price-low', name: 'Price: Low to High', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'price-high', name: 'Price: High to Low', icon: <TrendingUp className="h-4 w-4 rotate-180" /> },
    { id: 'rating', name: 'Top Rated', icon: <Star className="h-4 w-4" /> }
  ]

  const features = [
    { icon: <Palette className="h-5 w-5" />, text: 'Custom Design' },
    { icon: <Truck className="h-5 w-5" />, text: 'Fast Delivery' },
    { icon: <Shield className="h-5 w-5" />, text: 'Quality Guarantee' },
    { icon: <Gift className="h-5 w-5" />, text: 'Free Shipping' }
  ]

  const sampleProducts = [
    {
      _id: '1',
      name: 'Premium Cotton T-Shirt',
      description: '100% premium cotton, comfortable fit for all-day wear. Perfect for custom prints.',
      price: 599,
      discountPrice: 499,
      type: 't-shirt',
      category: '1',
      rating: 4.8,
      reviews: 128,
      tags: ['Best Seller', 'Trending'],
      colors: ['#000000', '#FFFFFF', '#3B82F6', '#EF4444'],
      sizes: ['S', 'M', 'L', 'XL'],
      images: [{ url: '/tshirt.jpg' }]
    },
    {
      _id: '2',
      name: 'Custom Printed Ceramic Mug',
      description: 'High-quality ceramic mug with vibrant print that lasts. Microwave and dishwasher safe.',
      price: 299,
      type: 'mug',
      category: '2',
      rating: 4.5,
      reviews: 56,
      tags: ['Personalized'],
      colors: ['#FFFFFF', '#000000', '#F59E0B'],
      sizes: ['11oz', '15oz'],
      images: [{ url: '/mug.jpg' }]
    },
    {
      _id: '3',
      name: 'Premium Wooden Photo Frame',
      description: 'Elegant wooden frame with glass protection. Perfect for preserving memories.',
      price: 399,
      discountPrice: 349,
      type: 'frame',
      category: '3',
      rating: 4.7,
      reviews: 89,
      tags: ['New Arrival'],
      colors: ['#92400E', '#1F2937', '#374151'],
      sizes: ['5x7', '8x10', '11x14'],
      images: [{ url: '/frame.jpg' }]
    },
    {
      _id: '4',
      name: 'Premium Zip-up Hoodie',
      description: 'Winter-ready premium hoodie with custom embroidery. Fleece lined for warmth.',
      price: 899,
      type: 'hoodie',
      category: '5',
      rating: 4.9,
      reviews: 204,
      tags: ['Premium', 'Limited'],
      colors: ['#000000', '#1E40AF', '#7C2D12'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      images: [{ url: '/hoodie.jpg' }]
    },
    {
      _id: '5',
      name: 'Round Neck T-Shirt Pack',
      description: 'Pack of 3 basic round neck t-shirts. Great value for daily wear and customization.',
      price: 999,
      discountPrice: 799,
      type: 't-shirt',
      category: '1',
      rating: 4.3,
      reviews: 67,
      tags: ['Bundle Deal'],
      colors: ['#000000', '#FFFFFF', '#6B7280'],
      sizes: ['S', 'M', 'L'],
      images: [{ url: '/tshirt2.jpg' }]
    },
    {
      _id: '6',
      name: 'Insulated Travel Mug',
      description: 'Double-walled insulated travel mug keeps drinks hot/cold for hours.',
      price: 549,
      discountPrice: 499,
      type: 'mug',
      category: '2',
      rating: 4.6,
      reviews: 142,
      tags: ['Insulated'],
      colors: ['#1E40AF', '#374151', '#D1D5DB'],
      sizes: ['16oz', '20oz'],
      images: [{ url: '/travel-mug.jpg' }]
    },
    {
      _id: '7',
      name: 'Custom Embroidered Cap',
      description: 'Adjustable snapback cap with custom embroidery. UV protection fabric.',
      price: 349,
      type: 'cap',
      category: '6',
      rating: 4.4,
      reviews: 45,
      tags: ['Summer Essential'],
      colors: ['#000000', '#FFFFFF', '#DC2626', '#F59E0B'],
      sizes: ['One Size'],
      images: [{ url: '/cap.jpg' }]
    },
    {
      _id: '8',
      name: 'Premium Poster Print',
      description: 'High-quality matte finish poster with vibrant colors. Perfect for wall decor.',
      price: 199,
      discountPrice: 149,
      type: 'poster',
      category: '8',
      rating: 4.8,
      reviews: 93,
      tags: ['Wall Art'],
      colors: ['All Colors'],
      sizes: ['A3', 'A2', '24x36'],
      images: [{ url: '/poster.jpg' }]
    }
  ]

  const selectedCategory = searchParams.get('category') || ''

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredProducts = sampleProducts.filter(product => {
    if (selectedCategory && product.category !== categories.find(c => c.slug === selectedCategory)?._id) {
      return false
    }
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (selectedSort) {
      case 'newest':
        return b._id.localeCompare(a._id)
      case 'price-low':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price)
      case 'price-high':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price)
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  if (loading) return <Loader />

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
          <div className="absolute left-1/4 top-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">50+ Customizable Products</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Discover Amazing <span className="text-secondary-300">Products</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Browse our collection of premium customizable products. 
              Everything you need to bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Features Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-primary-50 text-primary-600 p-2 rounded-lg">
                {feature.icon}
              </div>
              <span className="font-medium text-gray-900">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || window.innerWidth >= 1024) && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={`lg:w-72 ${showFilters ? 'fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:relative' : ''}`}
              >
                <div className={`bg-white rounded-2xl shadow-xl p-6 h-full lg:sticky lg:top-24 ${showFilters ? 'absolute left-0 top-0 h-full w-72 overflow-y-auto lg:relative lg:w-auto lg:h-auto' : ''}`}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Categories
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSearchParams({})}
                        className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl transition-all ${!selectedCategory ? 'bg-gradient-to-r from-primary-50 to-purple-50 text-primary-700 border border-primary-200' : 'hover:bg-gray-50'}`}
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-100 to-purple-100 flex items-center justify-center">
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <span className="font-medium">All Products</span>
                        <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {sampleProducts.length}
                        </span>
                      </button>
                      {categories.map(category => {
                        const count = sampleProducts.filter(p => p.category === category._id).length
                        return (
                          <button
                            key={category._id}
                            onClick={() => setSearchParams({ category: category.slug })}
                            className={`flex items-center gap-3 w-full text-left px-3 py-3 rounded-xl transition-all ${selectedCategory === category.slug ? `bg-gradient-to-r ${category.color.replace('from-', 'from-').replace('to-', 'to-')}/10 text-primary-700 border border-primary-200` : 'hover:bg-gray-50'}`}
                          >
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-lg`}>
                              {category.icon}
                            </div>
                            <span className="font-medium">{category.name}</span>
                            {count > 0 && (
                              <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                {count}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Price Range</h4>
                    <div className="px-2">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">₹{priceRange[0]}</span>
                        <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600"
                      />
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-600 mt-2"
                      />
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Sort By</h4>
                    <div className="space-y-2">
                      {sortOptions.map(option => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedSort(option.id)}
                          className={`flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg transition-all ${selectedSort === option.id ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                        >
                          {option.icon}
                          <span>{option.name}</span>
                          {selectedSort === option.id && (
                            <Check className="h-4 w-4 ml-auto text-primary-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSearchParams({})
                      setSearchTerm('')
                      setPriceRange([0, 5000])
                      setSelectedSort('featured')
                    }}
                    className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Top Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
            >
              <div>
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Filter className="h-5 w-5" />
                  <span className="font-medium">Filters</span>
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-gray-600">
                  Showing <span className="font-bold text-gray-900">{sortedProducts.length}</span> of {sampleProducts.length} products
                </div>
                
                <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-500 text-white shadow-md' : 'hover:bg-gray-100'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => {
                    setSearchParams({})
                    setSearchTerm('')
                    setPriceRange([0, 5000])
                  }}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              </motion.div>
            ) : viewMode === 'grid' ? (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { type: "spring", stiffness: 400 } }}
                    onMouseEnter={() => setHoveredProduct(product._id)}
                    onMouseLeave={() => setHoveredProduct(null)}
                    className="group relative"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100">
                      {/* Product Image */}
                      <div className="relative overflow-hidden aspect-square">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <motion.div 
                            className="text-5xl"
                            animate={{ 
                              scale: hoveredProduct === product._id ? [1, 1.1, 1] : 1,
                              rotate: hoveredProduct === product._id ? [0, 5, -5, 0] : 0
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {product.type === 't-shirt' && '👕'}
                            {product.type === 'mug' && '☕'}
                            {product.type === 'frame' && '🖼️'}
                            {product.type === 'hoodie' && '🧥'}
                            {product.type === 'cap' && '🧢'}
                            {product.type === 'poster' && '📰'}
                          </motion.div>
                        </div>
                        
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.tags.map((tag, i) => (
                            <motion.span 
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: i * 0.1 }}
                              className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                            <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                          </button>
                        </div>
                        
                        {/* Customize Button */}
                        <motion.div 
                          className="absolute bottom-4 left-4 right-4"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ 
                            y: hoveredProduct === product._id ? 0 : 20,
                            opacity: hoveredProduct === product._id ? 1 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <Link
                            to={`/design/${product._id}`}
                            className="block w-full bg-white text-gray-900 py-3 rounded-full font-semibold text-center hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
                          >
                            Customize Now
                          </Link>
                        </motion.div>
                      </div>

                      {/* Product Details */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                            {product.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                            <span className="text-sm text-gray-400">({product.reviews})</span>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Color Swatches */}
                        <div className="flex items-center gap-2 mb-4">
                          {product.colors.slice(0, 4).map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded-full border border-gray-200 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                          {product.colors.length > 4 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
                          )}
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">
                                ₹{product.discountPrice || product.price}
                              </span>
                              {product.discountPrice && (
                                <>
                                  <span className="text-lg text-gray-400 line-through">
                                    ₹{product.price}
                                  </span>
                                  <span className="text-sm font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                    Save ₹{product.price - product.discountPrice}
                                  </span>
                                </>
                              )}
                            </div>
                            {product.discountPrice && (
                              <div className="text-xs text-gray-500 mt-1">
                                <Clock className="inline h-3 w-3 mr-1" />
                                Offer ends soon
                              </div>
                            )}
                          </div>
                          
                          <Link
                            to={`/products/${product._id}`}
                            className="group/cta inline-flex items-center gap-1 text-primary-600 hover:text-primary-700 font-semibold text-sm"
                          >
                            Details
                            <ChevronRight className="h-4 w-4 group-hover/cta:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {sortedProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { type: "spring", stiffness: 400 } }}
                    className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6 group hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="md:w-48 md:h-48 w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <motion.div 
                        className="text-5xl"
                        animate={{ 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          scale: { duration: 3, repeat: Infinity },
                          rotate: { duration: 2, repeat: Infinity }
                        }}
                      >
                        {product.type === 't-shirt' && '👕'}
                        {product.type === 'mug' && '☕'}
                        {product.type === 'frame' && '🖼️'}
                        {product.type === 'hoodie' && '🧥'}
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                              {product.type}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{product.rating}</span>
                              <span className="text-sm text-gray-400">({product.reviews})</span>
                            </div>
                            {product.tags.map((tag, i) => (
                              <span key={i} className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100">
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {product.description}
                          </p>
                          
                          <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700 font-medium">Colors:</span>
                              <div className="flex gap-1">
                                {product.colors.slice(0, 3).map((color, i) => (
                                  <div
                                    key={i}
                                    className="w-5 h-5 rounded-full border border-gray-200"
                                    style={{ backgroundColor: color }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-700 font-medium">Sizes:</span>
                              <div className="flex gap-1">
                                {product.sizes.map((size, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded">
                                    {size}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end gap-4">
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{product.discountPrice || product.price}
                            </div>
                            {product.discountPrice && (
                              <>
                                <div className="text-lg text-gray-400 line-through">
                                  ₹{product.price}
                                </div>
                                <div className="text-sm font-bold text-red-600">
                                  Save ₹{product.price - product.discountPrice}
                                </div>
                              </>
                            )}
                          </div>
                          
                          <div className="flex gap-3">
                            <Link
                              to={`/design/${product._id}`}
                              className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
                            >
                              <Palette className="h-5 w-5" />
                              Customize Now
                            </Link>
                            <Link
                              to={`/products/${product._id}`}
                              className="inline-flex items-center gap-2 border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-full font-semibold hover:bg-primary-50 transition-colors"
                            >
                              View Details
                              <ArrowRight className="h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products