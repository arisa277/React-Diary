import React, { useState } from "react";
import firebase, { db } from "../Firebase/Firebase";

const Modal = (props) => {
  const [isVisible, setIsVisible] = useState(false)
  const [emoji, setEmoji] = useState("");
  const [kimochi, setKimochi] = useState("");


  return (
    <div>
      {props.isVisible && (
        <div className="overlay" onClick={props.closeModalHandler}>
          <form
            className="modal-content"
            onSubmit={props.addFeeling}
          >
            <div className="posting">
              <p>How was your day? {emoji}</p>

              <div className="emojis">
                <span
                  onClick={(e) => setEmoji(e.target.innerHTML)}
                  className={(e) =>
                    emoji == e.target.innerHTML ? "selected" : ""
                  }
                >
                  😆
                </span>
                <span onClick={(e) => setEmoji(e.target.innerHTML)}>😡</span>
                <span onClick={(e) => setEmoji(e.target.innerHTML)}>😢</span>
                <span onClick={(e) => setEmoji(e.target.innerHTML)}>😀</span>
              </div>
              <div className="message">
                <textarea
                  className="kimochi"
                  onChange={(e) => setKimochi(e.target.value)}
                ></textarea>
                <button className="add-btn" onClick={props.postFeeling}>
                  Add today's feeling !
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Modal;
