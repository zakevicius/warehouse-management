import React from 'react';

const Modal = ({ action }) => {

  const showModal = () => {
    return (
      <div className='ui dimmer modals page active'>
        <div className="ui small basic test modal transition visible active" >
          <div className="ui icon red header">
            <i className="power off icon red"></i>
            WARNING
          </div>
          <div className="content">
            <p>Do you really want to delete?</p>
          </div>
          <div className="actions">
            <div className="ui green basic cancel inverted button">
              <i className="remove icon"></i>
              No
            </div>
            <div className="ui red ok inverted button">
              <i className="checkmark icon"></i>
              Yes
            </div>
          </div>
        </div>
      </div>
    )
  };

  const hideModal = () => {
    return (
      <span></span>
    )
  }

  if (action === 'hide') {
    console.log('hide');
    return hideModal();
  } else if (action === 'show') {
    console.log('show')
    return showModal();
  } else {
    return hideModal();
  }
};

export default Modal;

