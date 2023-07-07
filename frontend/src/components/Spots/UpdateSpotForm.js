import { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSpotThunk } from '../../store/spots';

const UpdateSpot = ( { spot} ) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [description, setDescription] = useState(spot?.description)
    const [name, setName] = useState(spot?.name)
    const [price, setPrice] = useState(spot?.price)
    const [lat] = useState(37.7645358);
    const [lng] = useState(-122.4730327);
    const [errors, setErrors] = useState({});

    useEffect(() => {

        const formErrors = {};

        if (!country) formErrors.country = 'Country is required.';
        if (!address) formErrors.address = 'Address is required.';
        if (!city) formErrors.city = 'City is required.';
        if (!state) formErrors.state = 'State is required.';
        if (description.length < 30) formErrors.description = 'Description is required and must be at least 30 characters.';
        if (!price) formErrors.price = 'Price is required.';
        if (!name) formErrors.name = 'Name is required.';

        setErrors(formErrors);

    }, [country, address, city, state, description, name, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    const addSpot = {
        country,
        address,
        lat,
        lng,
        city,
        state,
        description,
        name,
        price,
      }

      if (!Object.values(errors).length) {

        const newSpot = await dispatch(updateSpotThunk(addSpot, spot.id));
        const formErrors = { ...errors, Errors: newSpot.errors };

        if (newSpot.errors) setErrors(formErrors);
        else await history.push(`/spots/${newSpot.id}`);
      }

    }

    return (
        <form className='create-spot'>
            <h1>Update your Spot!</h1>


            <div className='create-spot-header'>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>

                <label>
                    Country
                </label>
                <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder='Country'
                />
                <p className='handle-form-errors'>{errors.country}</p>

                <label>
                    Street Address
                </label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder='Address'
                />
                <p className='handle-form-errors'>{errors.address}</p>

                <label>
                    City
                </label>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='City'
                /><p className='handle-form-errors'>{errors.city}</p>

                <label>
                    State
                </label>
                <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder='State'
                /><p className='handle-form-errors'>{errors.state}</p>
            </div>

            <div className='create-spot-header'>
                <h3>Describe your place to guests</h3>
                <p>Mention the best feature of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <p className='handle-form-errors'>{errors.description}</p>
            </div>

            <div className='create-spot-header'>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name of your spot'
                />
                <p className='handle-form-errors'>{errors.name}</p>
            </div>

            <div className='create-spot-header'>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $ <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder='Price per night (USD)'
                />
                <p className='handle-form-errors'>{errors.price}</p>
            </div>

            <button type="submit" onClick={handleSubmit}> Update your Spot</button>
        </form>
    )

}

export default UpdateSpot
