import React from 'react';
import Table from '../elements/Table';


const LoadingOrderList = ({ orders, loading }) => {
  return (
    <Table
      type="loadingOrderList"
      loadingOrderList={orders}
      loading={loading}
    // page={this.props.match ? this.props.match.params.no : null}
    // url={this.props.url ? this.props.url : '/loadings/'}
    />
  );
};

export default LoadingOrderList;

