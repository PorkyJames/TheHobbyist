import { useDispatch } from 'react-redux';
import { getUserHobbies, deleteHobby } from '../../redux/hobby';
import { useModal } from '../../context/Modal';


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
        <div className="modal-background">
            <div className="modal-content">
                <button className="close-button" onClick={handleCloseModal}>
                    &times;
                </button>
                <div className="confirm-delete-text">
                    <h2>Confirm Delete</h2> 
                </div>
                <div className="delete-hobby-paragraph">
                    <p>Are you sure you want to delete this hobby?</p>
                </div>
                <div className="modal-buttons">
                    <button className="delete-button" onClick={handleDelete}>
                        Yes (Delete Hobby)
                    </button>
                    <button className="cancel-button" onClick={handleCloseModal}>
                        No (Keep Hobby)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteHobbyModal;
