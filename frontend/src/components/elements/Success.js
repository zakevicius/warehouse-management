import React from 'react'

const Success = (props) => {
  return (
    <div className="ui green segment" style={{ color: "#21ba45" }}>
      <i className="check icon"></i>{props.msg}
    </div>
  );
};

export default Success;
