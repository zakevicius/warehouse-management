import React from 'react';
import Table from '../elements/Table';


const LoadingOrderList = ({ orders }) => {
  return (
    <Table
      type="loadingOrderList"
      loadingOrderList={orders}
    // page={this.props.match ? this.props.match.params.no : null}
    // url={this.props.url ? this.props.url : '/loadings/'}
    />
  );
};

export default LoadingOrderList;

