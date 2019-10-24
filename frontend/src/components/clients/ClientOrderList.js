import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';
import HeaderSecondary from '../elements/HeaderSecondary';

class ClientOrderList extends Component {

  render() {
    if (this.props.load) return <Spinner />
    let orders = this.props.ordersToShow;
    let data = {
      type: 'clientOrders',
      ur: this.props.url
    }

    return (
      <Fragment>
        <HeaderSecondary data={data} />
        <Table
          type="orders"
          orders={orders}
          page={this.props.match ? this.props.match.params.no : this.props.page || null}
          url={this.props.url ? this.props.url : '/clients/'}
        />
      </Fragment>
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