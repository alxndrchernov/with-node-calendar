import React from "react";
import Calendar from "./calendar/Calendar";

class Dashboard extends React.Component {
  handleClick = () => {
    const { handleLoginClick } = this.props;
    handleLoginClick(false);
  }

  render() {
    return (
      <div className="dashboard">
        <button onClick={this.handleClick}> Выйти </button>
        <h2> Календарь </h2>
        <Calendar />
      </div>
    );
  }
}

export default Dashboard;