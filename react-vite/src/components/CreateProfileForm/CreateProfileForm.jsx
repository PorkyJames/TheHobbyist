import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../redux/profile';

import './CreateProfileForm.css'

const CreateProfileForm = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [mbti, setMbti] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = { username, bio, mbti };
        await dispatch(createProfile(payload));
        closeModal();
    };

    return (
        <div className="create-profile-modal-overlay">
            <div className="create-profile-modal-content">
                <form onSubmit={handleSubmit} className="create-profile-form">
                <h2 className="create-profile-title">Create Profile</h2>
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
                <button type="submit" className="create-profile-btn">Create Profile</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProfileForm;
