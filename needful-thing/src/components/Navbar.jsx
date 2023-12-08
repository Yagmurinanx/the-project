import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchIcon from '../assets/icons/search.svg'

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/clothingItems')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    setIsSearching(true);

    const term = searchTerm.trim().toLowerCase();
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const results = products.filter(item =>
      item.name.toLowerCase().includes(term)
    );

    setSearchResults(results);
    setIsSearching(false);
  };

  

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">Needful Things</Link>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/product" className="text-white hover:text-gray-300">Products</Link>
            </li>
            <li>
              <Link to="/FavoritesPage" className="text-white hover:text-gray-300">Favorites</Link>
            </li>
            <li className="relative flex items-center space-x-0">
           <input
            type="text"
           placeholder="Search products..."
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
           className="border rounded-md py-1 px-2 focus:outline-none focus:border-blue-500 mr-2"
           />
          <button
          type="button"
          onClick={handleSearch}
          className="btn btn-ghost px-4 py-1 text-white rounded-md focus:outline-none focus:bg-green-600"
          >
          <img src={searchIcon} alt='search svg'></img>
          </button>
              {isSearching && <p>Searching...</p>}
              {searchResults.length > 0 && !isSearching && (
                <ul className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10 top-4">
                  {searchResults.map((item, index) => (
                    <li key={index}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchTerm !== '' && searchResults.length === 0 && !isSearching && (
                <p className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10 top-4">No results found.</p>
              )}
            </li>
            <li>
              <Link to="/Cart" className="text-white hover:text-gray-300"><svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 20">
               <path stroke="#F5F5F5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm1-4H5m0 0L3 4m0 0h5.501M3 4l-.792-3H1m11 3h6m-3 3V1"/>
              </svg></Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;











// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3001/clothingItems')
//       .then(response => {
//         setProducts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleSearch = () => {
//     setIsSearching(true);

//     const term = searchTerm.trim().toLowerCase();
//     const results = products.filter(item =>
//       item.name.toLowerCase().includes(term)
//     );

//     setSearchResults(results);
//     setIsSearching(false);
//   };

//   return (
//     <div className="bg-gray-800">
//       <div className="container mx-auto px-4">
//         <nav className="flex items-center justify-between py-4">
//           <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">Needful Things</Link>
//           <ul className="flex items-center space-x-4">
//             <li>
//               <Link to="/" className="text-white hover:text-gray-300">Home</Link>
//             </li>
//             <li>
//               <Link to="/product" className="text-white hover:text-gray-300">Products</Link>
//             </li>
//              <li>
//               <Link to="/Cart" className="text-white hover:text-gray-300">Cart</Link>
//              </li>
//              <li>
//               <Link to="/FavoritesPage" className="text-white hover:text-gray-300">Favorites</Link>
//              </li>
//             <li className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="border rounded-md py-1 px-2 focus:outline-none focus:border-blue-500"
//               />
//               <button
//                 type="button"
//                 onClick={handleSearch}
//                 className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
//               >
//                 Search
//               </button>
//               {isSearching && <p>Searching...</p>}
//               {searchResults.length > 0 && !isSearching && (
//                 <ul className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10">
//                   {searchResults.map((item, index) => (
//                     <li key={index}>{item.name}</li>
//                   ))}
//                 </ul>
//               )}
//               {searchTerm !== '' && searchResults.length === 0 && !isSearching && (
//                 <p>No results found.</p>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Navbar;





