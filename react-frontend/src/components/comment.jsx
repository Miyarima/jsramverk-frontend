import React, { useState } from "react";
import PropTypes from "prop-types";

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(comment);
    setComment("");
  };

  const handleClose = () => {
    onClose();
    setComment("");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Write a Comment</h2>
        <textarea
          value={comment}
          className="modal-comment-area"
          onChange={(e) => setComment(e.target.value)}
          rows={5}
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

const AddComment = ({ caretPosition, socketRef, newComment }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (comment) => {
    console.log("Submitted comment:", comment);
    console.log("Cursors position was:", caretPosition);
    setModalOpen(false);
    socketRef.current.emit("comment", { comment: comment, caretPosition });
    newComment({ comment: comment, caretPosition });
  };

  return (
    <div className="modal-container">
      <button className="modal-comment-button" onClick={handleModalOpen}>
        Lägg till kommentar
      </button>
      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AddComment.propTypes = {
  caretPosition: PropTypes.object.isRequired,
  socketRef: PropTypes.object.isRequired,
  newComment: PropTypes.func.isRequired,
};

export default AddComment;
