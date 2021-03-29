import React from "react";
import Calendar from "./Calendar";
import Modal from './Modal';
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <h1>React-Diary</h1>
          <Calendar />
      </div>
    );
  }
}

export default App;
