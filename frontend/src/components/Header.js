import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveTab, logout } from "../action";

const Header = props => {
  const authLinks = (
    <Fragment>
      <Link
        onClick={() => props.setActiveTab("primary", "home")}
        to="/"
        className={props.active === "home" ? "active item" : "item"}
      >
        Home
      </Link>
      <Link
        onClick={() => props.setActiveTab("primary", "orders")}
        to="/orders/page/1"
        className={props.active === "orders" ? "active item" : "item"}
      >
        Orders
      </Link>
      <Link
        onClick={() => props.setActiveTab("primary", "clients")}
        to="/clients/page/1"
        className={props.active === "clients" ? "active item" : "item"}
      >
        Clients
      </Link>
      <Link
        onClick={() => props.setActiveTab("primary", "loadings")}
        to="/loadings/page/1"
        className={props.active === "loadings" ? "active item" : "item"}
      >
        Loadings
      </Link>
      <div className="right item">
        <button className="ui inverted button" onClick={props.logout}>
          Log out
        </button>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <div className="right item">
        <Link to="/login" className="ui inverted button">
          Log in
        </Link>
      </div>
    </Fragment>
  );

  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          {props.isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.eventsData.activeTab,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { setActiveTab, logout }
)(Header);
