import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserHobbies, deleteHobby } from '../../redux/hobby';
import { Link } from 'react-router-dom';

const ManageHobbies = () => {
    const dispatch = useDispatch();
    const userHobbies = useSelector(state => state.hobby.hobbies.userHobbies);
    // console.log(userHobbies, "userHobbies <<<<<<<<<<<<<<<<")
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getUserHobbies()).then((hobbies) => {
            if (hobbies) {
                // console.log('Hobbies loaded:', hobbies);
                setIsLoaded(true);
            } else {
                console.log('No hobbies loaded');
            }
        }).catch((error) => {
            console.error('Error loading hobbies:', error);
        });
    }, [dispatch]);
    

    const handleDelete = (hobbyId) => {
        if (window.confirm('Are you sure you want to delete this hobby?')) {
            dispatch(deleteHobby(hobbyId));
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="manage-hobbies">
            <h1>Manage Hobbies</h1>
            <div className="hobbies-list">
                {userHobbies.map(hobby => (
                    <div key={hobby.id} className="hobby-item">
                        {/* Wrapping the entire hobby display in a Link may not be ideal if there are buttons inside */}
                        <div className="hobby-content">
                            {/* Use onClick to navigate for better control */}
                            <h3 onClick={() => window.location.href = `/hobbies/${hobby.id}`}>{hobby.name}</h3>
                            {/* Add hobby details if needed */}
                            <p>{hobby.description}</p>
                            {/* Assuming you have images */}
                            {hobby.imageUrl && <img src={hobby.imageUrl} alt={hobby.name} />}
                        </div>
                        <div className="hobby-actions">
                            {/* Include the update and delete buttons as per the wireframe */}
                            <button onClick={() => handleDelete(hobby.id)}>Delete</button>
                            <Link to={`/update-hobby/${hobby.id}`}>
                                <button>Update</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageHobbies;

