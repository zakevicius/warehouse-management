import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, fetchData } from '../../action'
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';

class OrderShow extends Component {
  componentDidMount() {
    this.props.fetchSingleData('/orders', this.props.match.params.id);
    this.props.fetchData('/files', this.props.match.params.id);
  }

  render() {
    return this.props.load ? <Spinner /> : <Table type="order" order={this.props.order} />;
  }
}

const mapStateToProps = state => {
  return {
    order: state.ordersData.order,
    load: state.eventsData.load,
  }
}

export default connect(mapStateToProps, { fetchSingleData, fetchData })(OrderShow);