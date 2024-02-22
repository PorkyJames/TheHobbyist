import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../redux/review";
import { useEffect } from "react";
import { updateReview, deleteReview } from "../../redux/review";

const ManageReviews = () => {
    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.review.reviews);
    // console.log(userReviews, "<<<<<<<userReviews");

    useEffect(() => {
        dispatch(getReview());
    }, [dispatch]);

    const handleUpdate = (reviewId) => {
        const updatedReviewData = {/* ... */};
        dispatch(updateReview(reviewId, updatedReviewData));
    };

    const handleDelete = (reviewId) => {
        // Confirm with the user before deletion
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview(reviewId));
        }
    };

    const reviewList = userReviews && Object.values(userReviews).length > 0 ? (
        Object.values(userReviews).map((review) => (
            <li key={review.id}>
                {review.review_text} - {review.star_rating} stars
                <button onClick={() => handleUpdate(review.id)}>Update</button>
                <button onClick={() => handleDelete(review.id)}>Delete</button>
            </li>
        ))
    ) : (
        <li>No reviews found.</li>
    );

    return (
        <>
            <h1>Review Component Coming Soon...</h1>
            {/* <ul>{reviewList}</ul> */}
        </>
    );
};

export default ManageReviews;
