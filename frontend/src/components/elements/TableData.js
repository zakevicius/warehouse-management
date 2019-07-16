import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableData extends Component {
  componentDidUpdate() {
    this.render();
    console.log(this.props)
  }

  renderOrder() {
    console.log(this.props);
    const order = this.props.order;
    const firstColumn = ['ID', 'date', 'Sender', 'Receiver', 'Truck', 'Trailer', 'CLL', 'Bruto', ' Description', 'Declarations'];
    const secondColumn = [order.id, order.date, order.sender, order.receiver, order.truck, order.trailer, order.qnt, order.bruto, order.description, order.declarations];
    let i = 0;
    return (
      firstColumn.map(text => {
        i++;
        return (
          <tr key={i}>
            <td className="right aligned" style={{ fontWeight: "bold" }}>{text}</td>
            <td>{secondColumn[i - 1]}</td>
            {i === 1 && <td rowSpan={secondColumn.length}></td>}
          </tr >
        );
      })
    );
  }

  renderOrders() {
    const { orders } = this.props.orders;
    return orders.map(order => {
      return (
        <tr key={order.id}>
          <td className="center aligned">
            <Link to={`/orders/${order.id}`} className="ui button secondary">
              More
            </Link>
          </td>
          <td className="center aligned">{order.id}</td>
          <td className="center aligned">{order.date}</td>
          <td>{order.sender}</td>
          <td>{order.receiver}</td>
          <td className="center aligned">{order.truck}</td>
          <td className="center aligned">{order.trailer}</td>
          <td className="center aligned">{order.qnt}</td>
          <td className="center aligned">{order.bruto}</td>
          <td>{order.description}</td>
          <td className="center aligned">{order.declarations}</td>
        </tr>
      );
    });
  }

  renderClient() {
    const { data } = this.props.client;
    const firstColumn = ['First Name', 'Last Name', 'Phone', 'E-mail'];
    const secondColumn = [data.firstName, data.lastName, data.phone, data.email];
    let i = 0;
    return (
      firstColumn.map(text => {
        i++;
        return (
          <tr key={i}>
            <td>{text}</td>
            <td className="left aligned">{secondColumn[i - 1]}</td>
          </tr>
        );
      })
    );
  }

  renderClients() {
    const { clients } = this.props.clients;
    return clients.map(client => {
      return (
        <tr key={client.id}>
          <td className="center aligned">
            <Link to={`/clients/${client.id}`} className="ui button secondary">
              More
            </Link>
          </td>
          <td className="center aligned">{client.firstName}</td>
          <td className="center aligned">{client.lastName}</td>
          <td>{client.phone}</td>
          <td>{client.email}</td>
        </tr>
      );
    });
  }

  renderTableData() {
    if (!this.props) {
      return (
        <tr rowSpan="5">
          <td colSpan="10">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          </td>
        </tr>
      );
    } else if (this.props.client) {
      return this.renderClient();
    } else if (this.props.clients) {
      console.log(this.props.clients)
      return this.renderClients();
    } else if (this.props.order) {
      return this.renderOrder();
    } else if (this.props.orders) {
      return this.renderOrders();
    }
  }
  render() {
    return (
      <tbody>
        {this.renderTableData()}
      </tbody>
    );
  };
}

export default TableData;
