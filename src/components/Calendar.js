import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { db } from "../Firebase/Firebase";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameDay,
  isSameMonth,
} from "date-fns";
import "./index.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    diaryData: [],
    modalIsVisible: false,
    emoji: "",
    kimochi: ""
  };

  componentDidMount() {
    db.collection("diary").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.state.diaryData.push(change.doc.data());
          const dayElement = document.getElementsByClassName(
            format(change.doc.data().date.toDate(), "yyyy-MM-dd")
          )[0]
          if (dayElement) {
            dayElement.classList.add("has-posts");
          }
        }
        if (change.type === "modified") {
          console.log("modified");
        }
        if (change.type === "removed") {
          console.log("removed");
        }
      });
    });
  }

  renderHeader() {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    // 曜日
    const dateFormat = "EEEE";
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat).charAt(0)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate, diaryData } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        this.state.diaryData.forEach((ss) => {});
        days.push(
          <div
            className={`col cell ${format(day, "yyyy-MM-dd")} ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    this.componentDidMount()
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    const choseDay = format(day, "yyyyMMdd");
    var numberOfPosts = 0;
    this.state.diaryData.forEach((data, index) => {
      if (choseDay == format(data.date.toDate(), "yyyyMMdd")) {
       
      }
    });
    if (numberOfPosts == 0) {
      this.showModal();
      console.log(numberOfPosts);
    }
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1),
    });
  };

  showModal = () => {
    this.setState({ modalIsVisible: true });
  };

  closeModal = () => {
    this.setState({ modalIsVisible: false });
  };

  addFeeling = (e) => {
    e.preventDefault();
      db.collection("diary")
        .add({
          date: db.firestore.FieldValue.serverTimestamp(),
          kimochi: this.state.kimochi,
          emoji: this.state.emoji,
        })
        .then(() => {
          this.setState({emoji: ''})
          this.setState({kimochi: ''})
          console.log("yay");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  render() {
    return (
      <div>
        <div className="calendar">
          {this.renderHeader()}
          {this.renderDays()}
          {this.renderCells()}
        </div>
        <div className="modal-area">
          {this.state.modalIsVisible && (
            <Modal
              isVisible={this.state.modalIsVisible}
              
              postFeeling={this.closeModal}
              addFeeling={this.addFeeling}
            />
          )}
        </div>
        <button className="add-btn" onClick={this.showModal}>
          Add today's feeling!
        </button>
      </div>
    );
  }
}

export default Calendar;
