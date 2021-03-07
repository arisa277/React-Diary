import React from "react";
import Calendar from "./Calendar";
import Posting from './Posting'
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Title</h1>
        <Calendar />
        <Posting />
      </div>
    );
  }
}

export default App;
