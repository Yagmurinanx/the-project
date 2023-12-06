import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    // Diğer ürün özellikleri buraya eklenebilir
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/clothingItems', productData)
      .then((response) => {
        console.log('Ürün eklendi:', response.data);
        // İşlem başarılı olduğunda kullanıcıya bilgi verilebilir veya farklı bir işlem yapılabilir
      })
      .catch((error) => {
        console.error('Ürün eklenirken hata oluştu:', error);
        // Hata durumunda kullanıcıya bir hata mesajı gösterilebilir
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={productData.name}
        onChange={handleInputChange}
        placeholder="Ürün Adı"
      />
      <input
        type="text"
        name="description"
        value={productData.description}
        onChange={handleInputChange}
        placeholder="Ürün Açıklaması"
      />
      {/* Diğer ürün özellikleri için input alanları eklenebilir */}
      <button type="submit">Ürünü Ekle</button>
    </form>
  );
};

export default AddProductForm;
