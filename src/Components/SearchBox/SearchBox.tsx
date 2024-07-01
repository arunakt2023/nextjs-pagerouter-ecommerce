import React, { useState } from 'react';
import { useRouter } from 'next/router';

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.chec.io/v1/products/search?q=${searchTerm}`, {
        method: 'GET',
        headers: {
          "X-Authorization": "pk_565025ba1fcf3591a0064a11ededd5c2cabaae1739c9c",
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const searchData = await response.json();
      console.log('Search Results:', searchData);

      
      router.push({
        pathname: '/search-results',
        query: { q: searchTerm },
      });

    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;