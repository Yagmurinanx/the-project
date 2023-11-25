import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendToChart } from '../Redux/clothingSlice';

const ChartComponent = () => {
  const dispatch = useDispatch();
  const chartItems = useSelector((state) => state.clothing.chartItems); // State içinde clothing.chartItems'a erişin

  useEffect(() => {
    dispatch(sendToChart());
  }, [dispatch]);

  return (
    <div>
      <h2>Chart Items</h2>
      <div className="flex flex-wrap -mx-4">
        {chartItems.map((item) => (
          <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <img src={item.image} alt={item.name} className="w-full mb-2 rounded" />
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">${item.price}</p>
              <button
                onClick={() => handleAddToChart(item)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  // Kartın stilleri ve özellikleri burada tanımlanabilir
                  color: 'white',
                  border: 'none',
                  // Ek özellikler ve stiller...
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartComponent;