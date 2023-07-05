import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../../store/spots";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import SpotReviews from "../Reviews/SpotReviews";
import OpenModalButton from '../OpenModalButton'
import ComingSoonModal from '../ComingSoonModal'
import './SingleSpotDetails.css'

export default function SpotDetail( { user }) {
    const { spotId } = useParams();
    const [, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);

    useEffect(() => {
        dispatch(fetchSingleSpot(spotId));
        setIsLoading(false)
    }, [dispatch, spotId]);

    if (!spot.name) return <div>Loading...</div>;

    const {
        name,
        Owner,
        city,
        state,
        country,
        SpotImages,
        description,
        price,
        avgStarRating,
        numReviews
    } = spot

    const previewImg = SpotImages.find(image => image.preview) || SpotImages[0];
    const SpotImagesExtra = SpotImages.filter(image => !image.preview);

    return (

        <div className="spot-details">
            <div className="spot-details-header">
                <h1>{name}</h1>
                <h3>{city}, {state}, {country}</h3>
            </div>

            <div className="spot-image-box">
                <div className="spot-image">
                    <img className="preview-image" alt='' src={previewImg.url} />
                </div>
                <div className='spot-image-tiles'>
                    {SpotImagesExtra.slice(0, 5).map((spot, image) => (
                        <img src={spot.url} key={image} className="tile-image" alt={name} />
                    ))}
                </div>
            </div>

            <div className="spot-details-info">
                <div className="spot-details-description">
                    <h3>Hosted by {Owner.firstName} {Owner.lastName}</h3>
                    <p>{description}</p>
                </div>

                <div className="spot-details-booking">
                    <div className="spot-details-booking-info">
                        <span className="spot-details-price">${price}</span>
                        <span className="spot-detail-night"> night</span>
                    </div>

                    <div className='spot-rating'>
                        <span className="material-symbols-outlined">star</span>
                        <span className={avgStarRating ? 'rating' : 'new-rating'}>{avgStarRating ? avgStarRating : 'New!'}</span>
                    </div>

                </div>

                <div className='button-action'>
                    <OpenModalButton
                        buttonText="Reserve"
                        modalComponent={<ComingSoonModal />}

                    />
                </div>



            </div>
            <SpotReviews props={{ spotId, user, avgStarRating, numReviews, spot }} />
        </div>

    )
}
