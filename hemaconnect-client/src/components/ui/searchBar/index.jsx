import React from 'react';
import './styles.css';
import SearchIcon from '../../../assets/SVGs/Search.svg'

const SearchBar = () => {
    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <img src={SearchIcon} alt="Search"/>
                <input
                    type="text"
                    placeholder="Name, Blood type"
                />
            </div>
        </div>
    );
}

export default SearchBar;