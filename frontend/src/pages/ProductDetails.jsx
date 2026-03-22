import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, Star, ChevronRight, ShoppingBag, Palette, ArrowLeft, Check } from 'lucide-react';
import Loader from '../components/common/Loader';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';



const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Selection States
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        
        if (response.ok) {
           setProduct(data);
           if (data.colors?.length > 0) setSelectedColor(data.colors[0]);
           if (data.sizes?.length > 0) setSelectedSize(data.sizes[0]);
        }
        setLoading(false);
      } catch (error) {
         console.error('Error fetching product:', error);
         setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    
    addToCart({
      productId: product._id,
      productName: product.name,
      price: product.discountPrice || product.price,
      image: product.images?.[0]?.url,
      color: selectedColor,
      size: selectedSize,
      quantity,
      designId: null
    });
    
    toast.success('Added to cart!');
  };
  
  const handleCustomize = () => {
    // Navigate to designer with params
    navigate(`/designer?product=${product._id}&color=${encodeURIComponent(selectedColor)}&size=${selectedSize}`);
  };

  if (loading) return <Loader />;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/products" className="hover:text-primary-600">Products</Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8"
          >
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 ${
                    activeImage === idx ? 'ring-2 ring-primary-600' : 'ring-1 ring-gray-200'
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-2xl">
                    {/* Fallback image placeholder icon */}
                    🎨
                  </div>
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 aspect-square md:aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative shadow-inner flex items-center justify-center">
              <div className="text-9xl opacity-20 filter grayscale">
                👕
              </div>
              {product.tags?.[0] && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold shadow-sm">
                  {product.tags[0]}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details right col */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-10 px-4 sm:px-0 lg:mt-0"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-primary-600">{product.reviews || 0} reviews</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-end gap-4 mb-6">
              {product.discountPrice ? (
                <>
                  <span className="text-4xl font-black text-gray-900">₹{product.discountPrice}</span>
                  <span className="text-xl text-gray-400 line-through font-medium mb-1">₹{product.price}</span>
                  <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm mb-1 ml-2">
                    Save ₹{product.price - product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-4xl font-black text-gray-900">₹{product.price}</span>
              )}
            </div>

            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-8 border-t border-gray-100 pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Color</h3>
                  <span className="text-sm text-gray-500 font-medium">{product.colors.length} options</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-inner transition-transform ${
                        selectedColor === color ? 'scale-110 ring-2 ring-offset-2 ring-primary-600' : 'hover:scale-105 border border-gray-200'
                      }`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && (
                        <Check className={`h-5 w-5 ${color === '#FFFFFF' ? 'text-gray-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Size</h3>
                  <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 underline underline-offset-4">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                        selectedSize === size
                          ? 'bg-primary-600 text-white shadow-md'
                          : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
               <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quantity</h3>
               <div className="flex items-center w-36 bg-gray-100 rounded-full border border-gray-200">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors rounded-l-full font-medium text-xl">-</button>
                  <div className="flex-1 flex items-center justify-center text-gray-900 font-bold select-none">{quantity}</div>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors rounded-r-full font-medium text-xl">+</button>
               </div>
            </div>

            {/* CTAs */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </button>
              
              <button
                onClick={handleCustomize}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-primary-700 hover:to-indigo-700 transition-all hover:shadow-xl hover:-translate-y-1 shadow-indigo-500/30"
              >
                <Palette className="h-5 w-5" />
                Customize Design
              </button>
            </div>

            {/* Features list */}
            <div className="border-t border-gray-200 pt-8 grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Truck className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RotateCcw className="h-5 w-5 text-gray-400" />
                <span className="font-medium">30-Day Returns</span>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;