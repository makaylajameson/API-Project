import { useModal } from "../../context/Modal";

const ComingSoon = () => {
    const { closeModal } = useModal();

    return (
        <>
            <h2 className="reserve-modal-header">Feature Coming Soon...</h2>
            <button className="exit-button" onClick={closeModal}>Exit</button>
        </>
    )
}

export default ComingSoon
