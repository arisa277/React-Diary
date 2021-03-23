import React, { useState } from "react";
import firebase, { db } from "../Firebase/Firebase";

const Modal = () => {
  const [show, setShow] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [kimochi, setKimochi] = useState("");

  function postFeeling() {
    if (kimochi.length > 0) {
      db.collection("diary")
        .add({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          kimochi: kimochi,
          emoji: emoji,
        })
        .then(() => {
          setEmoji("");
          setKimochi("");
          setShow(false);
          console.log("yay");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("nothing?");
    }
    console.log("err?");
  }

  const modalContent = () => {
    if (show) {
      return (
        <div className="overlay" onClick={() => setShow(false)}>
          <div
            className="modal-content"
            onClick={(event) => event.stopPropagation()}
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
                <button className="add-btn" onClick={() => postFeeling()}>
                  Add today's feeling !
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <button className="modal-btn" onClick={() => setShow(true)}>
        Add today's feeling
      </button>
      <div>{modalContent()}</div>
    </div>
  );
};

export default Modal;
