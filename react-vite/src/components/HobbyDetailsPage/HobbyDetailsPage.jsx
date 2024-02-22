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
            <div className ="name">
                <h1>{hobbyDetails.name}</h1>
            </div>
            <div className="description">
                <p>Details: {hobbyDetails.description}</p>
            </div>
            <div className="location">
                <p>Location: {hobbyDetails.location}</p>
            </div>

            {/* <div className="bookmarks-placeholder">Bookmarks will go here</div> */}
            
            {/* <div className="reviews-placeholder">Reviews will go here</div> */}
            {/* Eventually, you would map over the reviews and render them here */}
        </div>
    );
};

export default HobbyDetailsPage;
