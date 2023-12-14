import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import searchIcon from '../assets/icons/search.svg';
import { debounce } from 'lodash';
import '../index.css';



const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/Items')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  const delayedSearch = debounce(() => {
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
  }, 300); 

  const handleSearch = () => {
    delayedSearch(); 
  };

  useEffect(() => {
    delayedSearch();
    return delayedSearch.cancel; 
  }, [searchTerm, delayedSearch]);

  return (
    <div className="bg-black">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl  text-white hover:text-gray-300">Needful Things</Link>
          <ul className="flex items-center space-x-4">
          <li>
              <Link to="/" className="text-white hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/product" className="text-white hover:text-gray-300">Products</Link>
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
                <img src={searchIcon} alt='search svg' />
              </button>
              {isSearching && <p>Searching...</p>}
              {searchResults.length > 0 && !isSearching && (
                <ul className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10 top-4">
                  {searchResults.map((item, index) => (
                    <li key={index}>
                      <Link to={`/${item.id}`}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
              {searchTerm !== '' && searchResults.length === 0 && !isSearching && (
                <p className="absolute bg-white p-2 mt-8 rounded-md shadow-md z-10 top-4">No results found.</p>
              )}
            </li>
            <li>
              <Link to="/Login" className="text-white hover:text-gray-300"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" fill="#F5F5F5"/></svg></Link>
            </li>
            <li>
              <Link to="/FavoritesPage" className="text-white hover:text-gray-300"> <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 19"
              >
             <path
             stroke="#F5F5F5" 
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z"
             />
            </svg></Link>
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


