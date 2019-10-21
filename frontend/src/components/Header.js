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
      {
        props.user.type === 'admin' || props.user.type === 'super' ?
          <Link
            onClick={() => props.setActiveTab("primary", "clients")}
            to="/clients/page/1"
            className={props.active === "clients" ? "active item" : "item"}
          >
            Clients
      </Link> : ""
      }
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
        {props.user.type === 'admin' || props.user.type === 'super' ?
          <Link
            to="/register"
            className="item"
          >
            <button className="ui inverted button">
              Register new user
              </button>
          </Link> : ""
        }
      </div>
    </Fragment>
  );

  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          {props.isAuthenticated && authLinks}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.eventsData.activeTab,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  { setActiveTab, logout }
)(Header);
