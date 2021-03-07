import React from "react";
import Calendar from "./Calendar";
import Posting from "./Posting";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <header>
        <h1>React-Diary</h1>
          <div className="logo">
            <span className="icon">date_range</span>
            <span>react calendar</span>
          </div>
        </header>
        <Calendar />
        <Posting />
      </div>
    );
  }
}

export default App;
