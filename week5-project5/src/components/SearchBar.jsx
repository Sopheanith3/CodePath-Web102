import React from 'react'
import './SearchBar.css'

const SearchBar = ({ searchQuery, setSearchQuery}) => {
    return ( 
        <div className='search-bar'>
            <input type='text' placeholder='Search Countires...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            {searchQuery && (
                <button className='clear-btn' onClick={() => setSearchQuery('')}>
                    ❎
                </button>
            )}
        </div>
    )
}

export default SearchBar;