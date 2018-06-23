import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    return (
      <div>
        Dashboard
        <div className="fixed-action-btn">
          <Link className="btn-floating btn-large red" to="surveys/new">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
