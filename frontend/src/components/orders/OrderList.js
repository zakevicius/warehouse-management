import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { fetchData, setActiveTab } from "../../action";
import Table from "../elements/Table";
import HeaderSecondary from "../elements/HeaderSecondary";

class OrderList extends Component {
  state = {
    activeTab: "all"
  };

  componentDidMount() {
    this.props.setActiveTab("orders");
    if (!this.props.ordersToShow) {
      this.props.fetchData("/orders");
    }
  }

  renderTable = (orders, status) => {
    if (orders.length === 0) {
      return null;
    }
    if ((status = "all")) {
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
    }
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

  render() {
    let ordersData;
    if (!this.props.ordersToShow) {
      ordersData = this.props.ordersData;
      return (
        <Fragment>
          <HeaderSecondary />
          {this.renderTable(ordersData.orders, "all")}
          {/* {this.renderTable(ordersData.orders, "waiting")}
          {this.renderTable(ordersData.orders, "loading")}
          {this.renderTable(ordersData.orders, "in")} */}
        </Fragment>
      );
    } else {
      return (
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
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    ordersData: state.ordersData,
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { fetchData, setActiveTab }
)(OrderList);
