import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHobbies } from '../../redux/hobby';
import { fetchUserProfile } from '../../redux/profile';
import { useModal } from '../../context/Modal';

import CreateProfileForm from '../CreateProfileForm/CreateProfileForm';

import "./MainPage.css"

function MainPage({ hobbies }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allHobbies = useSelector(state => state.hobby);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setModalContent, closeModal } = useModal();
    // console.log(allHobbies, "<<<< allHobbies searchpage")

    const userId = useSelector(state => state.session.user?.id)

    const { userProfile, isLoadingProfile, checkCompleted } = useSelector(state => ({
        userProfile: state.profile.profile,
        isLoadingProfile: state.profile.isLoading,
        checkCompleted: state.profile.checkCompleted,
    }));
    // const [showProfileModal, setShowProfileModal] = useState(false);

    //! Get all Hobbies
    useEffect(() => {
        dispatch(getAllHobbies());
    }, [dispatch]);

    //! Check if user has a user Profile
    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId));
        }
    }, [userId, dispatch]);

    //! Modal For Create Profile Form
    const stableCloseModal = useCallback(() => closeModal(), [closeModal]);

    const [modalSet, setModalSet] = useState(false);

    useEffect(() => {
        if (!isLoadingProfile && checkCompleted) {
            if (userProfile === null && !modalSet) {
                setModalContent(<CreateProfileForm closeModal={stableCloseModal} />);
                setModalSet(true);
            }
        }
    }, [userProfile, isLoadingProfile, checkCompleted, setModalContent, stableCloseModal, modalSet]);

    //! Search Feature for Hobbies
    const handleSearch = (e) => {
        e.preventDefault();
        const results = allHobbies.filter(hobby =>
            hobby.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(0, 3); 
        setSearchResults(results); 
        // console.log('Search for:', searchTerm, 'Results:', results);
    };

    //! Random Search Button
    const handleRandomHobby = () => {
        // console.log(hobbies, "<<<<hobbies")
        if (hobbies.length > 0) {
            const randomIndex = Math.floor(Math.random() * hobbies.length);
            const randomHobby = hobbies[randomIndex];

            navigate(`/hobby/${randomHobby.id}`);
        }
    };

    //! Testing purposes for Modal showing
    // const handleShowModal = () => {
    //     setModalContent(
    //         <CreateProfileForm closeModal={closeModal} />
    //     );
    // };

    const navigateToEachHobby = (hobbyId) => {
        navigate(`/hobbies/${hobbyId}`)
    }

    const navigateToAllHobbies = () => {
        navigate("/hobbies")
    }

    return (
        <div className="main-page-container">
            <h1 className="main-title">The Hobbyist</h1>

            <form id="search-form" onSubmit={handleSearch} className="search-bar-form">
            <input
                type="text"
                className="search-bar"
                placeholder="Search for a hobby..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </form>


            <div className="buttons-container">
            <button
                type="submit"
                className="search-button"
                onClick={() => document.getElementById('search-form')
                    .dispatchEvent(new Event(
                        'submit', { cancelable: true, bubbles: true }
                        ))}
                >
                Search
            </button>

            <button onClick={handleRandomHobby} className="random-button">
                Random
            </button>

            <button onClick={navigateToAllHobbies} className="view-all-button">
                View All Hobby Entries
            </button>

            </div>

            {searchResults.length > 0 && (
            <div className="search-results">
                {searchResults.map((hobby) => (
                <div key={hobby.id} className="hobby-search-item">
                    <p>{hobby.name}</p>
                    <p>{hobby.description}</p>
                    <button onClick={() => navigateToEachHobby(hobby.id)}>View</button>
                </div>
                ))}
            </div>
            )}

            <h3 className="inspirational-quote">
                "The Journey of a Thousand Miles begins with the First Step"
            </h3>

        </div>

    );
}

export default MainPage;
