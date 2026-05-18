import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

const STORAGE_KEY = 'wishlist';

const getProductId = (product) => product?._id || product?.id || product?.productId;

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY);
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        setWishlistItems(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setWishlistItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const wishlistIds = useMemo(
    () => new Set(wishlistItems.map((item) => getProductId(item)).filter(Boolean)),
    [wishlistItems]
  );

  const isWishlisted = (productId) => wishlistIds.has(productId);

  const addToWishlist = (product) => {
    const productId = getProductId(product);
    if (!productId) return;

    setWishlistItems((current) => {
      if (current.some((item) => getProductId(item) === productId)) {
        return current;
      }
      return [...current, { ...product, _id: productId, savedAt: new Date().toISOString() }];
    });
    toast.success('Added to wishlist');
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((current) => current.filter((item) => getProductId(item) !== productId));
    toast.success('Removed from wishlist');
  };

  const toggleWishlist = (product) => {
    const productId = getProductId(product);
    if (!productId) return;

    if (isWishlisted(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      isWishlisted,
      addToWishlist,
      removeFromWishlist,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
