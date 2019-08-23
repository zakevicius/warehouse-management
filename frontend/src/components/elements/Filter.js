import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { filterOrders, clearFilter } from '../../action';

const Filter = (props) => {

  const text = useRef('');


  const onChange = e => {
    if (text.current.value !== '') {
      props.filterOrders(text.current.value);
    } else {
      props.clearFilter();
    }
  };

  return (
    <div className="ui segment">
      <div className="ui icon red input">
        <input className="ui input" ref={text} type="text" placeholder="Filter orders..." onChange={onChange} />
        <i className="search icon"></i>
      </div>
    </div>
  );
};

export default connect(null, { filterOrders, clearFilter })(Filter);