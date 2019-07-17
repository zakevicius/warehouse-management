import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

class TableData extends Component {
  componentDidUpdate() {
    this.render();
  }

  renderButton() {
    return <Button button={{ type: "secondary", text: 'More' }} />
  }

  // RENDERING ORDERS

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
            <Link to={`/orders/${order.id}`}>
              {this.renderButton()}
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

  // RENDERING CLIENTS

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
            <Link to={`/clients/${client.id}`}>
              {this.renderButton()}
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

  // RENDERING LOADINGS

  renderLoadings() {
    const { loadings } = this.props.loadings;
    return loadings.map(loading => {
      return (
        <tr key={loading.id}>
          <td className="center aligned">
            <Link to={`/loadings/${loading.id}`}>
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{loading.id}</td>
          <td className="center aligned">{loading.date}</td>
          <td className="center aligned">{loading.truck}</td>
          <td className="center aligned">{loading.trailer}</td>
          <td className="center aligned">{loading.totalQnt}</td>
          <td className="center aligned">{loading.totalBruto}</td>
          <td className="center aligned">{loading.client}</td>
        </tr>
      );
    });
  }

  // WHICH DATA TO SHOW IN TABLE

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
      return this.renderClients();
    } else if (this.props.order) {
      return this.renderOrder();
    } else if (this.props.orders) {
      return this.renderOrders();
    } else if (this.props.loadings) {
      return this.renderLoadings();
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
