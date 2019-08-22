import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';

class ClientOrderList extends Component {

  render() {
    if (this.props.load) return <Spinner />
    let orders;
    orders = this.props.ordersToShow;
    return (
      <Table
        type="orders"
        orders={orders}
        page={this.props.match ? this.props.match.params.no : this.props.page || null}
        url={this.props.url ? this.props.url : '/clients/'}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.ordersData,
    load: state.eventsData.load
  };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(ClientOrderList);