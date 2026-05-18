import { Link } from 'react-router-dom';
import { Heart, Palette, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';

const getImageSrc = (item) => item.image || item.images?.[0]?.url || '/images/tshirt.jpg';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
            <p className="text-gray-600">Products you saved for later.</p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700"
          >
            <ShoppingBag className="h-5 w-5" />
            Browse Products
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-700">
              <Heart className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">No wishlist items yet</h2>
            <p className="mx-auto mt-2 max-w-md text-gray-600">
              Save products while browsing and come back when you are ready to customize them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistItems.map((item) => (
              <div key={item._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <Link to={`/products/${item._id}`} className="block aspect-square bg-gray-100 p-4">
                  <img
                    src={getImageSrc(item)}
                    alt={item.name || 'Wishlist product'}
                    className="h-full w-full object-contain"
                  />
                </Link>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                      {item.type || 'Product'}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(item._id)}
                      className="rounded-lg p-2 text-gray-500 hover:bg-red-50 hover:text-red-600"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="line-clamp-1 text-lg font-bold text-gray-900">{item.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xl font-bold text-gray-900">
                      Rs. {item.discountPrice || item.price || 0}
                    </span>
                    <Link
                      to={`/designer?product=${item._id}`}
                      className="inline-flex items-center gap-1 rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                    >
                      <Palette className="h-4 w-4" />
                      Design
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
