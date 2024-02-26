import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllHobbies } from '../../redux/hobby';
import { Link } from 'react-router-dom';

import './AllHobbiesPage.css'

const AllHobbiesPage = () => {
    const dispatch = useDispatch();
    const allHobbies = useSelector(state => state.hobby.allHobbies);
    // console.log(allHobbies, "<<<<<All hobbies")
    // re-commit

    useEffect(() => {
        dispatch(getAllHobbies());
    }, [dispatch]);

    return (
        <div className="all-hobbies-page">
            <div className='title-all-hobbies'>
                <h1>All Hobbies</h1>
            </div>
            <div className="hobbies-list">
                {Array.isArray(allHobbies) && allHobbies.map(hobby => (
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
