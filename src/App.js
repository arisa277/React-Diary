import React from "react";
import Calendar from "./components/Calendar";
import Modal from './components/Modal';
import "./components/index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <h1>React-Diary</h1>
          <Calendar/>
      </div>
    );
  }
}

export default App;
