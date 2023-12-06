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

  return (
    <div>
      <h2>Product Detail</h2>
      <div className="card w-96 bg-base-100 shadow-xl">
        <img src={product.image} alt={product.name} className="p-8 rounded-t-lg" />
        <div className="card-body">
          {isEditing ? (
            <div>
              <input
                type="text"
                name="name"
                value={editableProduct.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="description"
                value={editableProduct.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                value={editableProduct.price}
                onChange={handleInputChange}
              />
              <button className="btn btn-ghost" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p className="card-title">{product.name}</p>
              <p className="card-description">{product.description}</p>
              <p className="text-gray-600">${product.price}</p>
              <button className="btn btn-ghost" onClick={handleEdit}>Update</button>
            </div>
          )}
        </div>
        <button>
              <Link to="/product" className="btn btn-ghost">Go Back</Link>
              </button> 
      </div>
                 
    </div>
  );
};

export default ProductDetailPage;































// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!id) {
//       setError('Invalid product ID');
//       setLoading(false);
//       return;
//     }

//     axios.get(`http://localhost:3001/clothingItems/${id}`)
//       .then((response) => {
//         setProduct(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError('Error fetching data');
//         setLoading(false);
//       });
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!product) {
//     return <div>No product found</div>;
//   }

//   return (
//     <div>
//       <h2>Product Detail</h2>
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <img src={product.image} alt={product.name} className="p-8 rounded-t-lg" />
//         <div className="card-body">
//           <p className="card-title">{product.name}</p>
//           <p className="card-description">{product.description}</p>
//           <p className="text-gray-600">${product.price}</p>
//           {/* Diğer detaylar */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

////product sayfasına geri dönebilme