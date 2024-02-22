import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../redux/profile';

import './CreateProfileForm.css'

const CreateProfileForm = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [mbti, setMbti] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [interests, setInterests] = useState(''); 
    const [city, setCity] = useState(''); 
    const [state, setState] = useState(''); 
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { 
            username, 
            bio, 
            mbti,
            first_name: firstName, 
            last_name: lastName, 
            interests, 
            city, 
            state 
        };
        await dispatch(createProfile(payload));
        closeModal();
    };

    return (
        <div className="create-profile-modal-overlay">
            <div className="create-profile-modal-content">
                <form onSubmit={handleSubmit} className="create-profile-form">

                <h2 className="create-profile-title">
                    <p> Create Profile </p>
                    <p> Create a New Profile to get Started! </p>
                </h2>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="username"
                    className="create-profile-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    maxLength="15"
                    placeholder="User Name"
                    />
                </div>

                <div className="create-profile-form-group">
                    <textarea
                    id="bio"
                    className="create-profile-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength="100"
                    placeholder="Bio"
                    />
                </div>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="mbti"
                    className="create-profile-input"
                    value={mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    maxLength="4"
                    placeholder="MBTI"
                    />
                </div>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="firstName"
                    className="create-profile-input"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    maxLength="50"
                    placeholder="First Name"
                    />
                </div>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="lastName"
                    className="create-profile-input"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    maxLength="50"
                    placeholder="Last Name"
                    />
                </div>

                <div className="create-profile-form-group">
                    <textarea
                    id="interests"
                    className="create-profile-input"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    maxLength="200" 
                    placeholder="Interests"
                    />
                </div>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="city"
                    className="create-profile-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    maxLength="50"
                    placeholder="City"
                    />
                </div>

                <div className="create-profile-form-group">
                    <input
                    type="text"
                    id="state"
                    className="create-profile-input"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    maxLength="50"
                    placeholder="State"
                    />
                </div>
                
                <button type="submit" className="create-profile-btn">Create Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfileForm;
