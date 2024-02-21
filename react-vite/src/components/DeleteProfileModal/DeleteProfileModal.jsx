import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { deleteProfile } from '../../redux/profile';
import { thunkLogout } from '../../redux/session'

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
        <div className="delete-profile-modal">
        <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>Deleting this profile will remove all associated user data. This action cannot be undone. Are you sure you want to proceed?</p>
            <button onClick={handleDelete}>Yes, Delete Profile</button>
            <button onClick={closeModal}>No, Go Back</button>
        </div>
        </div>
    );
};

export default DeleteProfileModal;
