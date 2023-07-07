import { useDispatch, useSelector } from "react-redux";
import UpdateSpotForm from "./UpdateSpotForm";
import { Redirect } from "react-router-dom";
import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchSingleSpot } from "../../store/spots";

const UpdateSpot = () => {

    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.singleSpot);
    const user = useSelector((state) => state.session.user);


    useEffect(() => {
      dispatch(fetchSingleSpot(spotId));
    }, [dispatch]);

    if (!spot.name) return < div > Loading...</div >;
    if (!user) return <Redirect to="/" />;

    return (
      < UpdateSpotForm spot={spot} formType="Update Spot" />
    );
  };

  export default UpdateSpot
