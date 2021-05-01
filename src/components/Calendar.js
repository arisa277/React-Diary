import React from "react";
import Modal from "./Modal";
import firebase, { db } from "../Firebase/Firebase";
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
import "./Calendar.css";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    diaryData: [],
    modalIsVisible: false,
    emoji: "",
    kimochi: "",
    clickedDate: "",
    id: "",
    dataExisted: false,
    errorMessage: "",
  };

  componentDidMount() {
    db.collection("diary").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        const data = change.doc.data();
        data.id = change.doc.id;
        if (change.type === "added") {
          this.state.diaryData.push(data);
          const dayElement = document.getElementsByClassName(
            format(data.date.toDate(), "yyyy.MM.dd")
          )[0];
          if (dayElement) {
            dayElement.classList.add("has-posts");
          }
        }
        if (change.type === "modified") {
          let index = this.state.diaryData.findIndex((data) => {
            return data.id == change.doc.id;
          });
          this.state.diaryData.splice(index, 1, data);
        }
        if (change.type === "removed") {
          let index = this.state.diaryData.findIndex((data) => {
            return data.id == change.doc.id;
          });
          this.state.diaryData.splice(index, 1);
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
    const { currentMonth, selectedDate } = this.state;
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

        days.push(
          <div
            className={`col cell ${format(day, "yyyy.MM.dd")} ${
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
    this.componentDidMount();
    return <div className="body">{rows}</div>;
  }

  onDateClick = (day) => {
    const choseDay = format(day, "yyyy.MM.dd");
    var numberOfPosts = 0;
    this.state.diaryData.forEach((data, index) => {
      // when i clicked on the data that already existed
      if (choseDay == format(data.date.toDate(), "yyyy.MM.dd")) {
        numberOfPosts++;
        this.setState({ emoji: data.emoji });
        this.setState({ kimochi: data.kimochi });
        this.setState({ clickedDate: choseDay });
        this.setState({ dataExisted: true });
        this.getId(index);
        this.showModal();
      }
    });
    
    if (numberOfPosts == 0) {
      this.setState({ clickedDate: choseDay });
      this.showModal();
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

  AddTodaysFeeling = () => {
    const today = format(new Date(), "yyyy.MM.dd");
    this.state.diaryData.forEach((data, index) => {
      if (format(data.date.toDate(), "yyyy.MM.dd") === today) {
        this.setState({ emoji: data.emoji });
        this.setState({ kimochi: data.kimochi });
        this.setState({clickedDate: today})
        this.getId(index)
        this.setState({ dataExisted: true });
      }
      this.showModal()
    });
  }

  closeModal = () => {
    this.setState({ emoji: "" });
    this.setState({ kimochi: "" });
    this.setState({ clickedDate: ""});
    this.setState({ dataExisted: false });
    this.setState({ id: "" });
    this.setState({ errorMessage: "" });
    this.setState({ modalIsVisible: false });
  };

  emojiHandler = (e) => {
    this.setState({ emoji: e.target.innerHTML });
  };

  kimochiHandler = (e) => {
    this.setState({ kimochi: e.target.value });
  };

  postFeeling = (e) => {
    e.preventDefault();
    if (!this.state.emoji) {
      this.setState({ errorMessage: "Please click your feeling!" });
      return;
    }
    this.setState({ errorMessage: "" });
    db.collection("diary")
      .add({
        date: this.state.clickedDate,
        kimochi: this.state.kimochi,
        emoji: this.state.emoji,
      })
      .then(() => {
        this.setState({ emoji: "" });
        this.setState({ kimochi: "" });
        this.setState({ dataExisted: false });
        this.closeModal();
      })
      .catch((err) => {
        console.err(err);
      });
  };

  getId(index) {
    this.setState({ id: this.state.diaryData[index].id });
  }

  updateFeeling = (e) => {
    e.preventDefault();
    db.collection("diary")
      .doc(this.state.id)
      .update({
        kimochi: this.state.kimochi,
        emoji: this.state.emoji,
      })
      .then(() => {
        this.setState({ emoji: "" });
        this.setState({ kimochi: "" });
        this.setState({ dataExisted: false });
        this.closeModal();
      })
      .catch((err) => {
        console.err(err);
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
              addFeeling={this.postFeeling}
              updateFeeling={this.updateFeeling}
              kimochiHandler={this.kimochiHandler}
              kimochi={this.state.kimochi}
              emojiHandler={this.emojiHandler}
              emoji={this.state.emoji}
              closeModalHandler={this.closeModal}
              dataExisted={this.state.dataExisted}
              errorMessage={this.state.errorMessage}
              day={this.state.clickedDate}
            />
          )}
        </div>
        <button className="add-btn" onClick={this.AddTodaysFeeling}>
          Add today's your feeling!
        </button>
      </div>
    );
  }
}

export default Calendar;
