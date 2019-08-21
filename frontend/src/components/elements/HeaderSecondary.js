import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveTab } from "../../action";

const HeaderSecondary = props => {
  return (
    <div className="ui inverted vertical center aligned segment">
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          <Link
            onClick={() => props.setActiveTab("all")}
            to="/"
            className={props.active === "all" ? "active item" : "item"}
          >
            All
          </Link>
          <Link
            onClick={() => props.setActiveTab("in")}
            to="/"
            className={props.active === "in" ? "active item" : "item"}
          >
            Waiting
          </Link>
          <Link
            onClick={() => props.setActiveTab("waiting")}
            to="/"
            className={props.active === "waiting" ? "active item" : "item"}
          >
            In
          </Link>
          <Link
            onClick={() => props.setActiveTab("loading")}
            to="/"
            className={props.active === "loading" ? "active item" : "item"}
          >
            Loading
          </Link>
          <Link
            onClick={() => props.setActiveTab("out")}
            to="/"
            className={props.active === "out" ? "active item" : "item"}
          >
            Out
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.eventsData.activeTab
  };
};

export default connect(
  mapStateToProps,
  { setActiveTab }
)(HeaderSecondary);
