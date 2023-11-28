import React, { useEffect, useState } from 'react';
import { fetchCart } from '../api';
import { useDispatch } from 'react-redux';

const ClothesList = () => {
    // const dispatch = useDispatch();
    const [clothes, setClothes] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCart();
                setClothes(response)
                return response
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchData();
    }, []);
    //yukarıdaki && yi || yaptım

    const handleAddToCart = (selectedClothes) => {
        // Sepete ekleme işlemleri burada yapılabilir
        console.log('Selected Clothes:', selectedClothes);
    };

    const handleAddToFavorites = (selectedClothes) => {
        // Favorilere ekleme işlemleri burada yapılabilir
        console.log('Selected Clothes added to Favorites:', selectedClothes);
        setIsFavorite(!isFavorite); 
    };

    return (
        <div>
        {clothes.length > 0 ? clothes.map((clothes) =>( (
            <div key={clothes.id} className="card w-96 bg-base-100 shadow-xl">
                <img src={clothes?.image} alt={clothes?.name} className="p-8 rounded-t-lg" />
                <div className='card-body'>
                    <p className="card-title">{clothes?.name}</p>
                    <p className="card-description">{clothes?.description}</p>
                    <p className="text-gray-600">${clothes?.price}</p>
                    <div className='card-actions justify-end'>
                        <button onClick={() => handleAddToCart(clothes)} className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-outline btn-accent">
                            Add to Cart
                        </button>
                        <button
                            onClick={handleAddToFavorites}
                            className={`btn ${isFavorite ? 'favorite' : 'not-favorite'}`}
                        >
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            </div>
        ) )): (
            <p>Sepetiniz boş.</p>
        )}
    </div>
    );
};

export default ClothesList;

