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
    <div className="delete-review-modal">
      <h1 className="delete-header">Confirm Delete</h1>
      <h2 className="delete-subheader">Are you sure you want to remove this spot from your listings?</h2>
      <div className="delete-button-container">
        <button className="red-button" onClick={handleDelete}>Yes, Delete Spot!</button>
        <button className="grey-button" onClick={closeModal}>No, Keep Spot!</button>
      </div>
    </div >
  )
}

export default DeleteSpotModal
