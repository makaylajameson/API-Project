import { useHistory } from 'react-router-dom';
import './SpotsIndex.css';

export default function SingleSpotDetail({ spot }) {
    const { id, name, previewImage, city, state, avgRating, price } = spot;
    const history = useHistory();

    const handleClick = () => {
        history.push(`/spots/${id}`);
    };

    return (
        <div className='spot-card' onClick={handleClick}>
            <div className='spot-image-container'>
                <img src={previewImage} alt='' className='spot-image' title={name} />
                <div className='spot-name'>{name}</div>
            </div>
            <div className='spot-details'>
                <div className='spot-location'>
                    {city}, {state}
                </div>
                <div className='spot-rating'>
                    <span className="material-symbols-outlined">star</span>
                    <span className={avgRating ? 'rating' : 'new-rating'}>{avgRating ? avgRating : 'New!'}</span>
                </div>
                <div className='spot-price'>
                    <span className='price'>${price}</span>
                    <span className='price-unit'>/ night</span>
                </div>
            </div>
        </div>
    );
}
