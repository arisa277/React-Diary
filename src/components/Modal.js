import React from "react";

const Modal = (props) => {
  return (
    <div>
      <div className="overlay" onClick={props.closeModalHandler} />
      <form
        className="modal-content"
        onSubmit={props.dataExisted ? props.updateFeeling : props.addFeeling}
      >
        <div className="posting">
          <p>How was your day? {props.emoji}</p>
          <div className="emojis">
            <span onClick={props.emojiHandler}>😆</span>
            <span onClick={props.emojiHandler}>😡</span>
            <span onClick={props.emojiHandler}>😢</span>
            <span onClick={props.emojiHandler}>😀</span>
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
                : "Add your feeling of this day!"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
