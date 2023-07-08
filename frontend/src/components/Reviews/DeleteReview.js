import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../../store/reviews";
import { fetchSingleSpot } from "../../store/spots"
import "./Reviews.css"

const DeleteReview = ({ reviewId, spotId }) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async () => {
        await dispatch(deleteReviewThunk(reviewId))
        await dispatch(fetchSingleSpot(spotId))
        closeModal()
    }

    return (
        <div className="delete-review-modal">
            <h1 className="delete-header">Confirm Delete</h1>
            <h2 className="delete-subheader">Are you sure you want to delete this review?</h2>
            <div className="delete-button-container">
                <button className="red-button" type="button" onClick={handleDelete}>Yes Delete Review</button>
                <button className="grey-button" type="button" onClick={closeModal}>No Keep Review</button>
            </div>
        </div>
    )
}

export default DeleteReview
