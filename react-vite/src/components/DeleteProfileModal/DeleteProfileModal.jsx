import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteProfile } from '../../redux/profile';
import { thunkLogout } from '../../redux/session'

import './DeleteProfileModal.css'

const DeleteProfileModal = ({ profileId, closeModal }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        // Dispatch the deleteProfile action
        dispatch(deleteProfile(profileId))
        .then(() => {
            // After deleting the profile, redirect to the home page
            navigate('/');
            dispatch(thunkLogout())
        })
        .catch((error) => {
            // Handle any errors here
            console.error('Failed to delete profile:', error);
        });
        // Close the modal
        closeModal();
    };

    return (
        <div className="delete-profile-modal-overlay">
            <div className="delete-profile-modal-content">
                <div className="delete-profile-modal-header">
                    <h2>Confirm Delete</h2>
                    <button className="delete-profile-close-button" onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <p className="delete-profile-modal-message">
                    Deleting this profile will remove all associated user data. This action cannot be undone. Are you sure you want to proceed?
                </p>
                <div className="delete-profile-modal-actions">
                    <button className="delete-profile-modal-delete-button" onClick={handleDelete}>
                        Yes, Delete Profile
                    </button>
                    <button className="delete-profile-modal-cancel-button" onClick={closeModal}>
                        No, Go Back
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default DeleteProfileModal;


