import { useDispatch } from 'react-redux';
import { getUserHobbies, deleteHobby } from '../../redux/hobby';
import { useModal } from '../../context/Modal';

import './DeleteHobbyModal.css'

const DeleteHobbyModal = ({ hobbyId, onDeleted }) => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();

    const handleDelete = () => {
        dispatch(deleteHobby(hobbyId))
            .then(() => {
                dispatch(getUserHobbies())
                setModalContent(null);
                if (onDeleted) {
                    onDeleted(); 
                }
            });
    };

    const handleCloseModal = () => {
        setModalContent(null); 
    };

    return (
        <div className="delete-hobby-modal-overlay">
            <div className="delete-hobby-modal-content">
            <div className="delete-hobby-modal-header">
                <h2>Confirm Delete</h2>
                <button className="delete-hobby-close-button" onClick={handleCloseModal}>
                &times;
                </button>
            </div>
            <p className="delete-hobby-modal-message">Are you sure you want to delete this hobby?</p>
            <div className="delete-hobby-modal-actions">
                <button className="delete-hobby-modal-delete-button" onClick={handleDelete}>
                Yes (Delete Hobby)
                </button>
                <button className="delete-hobby-modal-cancel-button" onClick={handleCloseModal}>
                No (Keep Hobby)
                </button>
            </div>
            </div>
        </div>
        );
};

export default DeleteHobbyModal;
