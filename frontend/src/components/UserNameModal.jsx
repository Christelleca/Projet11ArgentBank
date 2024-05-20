import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserName } from "../redux/UpdateUserProfileSlice";
import { fetchUserProfile } from "../redux/UserProfileSlice";

const UserNameModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const [newUserName, setNewUserName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setNewUserName(""); // Réinitialiser le champ lorsqu'on ouvre la modale
            setError(""); // Réinitialiser le message d'erreur
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setNewUserName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUserName.trim() === "") {
            setError("Username cannot be empty");
            return;
        }
        dispatch(updateUserName(newUserName)).then(() => {
            dispatch(fetchUserProfile()); // Recharger le profil utilisateur après la mise à jour
            onClose();
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <label>
                        New Username:
                        <input
                            type="text"
                            value={newUserName}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">Save</button>
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    {error && (
                        <p style={{ color: "red", marginTop: "10px" }}>
                            {error}
                        </p>
                    )}{" "}
                    {/* message d'erreur */}
                </form>
            </div>
        </div>
    );
};

export default UserNameModal;
