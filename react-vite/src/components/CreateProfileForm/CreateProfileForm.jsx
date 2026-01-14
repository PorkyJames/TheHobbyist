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

    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const payload = {
            username,
            bio,
            mbti,
            first_name: firstName,
            last_name: lastName,
            interests,
            city,
            state,
        };
    
        const serverResponse = await dispatch(createProfile(payload));
    
        // console.log(serverResponse, "<<<< serverResponse")

        if (serverResponse && serverResponse.errors) {
            // console.log(serverResponse.errors, "<<<<serverResponse.errors")
            setErrors(serverResponse.errors); 
            // console.log(errors, "<<<<errors")

        } else {
            closeModal();
        }
    };

    return (
        <div className="create-profile-modal-overlay">
            <div className="create-profile-modal-content">
                <form onSubmit={handleSubmit} className="create-profile-form">


                <h2 className="create-profile-title">
                    <p> Create Profile </p>
                    <p> Create a New Profile to get Started! </p>
                </h2>

                {/* <div className="error-messages">
                    <ul>
                        {Object.values(errors).map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                    </ul>
                </div> */}

                <div className="error-message">
                    {errors.username && <div className="error">{errors.username}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">Username</label>
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

                <div className="error-message">
                    {errors.bio && <div className="error">{errors.bio}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">Bio</label>
                    <textarea
                    id="bio"
                    className="create-profile-input"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength="100"
                    placeholder="Bio"
                    />
                </div>

                <div className="error-message">
                    {errors.mbti && <div className="error">{errors.mbti}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">MBTI</label>
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

                <div className="error-message">
                    {errors.first_name && <div className="error">{errors.first_name}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">First Name</label>
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

                <div className="error-message">
                    {errors.last_name && <div className="error">{errors.last_name}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">Last Name</label>
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

                <div className="error-message">
                    {errors.interests && <div className="error">{errors.interests}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">Interests</label>
                    <textarea
                    id="interests"
                    className="create-profile-input"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    maxLength="200" 
                    placeholder="Interests"
                    />
                </div>

                <div className="error-message">
                    {errors.city && <div className="error">{errors.city}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">City</label>
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

                <div className="error-message">
                    {errors.state && <div className="error">{errors.state}</div>}
                </div>

                <div className="create-profile-form-group">
                <label className="input-labels">State</label>
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
