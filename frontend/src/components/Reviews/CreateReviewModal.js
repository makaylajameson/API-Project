import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createReviewThunk } from "../../store/reviews";
import { useModal } from "../../context/Modal";
import { fetchSingleSpot } from "../../store/spots";

export default function CreateReviewModal({ props }) {
  const { spot, user } = props

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(null);
  const [errors, setErrors] = useState(false);
  const [activeStars, setActiveStars] = useState(null)
  const [serverError, setServerError] = useState(null);

  const dispatch = useDispatch();
  const { closeModal } = useModal()

  useEffect(() => {
    let errors = {}
    if (stars < 1) errors.stars = "Stars can't be empty"
    if (review.length < 10) errors.review = "Review must be at least 10 characters long"

    setErrors(errors)
  }, [review, stars])

  if (!user) return <div> Loading</div>

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).length > 0) {
      alert("Please fix the errors you have")

    } else {

      let spotId = spot.id
      let reviews = { stars, review };

      await dispatch(createReviewThunk(reviews, spotId, user)).then(closeModal)

        .then(() => { dispatch(fetchSingleSpot(spotId)) })
        .catch(error => {
          setServerError(error.message)
        })
    }
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h2>How was your stay?</h2>
      {errors.review && <p className='errors form__errors'>{errors.review}</p>}
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Leave your review here...."
      />
      {serverError && <p className='errors form__errors'>Review must be more than 10 characters.</p>}

      <div className="star-container">
        <div className={stars >= 1 || activeStars >= 1 ? 'star-filled' : 'star-empty'}
          onClick={() => setStars(1)}
          onMouseEnter={() => setActiveStars(1)}
          onMouseLeave={() => setActiveStars(stars)}
        >
          <span className="material-symbols-outlined">star</span>
        </div>

        <div className={stars >= 2 || activeStars >= 2 ? 'star-filled' : 'star-empty'}
          onClick={() => setStars(2)}
          onMouseEnter={() => setActiveStars(2)}
          onMouseLeave={() => setActiveStars(stars)}
        >
          <span className="material-symbols-outlined">star</span>
        </div>

        <div className={stars >= 3 || activeStars >= 3 ? 'star-filled' : 'star-empty'}
          onClick={() => setStars(3)}
          onMouseEnter={() => setActiveStars(3)}
          onMouseLeave={() => setActiveStars(stars)}
        >
          <span className="material-symbols-outlined">star</span>
        </div>

        <div className={stars >= 4 || activeStars >= 4 ? 'star-filled' : 'star-empty'}
          onClick={() => setStars(4)}
          onMouseEnter={() => setActiveStars(4)}
          onMouseLeave={() => setActiveStars(stars)}
        >
          <span className="material-symbols-outlined">star</span>
        </div>

        <div className={stars >= 5 || activeStars >= 5 ? 'star-filled' : 'star-empty'}
          onClick={() => setStars(5)}
          onMouseEnter={() => setActiveStars(5)}
          onMouseLeave={() => setActiveStars(stars)}
        >
          <span className="material-symbols-outlined">star</span>
        </div>

        <span> Stars</span>
      </div>

      <button type="submit" disabled={Object.values(errors).length > 0} >Submit Your Review</button>

    </form>
  )
}
