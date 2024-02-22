import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { fetchUserProfile, updateProfile } from "../../redux/profile";

import UserTabs from "../UserTabs/UserTabs";
import ManageHobbies from "../ManageHobbies/ManageHobbies";
import ManageReviews from "../ManageReviews/ManageReviews";
import DeleteProfileModal from "../DeleteProfileModal/DeleteProfileModal";

import "./UserInfo.css"

const UserInfo = ({ userId }) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const isLoading = useSelector((state) => state.profile.isLoading);
    const [editMode, setEditMode] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [activeTab, setActiveTab] = useState('hobbies');

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProfile(userId))
                .then((profileData) => {
                    if (profileData) {
                        const camelCaseProfile = {
                            ...profileData,
                            firstName: profileData?.first_name,
                            lastName: profileData?.last_name,
                        };
                    }
                });
        }
    }, [userId, dispatch]);

    const handleEditClick = (field) => {
        setEditMode(field);
        setEditedValues(values => ({ ...values, [field]: profile[field] }));
    };

    const handleInputChange = (field, value) => {
        const fieldMap = {
            'firstName': 'first_name',
            'lastName': 'last_name',
        };
        const updatedField = fieldMap[field] || field;
        setEditedValues(values => ({ ...values, [updatedField]: value }));
    };
    
    const handleSave = (field) => {
        const fieldMap = {
            'firstName': 'first_name',
            'lastName': 'last_name',
            // Continue mapping other camelCase fields to their snake_case equivalents
        };
        const apiField = fieldMap[field] || field;
    
        // Create a new object with the updated field
        const updatedProfile = {
            ...profile,
            [apiField]: editedValues[apiField]
        };
    
        // Dispatch the updateProfile action
        dispatch(updateProfile(profile.id, updatedProfile));
        setEditMode(null);
    };
    

    const handleCancel = () => {
        setEditMode(null);
    };

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
            <div className="user-info-container">

                <div className="user-info">
                    <div className="left-column">

                        <div className="user-icon">
                            <i className="fas fa-user-circle"></i>
                        </div>

                        <div className="top-row">

                            {editMode === 'username' ? (
                                <div className="username">
                                    <input
                                        type="text"
                                        value={editedValues.username || profile.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                    />
                                    <button onClick={() => handleSave('username')}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </div>
                            ) : (
                                <div className="username">
                                    <span>{profile.username}</span>
                                    <button onClick={() => handleEditClick('username')}>Edit</button>
                                </div>
                            )}

                            <div className="delete-profile-button">
                                <button className="delete-profile" onClick={openDeleteModal}>Delete Profile</button>
                                    {showDeleteModal && (
                                        <DeleteProfileModal 
                                            profileId={profile.id} 
                                            closeModal={closeDeleteModal} 
                                        />
                                    )}
                            </div>

                        </div>

                    </div>

                    <div className="right-column">

                            <div className="first-name">
                                {editMode === 'firstName' ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedValues.first_name || profile.first_name}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        />
                                        <button onClick={() => handleSave('firstName')}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        {profile.first_name}
                                        <button onClick={() => handleEditClick('firstName')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="last-name">
                                {editMode === 'lastName' ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedValues.last_name || profile.last_name}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        />
                                        <button onClick={() => handleSave('lastName')}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        {profile.last_name}
                                        <button onClick={() => handleEditClick('lastName')}>Edit</button>
                                    </div>
                                )}
                            </div>


                        
                            <div className="mbti">
                                {editMode === 'mbti' ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedValues.mbti || profile.mbti}
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

                            <div className="city">
                                {editMode === 'city' ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedValues.city || profile.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                        />
                                        <button onClick={() => handleSave('city')}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        {profile.city}
                                        <button onClick={() => handleEditClick('city')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="state">
                                {editMode === 'state' ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedValues.state || profile.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                        />
                                        <button onClick={() => handleSave('state')}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        {profile.state}
                                        <button onClick={() => handleEditClick('state')}>Edit</button>
                                    </div>
                                )}
                            </div>


                            <div className="interests">
                                {editMode === 'interests' ? (
                                    <div>
                                        <textarea
                                            value={editedValues.interests || profile.interests}
                                            onChange={(e) => handleInputChange('interests', e.target.value)}
                                        />
                                        <button onClick={() => handleSave('interests')}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </div>
                                ) : (
                                    <div>
                                        {profile.interests}
                                        <button onClick={() => handleEditClick('interests')}>Edit</button>
                                    </div>
                                )}
                            </div>


                            <div className="bio">
                                {editMode === 'bio' ? (
                                    <div>
                                        <textarea
                                            value={editedValues.bio || profile.bio}
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

                <UserTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="manage-section">
                    {activeTab === 'hobbies' && <ManageHobbies />}
                    {activeTab === 'reviews' && <ManageReviews />}
                </div>

                {/* {console.log("Rendering UserInfo", { activeTab })} */}

            </div>
        </>
    );
};

export default UserInfo;



