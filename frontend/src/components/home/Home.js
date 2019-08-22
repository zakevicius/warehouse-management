import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';

class Home extends Component {
  componentDidMount() {
    this.props.setActiveTab('home');
    if (!this.props.ordersToShow) {
      this.props.fetchData('/orders');
    }
  }

  renderTable = (orders, status) => {
    if (orders.length === 0) {
      return null;
    };
    return (
      <div>
        {`${status[0].toUpperCase()}${status.slice(1)}`}
        <Table
          type="orders"
          orders={{ orders: orders.filter(order => order.status === status) }}
          page={this.props.match ? this.props.match.params.no : this.props.page || null}
          url={this.props.url ? this.props.url : '/orders/'}
        />
      </div>
    );
  };

  render() {
    if (this.props.load) return <Spinner />;
    let ordersData;
    if (!this.props.ordersToShow) {
      ordersData = this.props.ordersData;
      return (
        <Fragment>
          {this.renderTable(ordersData.orders, 'waiting')}
          {this.renderTable(ordersData.orders, 'loading')}
          {this.renderTable(ordersData.orders, 'in')}
        </Fragment>
      );
    } else {
      return (
        <Table
          type="orders"
          orders={this.props.ordersToShow}
          page={this.props.match ? this.props.match.params.no : this.props.page || null}
          url={this.props.url ? this.props.url : '/orders/'}
        />
      );
    }
  }
};

const mapStateToProps = state => {
  return {
    ordersData: state.ordersData,
    user: state.user,
    load: state.eventsData.load
  };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(Home);