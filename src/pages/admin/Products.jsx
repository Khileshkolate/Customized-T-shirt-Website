// import { useState, useEffect } from 'react';
// import { 
//   Plus, Search, Filter, Edit2, Trash2, Eye,
//   Package, Tag, DollarSign, TrendingUp
// } from 'lucide-react';
// import DataTable from '../../components/admin/DataTable';
// import Modal from '../../components/common/Modal';
// import axios from '../../utils/axiosInstance';
// import toast from 'react-hot-toast';

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('all');

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     filterProducts();
//   }, [searchTerm, categoryFilter, products]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('/products');
//       setProducts(response.data.data || []);
//       setFilteredProducts(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//       toast.error('Failed to load products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterProducts = () => {
//     let filtered = [...products];

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(product =>
//         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (categoryFilter !== 'all') {
//       filtered = filtered.filter(product => product.type === categoryFilter);
//     }

//     setFilteredProducts(filtered);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this product?')) {
//       return;
//     }

//     try {
//       await axios.delete(`/products/${id}`);
//       toast.success('Product deleted successfully');
//       fetchProducts(); // Refresh list
//     } catch (error) {
//       console.error('Error deleting product:', error);
//       toast.error('Failed to delete product');
//     }
//   };

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const handleAddNew = () => {
//     setSelectedProduct(null);
//     setShowModal(true);
//   };

//   const productColumns = [
//     { key: 'image', label: 'Image' },
//     { key: 'name', label: 'Name' },
//     { key: 'type', label: 'Type' },
//     { key: 'price', label: 'Price' },
//     { key: 'stock', label: 'Stock' },
//     { key: 'status', label: 'Status' },
//     { key: 'actions', label: 'Actions' }
//   ];

//   const productData = filteredProducts.map(product => ({
//     image: (
//       <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
//         {product.images?.[0] ? (
//           <img 
//             src={product.images[0].url} 
//             alt={product.name}
//             className="w-full h-full object-cover rounded"
//           />
//         ) : (
//           <Package className="h-5 w-5 text-gray-500" />
//         )}
//       </div>
//     ),
//     name: (
//       <div>
//         <div className="font-medium">{product.name}</div>
//         <div className="text-sm text-gray-500 truncate max-w-xs">
//           {product.description}
//         </div>
//       </div>
//     ),
//     type: (
//       <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
//         {product.type}
//       </span>
//     ),
//     price: `₹${product.price}`,
//     stock: (
//       <span className={`font-medium ${
//         product.stock > 20 ? 'text-green-600' : 
//         product.stock > 0 ? 'text-yellow-600' : 'text-red-600'
//       }`}>
//         {product.stock}
//       </span>
//     ),
//     status: (
//       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//         product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//       }`}>
//         {product.isActive ? 'Active' : 'Inactive'}
//       </span>
//     ),
//     actions: (
//       <div className="flex items-center gap-2">
//         <button 
//           onClick={() => handleEdit(product)}
//           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
//         >
//           <Edit2 className="h-4 w-4" />
//         </button>
//         <button 
//           onClick={() => handleDelete(product._id)}
//           className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//       </div>
//     )
//   }));

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Products</h1>
//           <p className="text-gray-600">Manage your products and inventory</p>
//         </div>
//         <button
//           onClick={handleAddNew}
//           className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//         >
//           <Plus className="h-5 w-5" />
//           Add Product
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white rounded-xl shadow-lg p-4">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//               />
//             </div>
//           </div>
          
//           <div className="flex gap-3">
//             <select
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//             >
//               <option value="all">All Categories</option>
//               <option value="t-shirt">T-Shirts</option>
//               <option value="mug">Mugs</option>
//               <option value="hoodie">Hoodies</option>
//               <option value="frame">Frames</option>
//               <option value="cap">Caps</option>
//             </select>
            
//             <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
//               <Filter className="h-5 w-5" />
//               More Filters
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Products Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <DataTable 
//           columns={productColumns} 
//           data={productData} 
//           itemsPerPage={10}
//         />
//       </div>

//       {/* Product Modal */}
//       <Modal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         title={selectedProduct ? 'Edit Product' : 'Add New Product'}
//         size="lg"
//       >
//         <div className="space-y-4">
//           <p className="text-gray-600">
//             Product form will appear here. Implement based on your requirements.
//           </p>
//           <div className="flex justify-end gap-3 pt-4 border-t">
//             <button
//               onClick={() => setShowModal(false)}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 // Handle save
//                 toast.success(selectedProduct ? 'Product updated' : 'Product added');
//                 setShowModal(false);
//                 fetchProducts();
//               }}
//               className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//             >
//               {selectedProduct ? 'Update Product' : 'Create Product'}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default AdminProducts;















// src/pages/admin/Products.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Package, Grid, List, X, Check, Upload,
  Tag, DollarSign, Hash, Type, Image as ImageIcon
} from 'lucide-react';
import axios from '../../utils/axiosInstance';
import { motion, AnimatePresence } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    type: 't-shirt',
    category: '1',
    stock: '',
    tags: [],
    colors: ['#000000', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: []
  });

  const categories = [
    { id: 'all', name: 'All Products', icon: '📦' },
    { id: '1', name: 'T-Shirts', icon: '👕' },
    { id: '2', name: 'Mugs', icon: '☕' },
    { id: '3', name: 'Photo Frames', icon: '🖼️' },
    { id: '5', name: 'Hoodies', icon: '🧥' },
    { id: '6', name: 'Caps', icon: '🧢' },
    { id: '7', name: 'Phone Cases', icon: '📱' },
    { id: '8', name: 'Posters', icon: '📰' }
  ];

  const productTypes = [
    { value: 't-shirt', label: 'T-Shirt', icon: '👕' },
    { value: 'mug', label: 'Mug', icon: '☕' },
    { value: 'hoodie', label: 'Hoodie', icon: '🧥' },
    { value: 'frame', label: 'Photo Frame', icon: '🖼️' },
    { value: 'cap', label: 'Cap', icon: '🧢' },
    { value: 'phone-case', label: 'Phone Case', icon: '📱' },
    { value: 'poster', label: 'Poster', icon: '📰' },
    { value: 'cushion', label: 'Cushion', icon: '🛋️' }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/products', newProduct);
      setShowAddModal(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        type: 't-shirt',
        category: '1',
        stock: '',
        tags: [],
        colors: ['#000000', '#FFFFFF'],
        sizes: ['S', 'M', 'L', 'XL'],
        images: []
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600">Manage your products inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
          
          <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'hover:bg-gray-100'}`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
            {selectedCategory === category.id && (
              <Check className="h-4 w-4" />
            )}
          </button>
        ))}
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adding a new product or adjusting your filters</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700"
          >
            <Plus className="h-5 w-5" />
            Add Your First Product
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-4xl">
                  {product.type === 't-shirt' && '👕'}
                  {product.type === 'mug' && '☕'}
                  {product.type === 'hoodie' && '🧥'}
                  {product.type === 'frame' && '🖼️'}
                  {product.type === 'cap' && '🧢'}
                  {product.type === 'phone-case' && '📱'}
                  {product.type === 'poster' && '📰'}
                </span>
                {product.discountPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl">
                    <Eye className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl">
                    <Edit className="h-5 w-5 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                    {product.type}
                  </span>
                  <span className="text-sm text-gray-500">{product.stock || 0} in stock</span>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{product.price}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors?.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    to={`/design/${product._id}`}
                    className="flex-1 text-center py-2 bg-primary-50 text-primary-700 rounded-lg hover:bg-primary-100 transition-colors text-sm font-medium"
                  >
                    Preview
                  </Link>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">
                          {product.type === 't-shirt' && '👕'}
                          {product.type === 'mug' && '☕'}
                          {product.type === 'hoodie' && '🧥'}
                          {product.type === 'frame' && '🖼️'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {product.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">₹{product.discountPrice || product.price}</div>
                    {product.discountPrice && (
                      <div className="text-sm text-gray-400 line-through">₹{product.price}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      (product.stock || 0) > 10 ? 'bg-green-100 text-green-800' :
                      (product.stock || 0) > 0 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.stock || 0} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Product Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name
                      </label>
                      <div className="relative">
                        <Type className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>

                    {/* Product Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Type
                      </label>
                      <select
                        value={newProduct.type}
                        onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      >
                        {productTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          required
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                          placeholder="Enter price"
                        />
                      </div>
                    </div>

                    {/* Discount Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Discount Price (₹) <span className="text-gray-400">Optional</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          value={newProduct.discountPrice}
                          onChange={(e) => setNewProduct({...newProduct, discountPrice: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                          placeholder="Enter discount price"
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          required
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                          placeholder="Enter stock quantity"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      >
                        {categories.slice(1).map(category => (
                          <option key={category.id} value={category.id}>
                            {category.icon} {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows="3"
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                      placeholder="Enter product description"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags <span className="text-gray-400">(Separate by commas)</span>
                    </label>
                    <div className="relative">
                      <Tag className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={newProduct.tags.join(', ')}
                        onChange={(e) => setNewProduct({...newProduct, tags: e.target.value.split(', ').filter(tag => tag)})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        placeholder="e.g., Best Seller, Trending, New"
                      />
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Colors <span className="text-gray-400">(Hex codes)</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...newProduct.colors];
                              newColors[index] = e.target.value;
                              setNewProduct({...newProduct, colors: newColors});
                            }}
                            className="w-10 h-10 rounded-lg cursor-pointer"
                          />
                          <input
                            type="text"
                            value={color}
                            onChange={(e) => {
                              const newColors = [...newProduct.colors];
                              newColors[index] = e.target.value;
                              setNewProduct({...newProduct, colors: newColors});
                            }}
                            className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="#000000"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newColors = newProduct.colors.filter((_, i) => i !== index);
                              setNewProduct({...newProduct, colors: newColors});
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setNewProduct({
                          ...newProduct,
                          colors: [...newProduct.colors, '#000000']
                        })}
                        className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-primary-500 hover:text-primary-600"
                      >
                        <Plus className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {newProduct.sizes.map((size, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={size}
                            onChange={(e) => {
                              const newSizes = [...newProduct.sizes];
                              newSizes[index] = e.target.value;
                              setNewProduct({...newProduct, sizes: newSizes});
                            }}
                            className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="S, M, L"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSizes = newProduct.sizes.filter((_, i) => i !== index);
                              setNewProduct({...newProduct, sizes: newSizes});
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setNewProduct({
                          ...newProduct,
                          sizes: [...newProduct.sizes, 'New']
                        })}
                        className="px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg flex items-center gap-2 hover:border-primary-500 hover:text-primary-600"
                      >
                        <Plus className="h-5 w-5" />
                        Add Size
                      </button>
                    </div>
                  </div>

                  {/* Images Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">Drag & drop images here or click to upload</p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium"
                      >
                        <Upload className="inline h-4 w-4 mr-2" />
                        Upload Images
                      </button>
                    </div>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;