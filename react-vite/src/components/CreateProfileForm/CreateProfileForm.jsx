import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../redux/profile';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">User Name</label>
                <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    maxLength="15"
                />
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength="100"
                />
            </div>
            <div>
                <label htmlFor="mbti">MBTI</label>
                <input
                    id="mbti"
                    value={mbti}
                    onChange={(e) => setMbti(e.target.value)}
                    maxLength="4"
                />
            </div>
            <button type="submit">Create Profile</button>
        </form>
    );
};

export default CreateProfileForm;
