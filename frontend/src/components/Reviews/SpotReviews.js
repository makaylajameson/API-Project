import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSpotReviews } from "../../store/reviews";
import DeleteReview from "./DeleteReview";
import OpenModalButton from "../OpenModalButton";

export default function SpotReviews({ props }) {

  const { spotId, avgStarRating, numReviews, spot } = props;

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews.spot).reverse());
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchSpotReviews(spotId));
    setIsLoading(false);
  }, [dispatch, spotId]);

  if (isLoading) return <div>Loading...</div>;

  const getMonth = (date) => {
    const event = new Date(date);
    const options = { month: "long", year: "numeric" };
    return event.toLocaleDateString("default", options);
  };



  const spotOwner = user && user.id === spot.Owner.id;
  const hasLeftReview = user && reviews.find((review) => review.User.id === user.id);

  return (


    <div className="spotReviews">
      <div className="spot-details-reviews">
        <span className="material-symbols-outlined">star</span>
        <span className={avgStarRating ? "" : "new-rating"}> {avgStarRating ? avgStarRating : "New!"} </span>
        <span className="dot">·</span>
        <span className={numReviews ? "" : "hidden"}> {numReviews === 1 ? `${numReviews} review` : `${numReviews} reviews`}</span>
      </div>


      {user && !(hasLeftReview || spotOwner || reviews.length > 0) && (<p>Be the first to post a review!</p>)}

      {reviews.map((review) => (
        <div className="reviews-card" key={review.id}>
          <p className="reviews-name">{review.User.firstName}</p>
          <p className="reviews-date">{getMonth(review.createdAt)}</p>
          <p className="reviews-review">{review.review}</p>
          {user && review.User.id === user.id && (
            <OpenModalButton buttonText="Delete Review" modalComponent={<DeleteReview reviewId={review.id} spotId={spot.id} />} />
          )}
        </div>
      ))}
    </div>
  );
}
