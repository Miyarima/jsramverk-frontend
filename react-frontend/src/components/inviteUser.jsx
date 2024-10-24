import React, { useState } from "react";
import PropTypes from "prop-types";

const InviteModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(email);
    setEmail("");
  };

  const handleClose = () => {
    onClose();
    setEmail("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Email att bjuda in</h2>
        <input
          type="text"
          value={email}
          className="modal-comment-area"
          onChange={(e) => setEmail(e.target.value)}
          rows={1}
        />
        <div>
          <button
            onClick={handleClose}
            className="modal-button modal-button-cancel"
          >
            Cancel
          </button>
          <button onClick={handleSubmit} className="modal-button">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const AddCollaborator = ({ socketRef, documentId, currentPath }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (email) => {
    setModalOpen(false);
    let path = "https://www.student.bth.se/~jogo19/editor";
    if (currentPath === "http://localhost:1337") {
      path = "http://localhost:3000";
    }
    socketRef.current.emit("invite", {
      email: email,
      id: documentId,
      link: path,
    });
  };

  return (
    <div className="modal-container">
      <button className="modal-comment-button" onClick={handleModalOpen}>
        Bjud in
      </button>
      <InviteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

InviteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AddCollaborator.propTypes = {
  socketRef: PropTypes.object.isRequired,
  currentPath: PropTypes.string.isRequired,
  documentId: PropTypes.string.isRequired,
};

export default AddCollaborator;
