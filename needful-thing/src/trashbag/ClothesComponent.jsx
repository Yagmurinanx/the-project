// import React, { useState, useEffect } from 'react';
// import ClothesDetail from './ClothCard';

// const ClothesComponent = () => {
//   const [clothesData, setClothesData] = useState([]);

//   useEffect(() => {
//     // API'den verileri almak için fetch kullanımı
//     fetch('http://localhost:3001/clothingItems')
//       .then((response) => response.json())
//       .then((data) => setClothesData(data))
//       .catch((error) => console.error('Error fetching data: ', error));
//   }, []);

//   return (
//     <div>
//       {clothesData.map((clothes) => (
//         <ClothesDetail key={clothes.id} clothes={clothes} />
//       ))}
//     </div>
//   );
// };

// export default ClothesComponent;


