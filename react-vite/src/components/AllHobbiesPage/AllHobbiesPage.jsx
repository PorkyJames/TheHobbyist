import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHobbies } from '../../redux/hobby';
import { Link } from 'react-router-dom';

const AllHobbiesPage = () => {
    const dispatch = useDispatch();
    const allHobbies = useSelector(state => state.hobby);
    // console.log(allHobbies, "<<<<<All hobbies")

    useEffect(() => {
        dispatch(getAllHobbies());
    }, [dispatch]);

    return (
        <div className="all-hobbies-page">
            <h1>All Hobbies</h1>
            <div className="hobbies-list">
                {allHobbies.map(hobby => (
                    <div key={hobby.id} className="hobby-item">
                        <div className="hobby-content">
                            <h3>{hobby.name}</h3>
                            <p>{hobby.description}</p>
                            <p>{hobby.location}</p>
                        </div>
                        <div className="hobby-actions">
                            <Link to={`/hobbies/${hobby.id}`}>
                                <button>View</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllHobbiesPage;
