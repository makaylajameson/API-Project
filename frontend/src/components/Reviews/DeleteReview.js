import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { fetchSingleSpot } from "../../store/spots"

const DeleteReview = ({ reviewId, spotId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    return (

            <div className="delete-review-modal">
                <h1>Confirm Delete</h1>
                <h2>Are you sure you want to delete this review?</h2>
                <button className="red-button" type="button"
                onClick={() => {dispatch(deleteReviewThunk(reviewId)).then(() => dispatch(fetchSingleSpot(spotId))).then(closeModal)}}>
                    Yes Delete Review</button>
                <button className="grey-button" type="button" onClick={closeModal}>No Please Keep Review</button>
            </div>
    )
}

export default DeleteReview
