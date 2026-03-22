// import { useState, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { 
//   ShoppingBag, 
//   User, 
//   Menu, 
//   X, 
//   Search, 
//   Palette,
//   LogOut,
//   ChevronDown
// } from 'lucide-react'
// import { useAuth } from '../../contexts/AuthContext'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isProfileOpen, setIsProfileOpen] = useState(false)
//   const { user, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Products', path: '/products' },
//     { name: 'Design Studio', path: '/designer' },
//   ]

//   const handleLogout = () => {
//     logout()
//     setIsProfileOpen(false)
//   }

//   return (
//     <nav className="sticky top-0 z-50 bg-white shadow-md">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2">
//             <Palette className="h-8 w-8 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">
//               Print<span className="text-primary-600">Craft</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map(link => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-4">
//             {/* Cart */}
//             <Link to="/cart" className="p-2 hover:bg-gray-100 rounded-full">
//               <ShoppingBag className="h-6 w-6 text-gray-700" />
//             </Link>

//             {/* User Menu */}
//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <div className="h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
//                     <User className="h-5 w-5 text-primary-600" />
//                   </div>
//                   <span className="hidden md:inline font-medium text-gray-700">
//                     {user?.name?.split(' ')[0] || 'User'}
//                   </span>
//                   <ChevronDown className="h-4 w-4 text-gray-500" />
//                 </button>
                
//                 {/* Dropdown */}
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
//                     <Link
//                       to="/profile"
//                       className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors"
//                       onClick={() => setIsProfileOpen(false)}
//                     >
//                       <User className="h-4 w-4" />
//                       Profile
//                     </Link>
//                     <Link
//                       to="/orders"
//                       className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 transition-colors"
//                       onClick={() => setIsProfileOpen(false)}
//                     >
//                       <ShoppingBag className="h-4 w-4" />
//                       My Orders
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-gray-50 transition-colors"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center gap-3">
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors font-medium"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             <div className="space-y-3">
//               {navLinks.map(link => (
//                 <Link
//                   key={link.name}
//                   to={link.path}
//                   className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
              
//               {!isAuthenticated && (
//                 <>
//                   <Link
//                     to="/login"
//                     className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register"
//                     className="block px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navbar






















// import { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { 
//   ShoppingBag, 
//   User, 
//   Menu, 
//   X, 
//   Search, 
//   Palette,
//   LogOut,
//   ChevronDown,
//   Sparkles,
//   Tag,
//   Printer,
//   Layers,
//   Package
// } from 'lucide-react'
// import { useAuth } from '../../contexts/AuthContext'
// import { motion, AnimatePresence } from 'framer-motion'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isProfileOpen, setIsProfileOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchSuggestions, setSearchSuggestions] = useState([])
//   const [isSearchFocused, setIsSearchFocused] = useState(false)
//   const { user, logout, isAuthenticated } = useAuth()
//   const navigate = useNavigate()
//   const searchRef = useRef(null)
//   const searchInputRef = useRef(null)

//   const navLinks = [
//     { name: 'Home', path: '/', icon: <Sparkles className="h-4 w-4" /> },
//     { name: 'Products', path: '/products', icon: <Package className="h-4 w-4" /> },
//     { name: 'Design Studio', path: '/designer', icon: <Palette className="h-4 w-4" /> },
//   ]

//   // Search suggestions data
//   const searchCategories = [
//     { icon: <Tag className="h-4 w-4" />, name: 'Business Cards', category: 'Printing' },
//     { icon: <Printer className="h-4 w-4" />, name: 'Banners', category: 'Large Format' },
//     { icon: <Layers className="h-4 w-4" />, name: 'Brochures', category: 'Marketing' },
//     { icon: <Package className="h-4 w-4" />, name: 'Packaging', category: 'Custom' },
//   ]

//   // Filter suggestions based on search query
//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setSearchSuggestions(searchCategories)
//     } else {
//       const filtered = searchCategories.filter(item =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.category.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//       setSearchSuggestions(filtered)
//     }
//   }, [searchQuery])

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setIsSearchOpen(false)
//         setIsSearchFocused(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleLogout = () => {
//     logout()
//     setIsProfileOpen(false)
//   }

//   const handleSearchSubmit = (e) => {
//     e.preventDefault()
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
//       setIsSearchOpen(false)
//       setSearchQuery('')
//       setIsSearchFocused(false)
//     }
//   }

//   const handleSuggestionClick = (suggestion) => {
//     navigate(`/search?q=${encodeURIComponent(suggestion.name)}`)
//     setIsSearchOpen(false)
//     setSearchQuery('')
//     setIsSearchFocused(false)
//   }

//   const handleSearchClick = () => {
//     setIsSearchOpen(true)
//     setTimeout(() => {
//       searchInputRef.current?.focus()
//     }, 100)
//   }

//   return (
//     <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link 
//             to="/" 
//             className="flex items-center gap-2 group"
//             onClick={() => {
//               setIsMenuOpen(false)
//               setIsSearchOpen(false)
//             }}
//           >
//             <motion.div
//               whileHover={{ rotate: 15 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Palette className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
//             </motion.div>
//             <span className="text-2xl font-bold text-gray-900 tracking-tight">
//               Print<span className="text-primary-600 group-hover:text-primary-700 transition-colors">Craft</span>
//             </span>
//           </Link>

//           {/* Desktop Navigation with Search */}
//           <div className="hidden lg:flex items-center gap-6 flex-1 max-w-2xl mx-8">
//             {navLinks.map((link, index) => (
//               <motion.div
//                 key={link.name}
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Link
//                   to={link.path}
//                   className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200 group"
//                 >
//                   <span className="opacity-70 group-hover:opacity-100 transition-opacity">
//                     {link.icon}
//                   </span>
//                   {link.name}
//                 </Link>
//               </motion.div>
//             ))}

//             {/* Search Box */}
//             <div className="relative flex-1" ref={searchRef}>
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <div className="relative">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => {
//                       setIsSearchFocused(true)
//                       setIsSearchOpen(true)
//                     }}
//                     placeholder="Search products, designs, categories..."
//                     className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 hover:bg-gray-100"
//                   />
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={() => setSearchQuery('')}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   )}
//                 </div>

//                 {/* Search Suggestions Dropdown */}
//                 <AnimatePresence>
//                   {isSearchOpen && isSearchFocused && searchSuggestions.length > 0 && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: 10 }}
//                       className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
//                     >
//                       {searchSuggestions.map((suggestion, index) => (
//                         <motion.button
//                           key={suggestion.name}
//                           initial={{ opacity: 0, x: -10 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.05 }}
//                           type="button"
//                           onClick={() => handleSuggestionClick(suggestion)}
//                           className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors text-left group"
//                         >
//                           <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
//                             {suggestion.icon}
//                           </div>
//                           <div>
//                             <div className="font-medium text-gray-900 group-hover:text-primary-700">
//                               {suggestion.name}
//                             </div>
//                             <div className="text-sm text-gray-500">
//                               {suggestion.category}
//                             </div>
//                           </div>
//                         </motion.button>
//                       ))}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </form>
//             </div>
//           </div>

//           {/* Right Side Actions */}
//           <div className="flex items-center gap-3">
//             {/* Mobile Search Button */}
//             <button
//               onClick={handleSearchClick}
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <Search className="h-6 w-6 text-gray-700" />
//             </button>

//             {/* Cart */}
//             <Link 
//               to="/cart" 
//               className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
//               onClick={() => {
//                 setIsMenuOpen(false)
//                 setIsSearchOpen(false)
//               }}
//             >
//               <ShoppingBag className="h-6 w-6 text-gray-700 group-hover:text-primary-600 transition-colors" />
//               <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                 3
//               </span>
//             </Link>

//             {/* User Menu */}
//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors group"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     className="h-9 w-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center"
//                   >
//                     <User className="h-5 w-5 text-primary-700" />
//                   </motion.div>
//                   <span className="hidden md:inline font-medium text-gray-700 group-hover:text-primary-700">
//                     {user?.name?.split(' ')[0] || 'User'}
//                   </span>
//                   <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//                 </button>
                
//                 {/* Dropdown */}
//                 <AnimatePresence>
//                   {isProfileOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                       className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
//                     >
//                       <div className="px-4 py-3 border-b border-gray-100">
//                         <div className="font-semibold text-gray-900">{user?.name}</div>
//                         <div className="text-sm text-gray-500 truncate">{user?.email}</div>
//                       </div>
                      
//                       <Link
//                         to="/profile"
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         <User className="h-4 w-4 text-gray-600" />
//                         <span>My Profile</span>
//                       </Link>
//                       <Link
//                         to="/orders"
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         <ShoppingBag className="h-4 w-4 text-gray-600" />
//                         <span>My Orders</span>
//                       </Link>
//                       <Link
//                         to="/designs"
//                         className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         <Palette className="h-4 w-4 text-gray-600" />
//                         <span>My Designs</span>
//                       </Link>
                      
//                       <div className="border-t border-gray-100 my-2"></div>
                      
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
//                       >
//                         <LogOut className="h-4 w-4" />
//                         <span>Logout</span>
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ) : (
//               <div className="hidden md:flex items-center gap-2">
//                 <Link
//                   to="/login"
//                   className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
//                   onClick={() => {
//                     setIsMenuOpen(false)
//                     setIsSearchOpen(false)
//                   }}
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-5 py-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
//                   onClick={() => {
//                     setIsMenuOpen(false)
//                     setIsSearchOpen(false)
//                   }}
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search (Full Width) */}
//         <AnimatePresence>
//           {isSearchOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden border-t border-gray-100 pt-4 pb-4"
//             >
//               <form onSubmit={handleSearchSubmit} className="relative">
//                 <div className="relative">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => setIsSearchFocused(true)}
//                     placeholder="Search for printing products..."
//                     className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
//                   />
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                   {searchQuery && (
//                     <button
//                       type="button"
//                       onClick={() => setSearchQuery('')}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     >
//                       <X className="h-4 w-4" />
//                     </button>
//                   )}
//                 </div>
                
//                 {/* Mobile Search Suggestions */}
//                 {isSearchFocused && searchSuggestions.length > 0 && (
//                   <div className="mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
//                     {searchSuggestions.map((suggestion) => (
//                       <button
//                         key={suggestion.name}
//                         type="button"
//                         onClick={() => handleSuggestionClick(suggestion)}
//                         className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
//                       >
//                         <div className="p-2 bg-primary-100 rounded-lg">
//                           {suggestion.icon}
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-900">
//                             {suggestion.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {suggestion.category}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && !isSearchOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               className="lg:hidden border-t border-gray-100"
//             >
//               <div className="py-4 space-y-1">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     to={link.path}
//                     className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span className="text-primary-600">
//                       {link.icon}
//                     </span>
//                     {link.name}
//                   </Link>
//                 ))}
                
//                 {!isAuthenticated && (
//                   <>
//                     <Link
//                       to="/login"
//                       className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="block mx-4 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-colors text-center font-medium"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       Create Account
//                     </Link>
//                   </>
//                 )}
                
//                 {isAuthenticated && (
//                   <>
//                     <div className="border-t border-gray-200 my-2 pt-2">
//                       <Link
//                         to="/profile"
//                         className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <User className="h-5 w-5" />
//                         My Profile
//                       </Link>
//                       <Link
//                         to="/orders"
//                         className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         <ShoppingBag className="h-5 w-5" />
//                         My Orders
//                       </Link>
//                     </div>
//                     <button
//                       onClick={handleLogout}
//                       className="w-full text-left flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <LogOut className="h-5 w-5" />
//                       Logout
//                     </button>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </nav>
//   )
// }

// export default Navbar



















import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  Search, 
  Palette,
  LogOut,
  ChevronDown,
  Home,
  ShoppingCart,
  Package,
  Tag,
  Printer,
  Layers
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const searchTimeoutRef = useRef(null)

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Products', path: '/products', icon: <Package className="h-4 w-4" /> },
    { name: 'Design Studio', path: '/designer', icon: <Palette className="h-4 w-4" /> },
  ]

  // Search suggestions data
  const searchCategories = [
    { icon: <Tag className="h-4 w-4" />, name: 'Business Cards', category: 'Printing' },
    { icon: <Printer className="h-4 w-4" />, name: 'Banners', category: 'Large Format' },
    { icon: <Layers className="h-4 w-4" />, name: 'Brochures', category: 'Marketing' },
    { icon: <Package className="h-4 w-4" />, name: 'Packaging', category: 'Custom' },
    { icon: <Tag className="h-4 w-4" />, name: 'Letterheads', category: 'Stationery' },
    { icon: <Printer className="h-4 w-4" />, name: 'Flyers', category: 'Marketing' },
    { icon: <Layers className="h-4 w-4" />, name: 'Posters', category: 'Large Format' },
    { icon: <Package className="h-4 w-4" />, name: 'Stickers', category: 'Labels' },
  ]

  // Custom debounce function
  const debounce = (func, delay) => {
    let timer
    return function(...args) {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), delay)
    }
  }

  // Debounced search function
  const handleSearchDebounced = useCallback(
    debounce((query) => {
      if (query.trim() === '') {
        setSearchSuggestions(searchCategories.slice(0, 4))
        setIsSearching(false)
      } else {
        setIsSearching(true)
        // Simulate API delay
        setTimeout(() => {
          const filtered = searchCategories.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 6)
          setSearchSuggestions(filtered)
          setIsSearching(false)
        }, 200)
      }
    }, 300),
    []
  )

  // Handle search query changes
  useEffect(() => {
    handleSearchDebounced(searchQuery)
    
    // Clear timeout on unmount
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, handleSearchDebounced])

  // Initialize with top 4 suggestions
  useEffect(() => {
    setSearchSuggestions(searchCategories.slice(0, 4))
  }, [])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false)
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle escape key to close search
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false)
        setIsSearchFocused(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [isSearchOpen])

  const handleLogout = () => {
    logout()
    setIsProfileOpen(false)
    setIsMenuOpen(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
      setIsSearchFocused(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search?q=${encodeURIComponent(suggestion.name)}`)
    setIsSearchOpen(false)
    setSearchQuery('')
    setIsSearchFocused(false)
  }

  const handleSearchClick = () => {
    setIsSearchOpen(true)
    setTimeout(() => {
      searchInputRef.current?.focus()
    }, 100)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    searchInputRef.current?.focus()
  }

  // Close all dropdowns when navigating
  const handleNavigation = () => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
    setIsSearchOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group flex-shrink-0"
            onClick={handleNavigation}
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Palette className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
            </motion.div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight hidden sm:block">
              Print<span className="text-primary-600 group-hover:text-primary-700 transition-colors">Craft</span>
            </span>
          </Link>

          {/* Desktop Navigation with Search */}
          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-3xl mx-6">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={link.path}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-medium transition-all duration-200 group"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <span className="text-primary-600 opacity-80 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </Link>
              </motion.div>
            ))}

            {/* Search Box */}
            <div className="relative flex-1 max-w-xl" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.01 }}
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      setIsSearchFocused(true)
                      setIsSearchOpen(true)
                    }}
                    placeholder="Search products, designs, categories..."
                    className="w-full pl-12 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200 hover:bg-gray-100"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {isSearching ? (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : searchQuery ? (
                    <motion.button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  ) : null}
                </motion.div>

                {/* Search Suggestions Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && isSearchFocused && searchSuggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 overflow-hidden"
                    >
                      <div className="px-3 pb-2 border-b border-gray-100">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {searchQuery ? 'Search Results' : 'Popular Searches'}
                        </p>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {searchSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={`${suggestion.name}-${index}`}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-50 transition-colors text-left group"
                          >
                            <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                              {suggestion.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 group-hover:text-primary-700 truncate">
                                {suggestion.name}
                              </div>
                              <div className="text-sm text-gray-500 truncate">
                                {suggestion.category}
                              </div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-300 group-hover:text-primary-400 transform -rotate-90" />
                          </motion.button>
                        ))}
                      </div>
                      {searchQuery && (
                        <div className="border-t border-gray-100 pt-2 px-4">
                          <button
                            type="submit"
                            className="w-full text-center py-2.5 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                          >
                            Search for "{searchQuery}"
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Button */}
            <motion.button
              onClick={handleSearchClick}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </motion.button>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors group"
              onClick={handleNavigation}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 group-hover:text-primary-600 transition-colors" />
              </motion.div>
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-sm">
                3
              </span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-sm">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary-700" />
                    )}
                  </div>
                  <span className="hidden md:inline font-medium text-gray-700 group-hover:text-primary-700 text-sm sm:text-base">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown className={`hidden sm:block h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </motion.button>
                
                {/* Dropdown */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900 truncate">{user?.name}</div>
                        <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link
                          to="/designs"
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-gray-700"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <Palette className="h-4 w-4" />
                          <span>My Designs</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={handleNavigation}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-medium shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                  onClick={handleNavigation}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search (Full Width) */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 pt-4 pb-4"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="Search for printing products..."
                    className="w-full pl-12 pr-10 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                {/* Mobile Search Suggestions */}
                {isSearchFocused && searchSuggestions.length > 0 && (
                  <motion.div 
                    className="mt-3 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="px-3 pb-2">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {searchQuery ? 'Results' : 'Suggestions'}
                      </p>
                    </div>
                    {searchSuggestions.map((suggestion) => (
                      <button
                        key={suggestion.name}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="p-2 bg-primary-100 rounded-lg">
                          {suggestion.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {suggestion.category}
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchQuery && (
                      <div className="border-t border-gray-100 pt-2 px-4 mt-2">
                        <button
                          type="submit"
                          className="w-full text-center py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                          Search for "{searchQuery}"
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && !isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center gap-3 px-4 py-3.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-primary-600">
                      {link.icon}
                    </span>
                    <span className="font-medium">{link.name}</span>
                  </Link>
                ))}
                
                {!isAuthenticated && (
                  <div className="pt-2 space-y-3">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 text-center font-medium shadow-sm"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                )}
                
                {isAuthenticated && (
                  <div className="pt-2">
                    <div className="border-t border-gray-200 pt-4">
                      <div className="px-4 pb-3">
                        <div className="font-semibold text-gray-900">{user?.name}</div>
                        <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                      </div>
                      
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">My Profile</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <ShoppingBag className="h-5 w-5" />
                        <span className="font-medium">My Orders</span>
                      </Link>
                      <Link
                        to="/designs"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Palette className="h-5 w-5" />
                        <span className="font-medium">My Designs</span>
                      </Link>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-3"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar