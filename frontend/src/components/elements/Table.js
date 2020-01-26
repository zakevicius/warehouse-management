import React, { Component, Fragment } from "react";
import TableHeader from "./TableHeader";
import TableData from "./TableData";

class Table extends Component {
  state = {
    type: this.props.type,
    client: this.props.client,
    clients: this.props.clients,
    order: this.props.order,
    orders: this.props.orders,
    loading: this.props.loading,
    loadings: this.props.loadings,
    loadingOrderList: this.props.loadingOrderList,
    page: this.props.page,
    url: this.props.url,
    additional: this.props.additional,
    color: this.props.color ? this.props.color : ""
  };

  render() {
    return (
      <Fragment>
        <table
          className={`ui celled striped table segment very compact ${this.state.color}`}
        >
          <TableHeader type={this.props.type} orders={this.props.orders} />
          <TableData
            type={this.props.type}
            client={this.props.client}
            clients={this.props.clients}
            order={this.props.order}
            orders={this.props.orders}
            loading={this.props.loading}
            loadings={this.props.loadings}
            loadingOrderList={this.props.loadingOrderList}
            page={this.props.page}
            url={this.props.url}
            additional={this.props.additional}
          />
        </table>
      </Fragment>
    );
  }
}

export default Table;
