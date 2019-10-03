import React from 'react'

const Error = (props) => {
  return (
    <div className="ui red segment" style={{ color: "#e25353" }}>
      <i className="times icon"></i>{props.error}
    </div>
  );
};

export default Error;
