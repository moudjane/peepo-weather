import React from 'react';
import { BsGithub } from 'react-icons/bs';

function Sidebar({
                     favorites,
                     showSidebar,
                     handleSidebarToggle,
                     handleRemoveFavorite,
                     handleFavoriteCityClick,
                 }) {

    const githubLink = "https://github.com/moudjane/peepo-weather";

    return (
        <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((city) => (
                    <li key={city}>
                        <button className="favorites_cities" onClick={() => handleFavoriteCityClick(city)}>{city}</button>
                        <button onClick={() => handleRemoveFavorite(city)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button className="close-sidebar" onClick={handleSidebarToggle}>
                Close
            </button>
            <div className="github-footer">
                <a href={githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                    <BsGithub /> GitHub
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
