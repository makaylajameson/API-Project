import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link, Redirect } from "react-router-dom";
import CurrentUserSpot from './CurrentUserSpot';
import { currentUserSpots } from "../../store/spots";
import DeleteSpotModal from "./DeleteSpotModal";
import OpenModalButton from "../OpenModalButton";
import "./ManageSpot.css"

const ManageSpots = () => {

    const [isLoading, setIsLoading] = useState(true);
    const spots = Object.values(useSelector((state) => state.spots.allSpots))
    const user = useSelector(state => state.session.user)
    const userSpots = spots.filter(spot => spot.ownerId === user.id)
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(currentUserSpots());
        setIsLoading(false)
    }, [dispatch])

    if (!user) return <Redirect to='/' />;
    if (isLoading) return <div>Loading...</div>;

    const handleUpdate = (id) => {
        history.push(`/spots/${id}/edit`);
    }

    return (
        <>
            <h1 className="manage-spots" >Manage Spots</h1>
            <Link to='/spots/new'>
                <button className="create-spot-button" >Create a new spot!</button>
            </Link>
            <div className="landing-page">
                {userSpots.map(spot => (
                    <div className="landing-page-card">
                        <div className="landing-page-images">
                        <CurrentUserSpot spot={spot} key={spot.id} />
                        </div>
                        <div className='spots-card-buttons'>
                            <button className="update-button" onClick={() => handleUpdate(spot.id)}>Update Spot</button>

                            <OpenModalButton
                                className="delete-button"
                                buttonText="Delete"
                                modalComponent={<DeleteSpotModal spot={spot} />}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageSpots
