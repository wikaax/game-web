import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="input-field">
            <input id="search" type="text" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} />
            <label htmlFor="search">Search</label>
        </div>
    );
};

export default SearchBar;