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

    //! Error Handling, but in the frontend
    const [errors, setErrors] = useState({
        username: '',
        firstName: '',
        lastName: '',
        mbti: '',
        city: '',
        state: '',
        interests: '',
        bio: '',
    });


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
    
    const handleSave = async (field) => {
        const fieldMap = {
            'firstName': 'first_name',
            'lastName': 'last_name',
        };
        const apiField = fieldMap[field] || field;
    
        const updatedProfile = {
            ...profile,
            [apiField]: editedValues[apiField]
        };
    
        const serverResponse = await dispatch(updateProfile(profile.id, updatedProfile));

        // Check for errors in the server response
        if (serverResponse && serverResponse.errors) {
            // Initialize an empty object to hold the new errors
            const newErrors = {
                ...errors,
                first_name: serverResponse.errors.first_name || [],
                last_name: serverResponse.errors.last_name || [],
            };

            // Iterate over the keys of the serverResponse.errors object
            for (const [key, value] of Object.entries(serverResponse.errors)) {
                // Here we assume each key has an array of errors, take the first one as the message
                newErrors[key] = value[0];
            }

            // Set the errors state with the new errors
            setErrors(newErrors);
        } else {
            // If there are no errors, clear any existing errors and exit edit mode
            setErrors({});
            setEditMode(null);
        }
    };
    

    const handleCancel = () => {
        setEditedValues({
            ...editedValues,
            first_name: profile.first_name, 
            last_name: profile.last_name,  
        });
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
                                <div className="username-edit">
                                    <input
                                        className="input-edit"
                                        type="text"
                                        value={editedValues.username || profile.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        />
                                    {errors.username && <div className="error-message">{errors.username}</div>}
                                    <div className="button-group">
                                        <button className="save-btn" onClick={() => handleSave('username')}>Save</button>
                                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="username">
                                    <span>{profile.username}</span>
                                    <button className="edit-btn" onClick={() => handleEditClick('username')}>Edit</button>
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
                                        <label className="label" htmlFor="firstName">First Name</label>
                                        {errors.first_name && errors.first_name.length > 0 && (
                                            <div className="error-message">{errors.first_name}</div>
                                        )}
                                        <input
                                            className="input-edit"
                                            type="text"
                                            id="firstName"
                                            value={editedValues.first_name || profile.first_name}
                                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('firstName')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">First Name</label>
                                        <span>{profile.first_name}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('firstName')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="last-name">
                                {editMode === 'lastName' ? (
                                    <div>
                                        <label className="label" htmlFor="lastName">Last Name</label>
                                        {errors.last_name && errors.last_name.length > 0 && (
                                            <div className="error-message">{errors.last_name}</div>
                                        )}
                                        <input
                                            className="input-edit"
                                            type="text"
                                            id="lastName"
                                            value={editedValues.last_name || profile.last_name}
                                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('lastName')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">Last Name</label>
                                        <span>{profile.last_name}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('lastName')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="mbti">
                                {editMode === 'mbti' ? (
                                    <div>
                                        <label className="label" htmlFor="mbti">MBTI</label>
                                        {errors.mbti && <div className="error-message">{errors.mbti}</div>}
                                        <input
                                            className="input-edit"
                                            type="text"
                                            value={editedValues.mbti || profile.mbti}
                                            onChange={(e) => handleInputChange('mbti', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('mbti')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">MBTI</label>
                                        <span>{profile.mbti}</span>
                                        <button className="edit-btn"onClick={() => handleEditClick('mbti')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="city">
                                {editMode === 'city' ? (
                                    <div>
                                        <label className="label" htmlFor="city">City</label>
                                        {errors.city && <div className="error-message">{errors.city}</div>}
                                        <input
                                            className="input-edit"
                                            type="text"
                                            value={editedValues.city || profile.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('city')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">City</label>
                                        <span>{profile.city}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('city')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="state">
                                {editMode === 'state' ? (
                                    <div>
                                        <label className="label" htmlFor="state">State</label>
                                        {errors.state && <div className="error-message">{errors.state}</div>}
                                        <input
                                            className="input-edit"
                                            type="text"
                                            value={editedValues.state || profile.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('state')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">State</label>
                                        <span>{profile.state}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('state')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="interests">
                                {editMode === 'interests' ? (
                                    <div>
                                        <label className="label" htmlFor="interests">Interests</label>
                                        {errors.interests && <div className="error-message">{errors.interests}</div>}
                                        <textarea
                                            className="textarea-edit"
                                            value={editedValues.interests || profile.interests}
                                            onChange={(e) => handleInputChange('interests', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('interests')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">Interests</label>
                                        <span>{profile.interests}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('interests')}>Edit</button>
                                    </div>
                                )}
                            </div>

                            <div className="bio">
                                {editMode === 'bio' ? (
                                    <div>
                                        <label className="label" htmlFor="bio">Bio</label>
                                        {errors.bio && <div className="error-message">{errors.bio}</div>}
                                        <textarea
                                            className="textarea-edit"
                                            value={editedValues.bio || profile.bio}
                                            onChange={(e) => handleInputChange('bio', e.target.value)}
                                        />
                                        <div className="button-group">
                                            <button className="save-btn" onClick={() => handleSave('bio')}>Save</button>
                                            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <label className="label">Bio</label>
                                        <span>{profile.bio}</span>
                                        <button className="edit-btn" onClick={() => handleEditClick('bio')}>Edit</button>
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



