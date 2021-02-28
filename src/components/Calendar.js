import React from "react";

class Calendarpage extends React.Component {
  state = { date: new Date().toLocaleDateString() };

  render() {
    return (
      <div className="">
        <p>this is a calendar area</p>
        <p>{this.state.date}</p>
      </div>
    );
  }
}

export default Calendarpage;
