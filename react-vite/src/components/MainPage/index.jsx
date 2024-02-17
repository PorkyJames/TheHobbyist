import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHobbies } from '../../redux/hobby';

import "./MainPage.css"

function MainPage({ hobbies }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allHobbies = useSelector(state => state.hobby);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    console.log(allHobbies, "<<<< allHobbies searchpage")

    useEffect(() => {
        dispatch(getAllHobbies());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Filter hobbies that match the searchTerm
        const results = allHobbies.filter(hobby =>
            hobby.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 3); // Take only the first 3 results
        setSearchResults(results); 

        console.log('Search for:', searchTerm, 'Results:', results);
    
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

            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map(hobby => (
                        <div key={hobby.id} className="hobby-search-item">
                            <p>{hobby.name}</p>
                            <p>{hobby.description}</p>
                            <button>View</button>
                        </div>
                    ))}
                </div>
            )}

            <h3 className="inspirational-quote">
                The Journey of a Thousand Miles begins with the First Step
            </h3>
        </div>
    );
}

export default MainPage;
