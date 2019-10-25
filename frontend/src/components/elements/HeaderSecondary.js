import React from "react";
import { connect } from "react-redux";
import { setActiveTab } from "../../action";
import { Link } from 'react-router-dom';

const HeaderSecondary = props => {
  const types = ['all', 'waiting', 'in', 'waiting to load', 'loading', 'out'];

  const renderLinks = () => {
    return types.map(type =>
      (
        <Link
          key={type}
          button={{ type: 'item', text: type }}
          to='/orders/page/1'
          onClick={() => props.setActiveTab("secondary", type)}
          className={type === props.active ? "active item" : "item"}
        > {type.slice(0, 1).toUpperCase().concat(type.slice(1))}</Link>
      )
    );
  };

  return (
    <div className="ui vertical center aligned segment" >
      <div className="ui large secondary pointing menu">
        {renderLinks()}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.eventsData.activeSubTab
  };
};

export default connect(
  mapStateToProps,
  { setActiveTab }
)(HeaderSecondary);
