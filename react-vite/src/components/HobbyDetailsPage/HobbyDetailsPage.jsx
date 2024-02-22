import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getHobbyById } from '../../redux/hobby';

import './HobbyDetailsPage.css';

const HobbyDetailsPage = () => {
    const { hobbyId } = useParams();
    const dispatch = useDispatch();
    const hobbyDetails = useSelector((state) => state.hobby[hobbyId]);

    useEffect(() => {
        dispatch(getHobbyById(hobbyId));
    }, [dispatch, hobbyId]);

    if (!hobbyDetails) {
        return <div>Loading hobby details...</div>;
    }

    return (
        <div className="hobby-details-page">
            <div className="left-column">
                <h1>{hobbyDetails.name}</h1>
            </div>
            <div className="right-column">
                <div className="section">
                    <h2>Details</h2>
                    <p>{hobbyDetails.description}</p>
                </div>
                <div className="section">
                    <h2>Location</h2>
                    <p>{hobbyDetails.location}</p>
                </div>
                <div className="section">
                    <h2>Thoughts</h2>
                    <p>{hobbyDetails.thoughts}</p>
                </div>
            </div>
        </div>
    );
};

export default HobbyDetailsPage;
