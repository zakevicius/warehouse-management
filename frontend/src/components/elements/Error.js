import React from 'react'

const Error = (props) => {
  console.log(props);
  return (
    <div className="ui segment">
      <div className="ui active loader"></div>
      <p></p>
    </div>
  );
};

export default Error;