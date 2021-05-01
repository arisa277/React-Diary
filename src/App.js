import React from "react";
import Calendar from "./components/Calendar";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
          <h1>Mood Tracker</h1>
          <Calendar />
      </div>
    );
  }
}

export default App;
