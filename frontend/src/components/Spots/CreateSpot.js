import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSpotThunk } from "../../store/spots";
import "./CreateSpotForm.css"


export default function CreateSpot({ user }) {

  const history = useHistory();
  const dispatch = useDispatch();

  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [lat, setLat] = useState(37.7645358);
  const [lng, setLng] = useState(-122.4730327);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {

    const imageUrls = [previewImage, image1, image2, image3, image4];
    const formErrors = {};

    if (!country) formErrors.country = 'Country is required.';
    if (!address) formErrors.address = 'Address is required.';
    if (!city) formErrors.city = 'City is required.';
    if (!state) formErrors.state = 'State is required.';
    if (description.length < 30) formErrors.description = 'Description is required and must be at least 30 characters.';
    if (!price) formErrors.price = 'Price is required.';
    if (!name) formErrors.name = 'Name is required.';
    if (!previewImage) formErrors.previewImage = 'Preview Image is required.';

    const validUrlEndings = ['png', 'jpg', 'jpeg'];

    imageUrls.forEach((img, index) => {
      if (img && !validUrlEndings.some((ending) => img.endsWith(ending))) {
        formErrors[`image${index}`] = 'Image URL must end in .png, .jpg, or .jpeg.';
      }
    });

    setErrors(formErrors);

  }, [country, address, city, state, description, name, price, previewImage, image1, image2, image3, image4]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imageUrls = [previewImage, image1, image2, image3, image4];

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
    };

    const imagesArray = [];

    if (!Object.values(errors).length) {
      imageUrls.forEach((img, index) => {
        const obj = { url: img, preview: index === 0 };
        if (img) imagesArray.push(obj);
      });

      const newSpot = await dispatch(createSpotThunk(addSpot, imagesArray, user));
      const formErrors = { ...errors, Errors: newSpot.errors };

      if (newSpot.errors) setErrors(formErrors);
      else history.push(`/spots/${newSpot.id}`);
    }
  };


  return (
    <form className='create-spot'>
      <h1 className="create-spot-title">Create a New Spot!</h1>
      <div className='create-spot-header'>
        <h3>Where's your place located?</h3>
        <p>Guests will only get your exact address once they booked a reservation.</p>

        <div className="label-errors">
          <label>
            <span className="field-label">Country</span>
          </label>
          <p className='handle-form-errors'>{errors.country}</p>
        </div>

        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder='Country'
          className="country-input"
        />
        <div className="label-errors">
          <label>
            <span className="field-label">Street Address</span>
          </label>
          <p className='handle-form-errors'>{errors.address}</p>
        </div>

        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Address'
          className="address-input"
        />

        <div className="city-state-container">
          <div className="city">
            <div className="label-errors">
              <label>
                <span className="field-label">City</span>
              </label>
              <p className='handle-form-errors'>{errors.city}</p>
            </div>

            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder='City'
              className="city-input"
            />
          </div>
          <div className="state">
            <div className="label-errors">
              <label>
                <span className="field-label">State</span>
              </label>
              <p className='handle-form-errors'>{errors.state}</p>
            </div>

            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder='State'
              className="state-input"
            />
          </div>
        </div>
      </div>

      <div className='create-spot-header'>
        <h3>Describe your place to guests</h3>
        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please write at least 30 characters..."
          className="description-input"
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
          className="spot-title-input"
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
          className="price-input"
        />
        <p className='handle-form-errors'>{errors.price}</p>
      </div>

      <div className='create-spot-header'>
        <h3>Liven up your spot with photos</h3>
        <p>Submit a link to at least one photo to publish your spot.</p>
        <input
          type="url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
          placeholder='Preview Image URL'
          className="image-input"
        />
        <p className='handle-form-errors'>{errors.previewImage}</p>
        <input
          type="url"
          value={image1}
          onChange={(e) => setImage1(e.target.value)}
          placeholder='Image URL'
          className="image-input"
        />
        <p className='handle-form-errors'>{errors.image1}</p>
        <input
          type="url"
          value={image2}
          onChange={(e) => setImage2(e.target.value)}
          placeholder='Image URL'
          className="image-input"
        />
        <p className='handle-form-errors'>{errors.image2}</p>
        <input
          type="url"
          value={image3}
          onChange={(e) => setImage3(e.target.value)}
          placeholder='Image URL'
          className="image-input"
        />
        <p className='handle-form-errors'>{errors.image3}</p>
        <input
          type="url"
          value={image4}
          onChange={(e) => setImage4(e.target.value)}
          placeholder='Image URL'
          className="image-input"
        />
        <p className='handle-form-errors'>{errors.image4}</p>
      </div>

      <button type="submit" onClick={handleSubmit} className="create-spot-button">Create Spot</button>
    </form>
  )

}
