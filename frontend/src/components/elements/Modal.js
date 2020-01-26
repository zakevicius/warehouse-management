import React from "react";
import { connect } from "react-redux";
import { hideModal } from "../../action";

const Modal = props => {
  const onConfirm = () => {
    props.confirm();
    props.hideModal();
  };

  if (!props.showModal) {
    return null;
  } else {
    return (
      <div className="ui dimmer modals page active">
        <div className="ui small basic test modal transition visible active">
          <div className="ui icon red header">
            <i className="power off icon red"></i>
            WARNING
          </div>
          <div className="content">
            <p>Do you really want to delete?</p>
          </div>
          <div className="actions">
            <div className="ui red ok inverted button" onClick={onConfirm}>
              <i className="checkmark icon"></i>
              Yes
            </div>
            <div
              className="ui green basic cancel inverted button"
              onClick={props.hideModal}
            >
              <i className="remove icon"></i>
              No
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    showModal: state.eventsData.showModal
  };
};

export default connect(mapStateToProps, { hideModal })(Modal);
