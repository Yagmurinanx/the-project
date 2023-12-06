import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div className="bg-gray-800">
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
              <Link to="/Cart" className="text-white hover:text-gray-300">Cart</Link>
            </li>
            <li>
              <Link to="/FavoritesPage" className="text-white hover:text-gray-300">Favorites</Link>
            </li>
            <li className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-md py-1 px-2 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
              >
                Search
              </button>
              {isSearching && <p>Searching...</p>}
              {searchResults.length > 0 && !isSearching && (
                <ul className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10">
                  {searchResults.map((item, index) => (
                    <li key={index}>
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchTerm !== '' && searchResults.length === 0 && !isSearching && (
                <p>No results found.</p>
              )}
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





