import { useHistory } from "react-router-dom";

export default function CurrentUserSpot({ spot }) {
    const { id, name, previewImage, city, state, avgRating, price } = spot;

    const history = useHistory()
    const handleClick = () => {
        history.push(`/spots/${id}`)
    }

    return (

        <div className='spots-card' key={id} onClick={handleClick}>
            <div className='user-spots-image'>
                <img src={previewImage} alt={`${name}`} className="spot-image" />
            </div>

            <div className='spots-details'>
                <div className='spots-place'>
                    <span>{city}</span>, <span>{state}</span>
                </div>
                <div className='spots-star-rating'>
                    <span className="material-symbols-outlined">star</span>
                    {avgRating ? `${Number(avgRating).toFixed(1)}` : 'New!'}
                </div>
            </div>

            <div className='spots-price-night'>
                <span className='spots-price'>${price}</span>
                <span className='spots-night'> night</span>
            </div>
        </div >
    )
}
