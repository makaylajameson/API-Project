import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetSpots } from "../../store/spots";
import SpotCard from "../Spots/SpotCard"

const SpotsIndex = () => {

    const [isLoading, setIsLoading] = useState(true);
    const spotsObj = useSelector((state => state.spots.allSpots))
    const spots = Object.values(spotsObj || {})
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(thunkGetSpots());
        setIsLoading(false)

    }, [dispatch]);

    if (isLoading) return <div>Loading...</div>;

    if (!spots.length) return null;

    return (

        <div className="spot-body">
            {spots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
            ))}

        </div>
    );
}

export default SpotsIndex;
