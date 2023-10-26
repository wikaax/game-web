import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="input-field">
            <input id="search" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <label htmlFor="search">Search</label>
        </div>
    );
};

export default SearchBar;
