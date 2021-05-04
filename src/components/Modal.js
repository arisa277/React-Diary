import React from "react";
import './Modal.css'

const Modal = (props) => {
  return (
    <div>
      <div className="overlay" onClick={props.closeModalHandler} />
      <form
        className="modal-content"
        onSubmit={props.dataExisted ? props.updateFeeling : props.addFeeling}
      >
        <div className="posting">
          <p className="clickedDay">{props.day}</p>
          <p className="question">How was your day? {props.emoji}</p>
          <div className="emojis">
            <span className="emoji happy" onClick={props.emojiHandler}>😆</span>
            <span className="emoji angry" onClick={props.emojiHandler}>😡</span>
            <span className="emoji sad" onClick={props.emojiHandler}>😢</span>
            <span className="emoji good" onClick={props.emojiHandler}>😀</span>
          </div>
          <p className="errorMessage">{props.errorMessage}</p>
          <div className="message">
            <textarea
              className="kimochi"
              onChange={props.kimochiHandler}
              value={props.kimochi}
              required
            />
            <button className="add-btn" type="submit">
              {props.dataExisted
                ? "Update your feeling!"
                : "Add your feeling!"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
