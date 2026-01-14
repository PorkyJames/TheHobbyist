import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../redux/review';

import './CreateReviewModal.css'; 

const ReviewModal = ({ hobbyId, isUserHobby, onClose }) => {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);
    const [selectedRating, setSelectedRating] = useState(0);

    const handleStarClick = (clickedStar) => {
        setSelectedRating(clickedStar);
        setHoveredRating(0);
    };

    const handleStarHover = (hoveredStar) => {
        setHoveredRating(hoveredStar);
    };

    const submitReview = async (e) => {
    e.preventDefault();
    if (!isUserHobby) {
        const payload = {
            hobby_id: hobbyId,
            review_text: reviewText,
            star_rating: selectedRating,
        };
        const response = await dispatch(createReview(payload));
        if (response) {
            onClose(); 
        }
    }
    };

    const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
        <span
            key={i}
            className={`star ${i <= (hoveredRating || selectedRating) ? 'filled' : 'empty'}`}
            onMouseEnter={() => handleStarHover(i)}
            onClick={() => handleStarClick(i)}
            onMouseLeave={() => setHoveredRating(selectedRating)}
        >
            {i <= (hoveredRating || selectedRating) ? '★' : '☆'}
        </span>
        );
    }
    return stars;
    };

    return (
    <div className="review-modal">
        <h2>Leave a Review</h2>
        <form onSubmit={submitReview}>
        <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Leave your review here..."
        />
        <div className="star-rating">{renderStars()}</div>
        <button
            type="submit"
            disabled={reviewText.length === 0 || selectedRating === 0}
        >
            Submit Review
        </button>
        </form>
    </div>
    );
};

export default ReviewModal;

