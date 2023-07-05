import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import DeleteReview from "./DeleteReview";
import OpenModalButton from "../OpenModalButton";

export default function SpotReviews({ props }) {
  const { spotId, avgStarRating, numReviews, spot } = props;

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const reviews = useSelector((state) => Object.values(state.reviews.spot));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  const getMonth = (date) => {
    const event = new Date(date);
    const month = event.toLocaleString("default", { month: "long" });
    const year = event.toLocaleString("default", { year: "numeric" });
    return `${month} ${year}`;
  };


  const spotOwner = user && user.id === spot.Owner.id;
  const hasLeftReview = user && reviews.find((review) => review.User.id === user.id);

  return (
    <div className="spotReviews">
      <div className="spotDetails-details-reviews" id="review-details">
        <span className="material-symbols-outlined">star</span>
        <span className={avgStarRating ? "" : "new-rating"}>
          {avgStarRating ? avgStarRating : "New!"}
        </span>
        <span className={`dot ${numReviews ? "" : "hidden"}`}></span>
        <span className={numReviews ? "" : "hidden"}>
          {numReviews === 1 ? `${numReviews} review` : `${numReviews} reviews`}
        </span>
      </div>

      {user && !(hasLeftReview || spotOwner || reviews.length > 0) && (<p>Be the first to post a review!</p>)}

      {reviews.map((review) => (
        <div className="reviews-card" key={review.id}>
          <p className="reviews-name">{review.User.firstName}</p>
          <p className="reviews-date">{getMonth(review.createdAt)}</p>
          <p className="reviews-review">{review.review}</p>
          {user && review.User.id === user.id && (
            <OpenModalButton
              buttonText="Delete Review"
              modalComponent={<DeleteReview reviewId={review.id} spotId={spot.id} />}
            />
          )}
        </div>
      ))}
    </div>
  );
}
