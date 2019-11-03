import React from "react";
import { connect } from "react-redux";
import { setActiveTab, fetchDataByStatus, fetchData, fetchSingleData } from "../../action";
import { Link } from 'react-router-dom';

const HeaderSecondary = props => {
  const types = ['all', 'waiting', 'in', 'waiting to load', 'loading', 'out'];

  const onClick = (type, list) => {
    props.setActiveTab("secondary", type)
    if (type === 'all') {
      switch (list) {
        case 'clientOrderList':
          props.fetchSingleData('/clients', props.clientId);
          break;
        default:
          props.fetchData('/orders');
      }
    } else {
      switch (list) {
        case 'clientOrderList':
          props.fetchDataByStatus(type, '/clients', props.clientId);
          break;
        default:
          props.fetchDataByStatus(type);
      }
    }
  }

  const renderLinks = () => {
    return types.map(type =>
      (
        <Link
          key={type}
          button={{ type: 'item', text: type }}
          to={props.link}
          onClick={() => onClick(type, props.list)}
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
  {
    setActiveTab,
    fetchDataByStatus,
    fetchData,
    fetchSingleData
  }
)(HeaderSecondary);
