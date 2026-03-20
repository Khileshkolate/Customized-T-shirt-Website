import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Heart } from 'lucide-react'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false)

  const imageUrl = product.images?.[0]?.url || '/placeholder.jpg'

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Like Button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
      >
        <Heart 
          className={`h-5 w-5 transition-colors ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <Link
            to={`/products/${product._id}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100"
          >
            <ShoppingBag className="h-5 w-5" />
            View Details
          </Link>
        </div>

        {/* Discount Badge */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
            {product.type || 'Product'}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating || '4.8'}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
          {product.name || 'Custom Product'}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description || 'Create your custom design'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-bold text-gray-900">
                  ₹{product.discountPrice}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price || '499'}
              </span>
            )}
          </div>
          
          <Link
            to={`/design/${product._id || '1'}`}
            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
          >
            Customize →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard