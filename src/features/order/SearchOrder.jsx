import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handelFormSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery('');
  }
  return (
    <form onSubmit={handelFormSubmit}>
      <input
        type="text"
        placeholder="Search Order.."
        value={query}
        className="w-28 rounded-full bg-yellow-100 px-3 py-3 text-start transition-all duration-300 focus:outline-none sm:w-80 sm:focus:w-[400px]"
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export default SearchOrder;
