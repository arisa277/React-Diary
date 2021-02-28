import React, { useState } from "react";

function Posting() {
  const [emoji, setEmoji] = useState("");

  return (
    <div className="posting">
      <div className="">
        <p>How was your day?{emoji}</p>
        <div className="emojis">
          <span
            onClick={(e) => setEmoji(e.target.innerHTML)}
            className={ (e) => (emoji == e.target.innerHTML ? "selected" : "")}
          >
            😆
          </span>
          <span onClick={(e) => setEmoji(e.target.innerHTML)}>😡</span>
          <span onClick={(e) => setEmoji(e.target.innerHTML)}>😢</span>
          <span onClick={(e) => setEmoji(e.target.innerHTML)}>😀</span>
        </div>
      </div>
      <textarea></textarea>
      <button>Add today's feeling</button>
    </div>
  );
}

export default Posting;
