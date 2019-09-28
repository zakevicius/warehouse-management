import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchData, setActiveTab, clearFilter } from "../../action";
import Table from "../elements/Table";
import Spinner from '../elements/Spinner';
import Filter from '../elements/Filter';
import HeaderSecondary from "../elements/HeaderSecondary";

class OrderList extends Component {
  state = {
    activeTab: "all"
  };

  componentDidMount() {
    this.props.clearFilter();
    if (!this.props.ordersToShow) {
      this.props.setActiveTab("orders");
      this.props.fetchData("/orders");
    }
  }

  renderTable = (orders, status) => {
    if (orders.length === 0) {
      return (
        <div>
          <Table
            type="orders"
          />
        </div>
      );
    }
    if (status === "all") {
      return (
        <div>
          <Table
            type="orders"
            orders={{ orders }}
            page={
              this.props.match
                ? this.props.match.params.no
                : this.props.page || null
            }
            url={this.props.url ? this.props.url : "/orders/"}
          />
        </div>
      );
    } else {
      return (
        <Table
          type="orders"
          orders={{ orders: orders.filter(order => order.status === status) }}
          page={
            this.props.match
              ? this.props.match.params.no
              : this.props.page || null
          }
          url={this.props.url ? this.props.url : "/orders/"}
        />
      );
    };
  };

  render() {
    if (this.props.load) return <Spinner />;
    let ordersData;
    if (!this.props.ordersToShow) {
      ordersData = this.props.ordersData;
      return (
        <Fragment>
          <HeaderSecondary />
          <Filter />
          {this.renderTable(ordersData.filtered ? ordersData.filtered : ordersData.orders, this.props.activeSubTab)}
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Filter />
          <Table
            type="orders"
            orders={this.props.ordersToShow}
            page={
              this.props.match
                ? this.props.match.params.no
                : this.props.page || null
            }
            url={this.props.url ? this.props.url : "/orders/"}
          />
        </Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    ordersData: state.ordersData,
    user: state.user,
    load: state.eventsData.load,
    activeSubTab: state.eventsData.activeSubTab
  };
};

export default connect(
  mapStateToProps,
  { fetchData, setActiveTab, clearFilter }
)(OrderList);
