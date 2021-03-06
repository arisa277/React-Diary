import React, { useState } from "react";
import firebase, { db } from "../Firebase/Firebase";

function Posting() {
  const [emoji, setEmoji] = useState("");

  function postFeeling() {
    const kimochi = document.getElementsByClassName("kimochi")[0];
    if (kimochi.value.length > 0) {
      db.collection("diary").add({
        date: new Date(),
        kimochi: kimochi.value,
        emoji: emoji,
      });
      kimochi.value = "";
      emoji = "";
    }
  }

  return (
    <div className="posting">
      <div className="">
        <p>How was your day? {emoji}</p>
        <div className="emojis">
          <p
            onClick={(e) => setEmoji(e.target.innerHTML)}
            className={(e) => (emoji == e.target.innerHTML ? "selected" : "")}
          >
            😆
          </p>
          <p onClick={(e) => setEmoji(e.target.innerHTML)}>😡</p>
          <p onClick={(e) => setEmoji(e.target.innerHTML)}>😢</p>
          <p onClick={(e) => setEmoji(e.target.innerHTML)}>😀</p>
        </div>
      </div>
      <textarea className="kimochi"></textarea>
      <button onClick={() => postFeeling()}>Add today's feeling !</button>
    </div>
  );
}

export default Posting;
