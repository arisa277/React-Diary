import React from "react";
import Calendarpage from "./Calendar";
import Posting from './Posting'
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Title</h1>
        <Calendarpage />
        <Posting />
      </div>
    );
  }
}

export default App;
