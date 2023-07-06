import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpotThunk } from "../../store/spots";


const DeleteSpotModal = ({ spot }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteSpotThunk(spot.id))
      .then(closeModal)
  }
  return (
    <div>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot from your listings?</p>
      <button onClick={handleDelete}>Yes, Delete Spot!</button>
      <button onClick={closeModal}>No, Keep Spot!</button>
    </div>
  );
}

export default DeleteSpotModal
