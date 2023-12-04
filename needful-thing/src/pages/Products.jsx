import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCartAsync, addToFavoritesAsync } from '../Features/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCartAsync(product));
  }; 

  const handleAddToFavorites = (product) => {
    dispatch(addToFavoritesAsync(product));
  }; 

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
            <img src={product.image} alt={product.name} className="p-8 rounded-t-lg" />
            <div className="card-body">
              <p className="card-title">{product.name}</p>
              <p className="card-description">{product.description}</p>
              <p className="text-gray-600">${product.price}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToFavorites(product)}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent"
                >
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default Products;


