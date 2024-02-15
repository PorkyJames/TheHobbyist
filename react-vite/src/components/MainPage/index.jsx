import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import "./MainPage.css"

function MainPage({ hobbies }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Implement the search logic or navigate to a search results page
        console.log('Search for:', searchTerm);
        // navigate to search results page with searchTerm
    };

    const handleRandomHobby = () => {
        if (hobbies.length > 0) {
            const randomIndex = Math.floor(Math.random() * hobbies.length);
            const randomHobby = hobbies[randomIndex];
            navigate(`/hobby/${randomHobby.id}`);
        }
    };

    return (
        <div className="main-page-container">
            <h1 className="main-title">The Hobbyist</h1>

            <form onSubmit={handleSearch} className="search-bar-form">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search for a hobby..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            <button onClick={handleRandomHobby} className="random-button">
                Random
            </button>

            <h3 className="inspirational-quote">
                The Journey of a Thousand Miles begins with the First Step
            </h3>
        </div>
    );
}

export default MainPage;
