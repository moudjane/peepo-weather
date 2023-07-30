import React from 'react';

function Sidebar({
                     favorites,
                     showSidebar,
                     handleSidebarToggle,
                     handleRemoveFavorite,
                     handleFavoriteCityClick,
                 }) {
    return (
        <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((city) => (
                    <li key={city}>
                        <button onClick={() => handleFavoriteCityClick(city)}>{city}</button>
                        <button onClick={() => handleRemoveFavorite(city)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button className="close-sidebar" onClick={handleSidebarToggle}>
                Close
            </button>
        </div>
    );
}

export default Sidebar;
