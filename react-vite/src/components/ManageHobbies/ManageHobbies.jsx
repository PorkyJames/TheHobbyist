import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserHobbies } from '../../redux/hobby';
import { Link } from 'react-router-dom';
import DeleteHobbyModal from '../DeleteHobbyModal/DeleteHobbyModal';
import { useModal } from '../../context/Modal';

const ManageHobbies = () => {
    const dispatch = useDispatch();
    const userHobbies = useSelector(state => state.hobby.userHobbies);
    const { setModalContent } = useModal();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserHobbies()).then((hobbies) => {
            setIsLoaded(!!hobbies);
        }).catch((error) => {
            console.error('Error loading hobbies:', error);
        });
    }, [dispatch]);
    
    const openDeleteModal = (hobbyId) => {
        setModalContent(
            <DeleteHobbyModal 
                hobbyId={hobbyId}
                onClose={() => setModalContent(null)}
            />
        );
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if(!userHobbies || userHobbies.length === 0) {
        return (
            <h1>No current Hobby Entries! Create a new Hobby to get started</h1>
        );
    }

    return (
        <div className="manage-hobbies">
            <h1>Manage Hobbies</h1>
            <div className="hobbies-list">
                {userHobbies.map(hobby => (
                    <div key={hobby.id} className="hobby-item">
                        <div className="hobby-content" onClick={() => window.location.href = `/hobbies/${hobby.id}`}>
                            <h3>{hobby.name}</h3>
                            <p>{hobby.description}</p>
                            {/* {hobby.imageUrl && <img src={hobby.imageUrl} alt={hobby.name} />} */}
                        </div>
                        <div className="hobby-actions">
                            <Link to={`/hobbies/${hobby.id}/edit`}>
                                <button>Update</button>
                            </Link>
                            <button onClick={() => openDeleteModal(hobby.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageHobbies;


