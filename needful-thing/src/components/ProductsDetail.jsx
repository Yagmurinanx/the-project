import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProduct, setEditableProduct] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:3001/clothingItems/${id}`)
      .then((response) => {
        setProduct(response.data);
        setEditableProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios.put(`http://localhost:3001/clothingItems/${id}`, editableProduct) // Send updated data to the server
      .then((response) => {
        setProduct(response.data); // Update product data in the component
        setIsEditing(false); // Turn off editing mode
      })
      .catch((error) => {
        setError('Error updating data');
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }
 console.log(editableProduct)
  return (
    <div className='mt-5 mb-5 flex items-center justify-center '>
      <div className="card w-96 bg-base-100 shadow-xl">
        <img src={product?.image} alt={product.name} className="p-8 rounded-t-lg" />
        <div className="card-body">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="name"
                value={editableProduct.name}
                onChange={handleInputChange}
                className="mb-3 input input-bordered input w-full max-w-xs" 
              />
              <input
                type="text"
                name="description"
                value={editableProduct.description}
                onChange={handleInputChange}
                className="mb-3 input input-bordered w-full max-w-xs"
              />
              <input
                type="number"
                name="price"
                value={editableProduct.price}
                onChange={handleInputChange}
                className="mb-3 input input-bordered w-full max-w-xs"
              />
              <button className="btn btn-ghost" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p className="card-title">{product.name}</p>
              <p className="card-description">{product.description}</p>
              <p className="mt-3 mb-3 text-gray-600">${product.price}</p>
              <button className="btn btn-ghost" onClick={handleEdit}>Update</button>
              <button>
              <Link to="/product" className="btn btn-ghost">Go Back</Link>
              </button>
            </div>
          )}
           
        </div>
        
      </div>
                 
    </div>
  );
};

export default ProductDetailPage;
