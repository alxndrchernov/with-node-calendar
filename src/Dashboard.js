import React from "react";
import Calendar from "./calendar/Calendar";
import {getEvents} from "./api/api";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventsData: []
        }
    }
  handleClick = () => {
    const { handleLoginClick } = this.props;
    handleLoginClick(false);
  }

  async componentDidMount() {
      await getEvents().then(async res=>{
          const response = await res.json()
          this.setState({eventsData:response.events})
      })
  }

    render() {
    return (
      <div className="dashboard">
        <button onClick={this.handleClick}> Выйти </button>
        <h2> Календарь </h2>
        <Calendar eventsData={this.state.eventsData} />
      </div>
    );
  }
}

export default Dashboard;
