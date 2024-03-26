import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../redux/review";
import { useEffect } from "react";
// import { updateReview, deleteReview } from "../../redux/review";

const ManageReviews = () => {
    const dispatch = useDispatch();
    const userReviews = useSelector(state => state.review.reviews);
    // console.log(userReviews, "<<<<<<<userReviews");

    useEffect(() => {
        dispatch(getReview());
    }, [dispatch]);

    // const handleUpdate = (reviewId) => {
    //     //! Add in handleUpdate logic and Modal
    //     dispatch(updateReview(reviewId));
    // };

    // const handleDelete = (reviewId) => {
    //     //! Confirm with the user before deletion and add Delete Review Modal
    //     dispatch(deleteReview(reviewId));

    // };

    const reviewList = userReviews && Object.values(userReviews).length > 0 ? (
        Object.values(userReviews).map((review) => (
            <li key={review.id}>
                {review.review_text} - {review.star_rating} stars
                {/* <button onClick={() => handleUpdate(review.id)}>Update</button>
                <button onClick={() => handleDelete(review.id)}>Delete</button> */}
            </li>
        ))
    ) : (
        <li>No reviews found.</li>
    );

    return (
        <>
            <h1>Review Component Coming Soon...</h1>
            <h3> but here is a sample </h3>
            <ul>{reviewList}</ul>
        </>
    );
};

export default ManageReviews;
