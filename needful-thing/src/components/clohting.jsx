import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendToChart, fetchClothingData } from '../Redux/clothingSlice';

const ClothingComponent = () => {
  const dispatch = useDispatch();
  const clothingItems = useSelector(state => state.clothing.clothingItems);

  const handleAddToChart = (item) => {
    dispatch(sendToChart(item));
  };

  useEffect(() => {
    dispatch(fetchClothingData());
  }, [dispatch]);

  return (
    <div>
      <h2>Clothing Items</h2>
      <div className="flex flex-wrap -mx-4">
        {clothingItems.map(item => (
          <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <img src={item.image} alt={item.name} className="w-full mb-2 rounded" />
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">${item.price}</p>
              <button onClick={() => handleAddToChart(item)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add to Card
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClothingComponent;

