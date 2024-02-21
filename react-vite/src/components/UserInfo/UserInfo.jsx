import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { fetchUserProfile, updateProfile } from "../../redux/profile";

import DeleteProfileModal from "../DeleteProfileModal/DeleteProfileModal";

import "./UserInfo.css"

function UserInfo({ userId }) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.isLoading);
    const [editMode, setEditMode] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId));
        }
    }, [userId, dispatch]);

    const handleEditClick = (field) => {
        setEditMode(field);
        setEditedValues(values => ({ ...values, [field]: profile[field] }));
    };

    const handleInputChange = (field, value) => {
        setEditedValues(values => ({ ...values, [field]: value }));
    };

    const handleSave = (field) => {
        dispatch(updateProfile(profile.id, { ...profile, [field]: editedValues[field] }));
        setEditMode(null);
    };

    const handleCancel = () => {
        setEditMode(null);
    };

    // const handleDeleteProfile = (profileId) => {
    //     dispatch(deleteProfile(profileId))
    // }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile found.</div>;
    }

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    return (
        <>
            <div className="user-info">
                <div className="user-icon">
                    <i className="fas fa-user-circle"></i>
                </div>
                <div className="username">
                    {editMode === 'username' ? (
                        <div>
                            <input
                                type="text"
                                value={editedValues.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                            />
                            <button onClick={() => handleSave('username')}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            {profile.username}
                            <button onClick={() => handleEditClick('username')}>Edit</button>
                        </div>
                    )}
                </div>
                <h2>About Me</h2>
                <div className="personal-info">
                    <div className="mbti">
                        {editMode === 'mbti' ? (
                            <div>
                                <input
                                    type="text"
                                    value={editedValues.mbti}
                                    onChange={(e) => handleInputChange('mbti', e.target.value)}
                                />
                                <button onClick={() => handleSave('mbti')}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {profile.mbti}
                                <button onClick={() => handleEditClick('mbti')}>Edit</button>
                            </div>
                        )}
                    </div>
                    <div className="bio">
                        {editMode === 'bio' ? (
                            <div>
                                <textarea
                                    value={editedValues.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                />
                                <button onClick={() => handleSave('bio')}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                {profile.bio}
                                <button onClick={() => handleEditClick('bio')}>Edit</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <button onClick={openDeleteModal}>Delete Profile</button>
            {showDeleteModal && (
                <DeleteProfileModal 
                    profileId={profile.id} 
                    closeModal={closeDeleteModal} 
                />
            )}
        </>
    );
}

export default UserInfo;


