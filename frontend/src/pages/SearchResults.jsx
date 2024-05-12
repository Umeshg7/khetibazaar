import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/products', {
        params: {
          query: searchQuery,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      setError('Error fetching search results. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Perform an initial search on component mount
  }, [selectedCategory]); // Trigger search whenever selectedCategory changes

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#333', textAlign: 'center' }}>Explore Products</h2>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          style={{ flex: '1', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px', marginLeft: '10px' }}
        >
          <option value="All">All</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Grains">Grains</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
        </select>
        <button
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginLeft: '10px' }}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>
        ) : Array.isArray(searchResults) && searchResults.length > 0 ? (
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {searchResults.map((product) => (
              <li key={product._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ marginRight: '20px', width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }} />
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px', color: '#333' }}>{product.name}</h3>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '5px' }}>Category: {product.category}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ textAlign: 'center' }}>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
