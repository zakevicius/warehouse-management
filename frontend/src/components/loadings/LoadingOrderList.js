import React from 'react';


const LoadingOrderList = ({ orders }) => {
  return (
    <table className="ui celled striped table segment">
      <thead>
        <tr>
          <th className="one wide center aligned">Order</th>
          <th className="one wide center aligned">Date</th>
          <th className="two wide center aligned">Sender</th>
          <th className="two wide center aligned">Receiver</th>
          <th className="one wide center aligned">Truck</th>
          <th className="one wide center aligned">Trailer</th>
          <th className="one wide center aligned">CLL</th>
          <th className="one wide center aligned">Bruto</th>
          <th className="three wide center aligned">Description</th>
          <th className="two wide center aligned">Declarations</th>
        </tr>
      </thead>
    </table>
  );
};

export default LoadingOrderList;

