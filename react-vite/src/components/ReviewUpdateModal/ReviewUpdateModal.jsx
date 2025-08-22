// import { useDispatch } from 'react-redux';
// import { useModal } from '../../context/Modal';
// import { updateReview, getReview } from '../../redux/review';

// import '/ReviewUpdateModal.css'

// const ReviewUpdateModal = ({hobbyId}) => {

//     const dispatch = useDispatch();
//     const { setModalContent } = useModal();

//     const handleUpdate = () => {
//         //! Dispatch the update review based on hobbyId
//         dispatch(updateReview(hobbyId))
//         //! Then we'll dispatch the get review after the review
//         //! has been updated. Then we'll reset the modal Content to
//         //! Null to close it out. 
//             .then(() => {
//                 dispatch(getReview())
//                 setModalContent(null);
//             })
//     }

//     return (
//         <>
//             <div className = "review-modal-overlay">
//                 <div className="review-modal-content">
//                     <div className="review-modal-head">
                        
//                     </div>    
//                 </div>
//             </div>
//             <h1> This is the Review Modal </h1>
//         </>
//     );
// }

// export default ReviewUpdateModal;
