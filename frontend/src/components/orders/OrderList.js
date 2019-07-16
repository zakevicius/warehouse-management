import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import { Link } from 'react-router-dom';
import TableHeader from '../elements/TableHeader';

class OrderList extends React.Component {
    componentDidMount() {
        console.log(this.props);
        this.props.ordersByClient === undefined && this.props.fetchData('/orders');
        this.props.ordersByClient === undefined ? this.props.setActiveTab('orders') : this.props.setActiveTab('clients');
    }

    renderList(orders) {
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

    renderTable() {
        let orders, error;

        /* CHECKING WHAT DATA TO SHOW. IF IN CLIENTS PAGE THEN SHOWS ONLY CLIENT'S, ELSE SHOWS EVERYTHING */
        if (this.props.ordersByClient) {
            orders = this.props.ordersByClient;
        } else if (this.props.orders) {
            orders = this.props.orders.orders;
            error = this.props.orders.error;
        }

        if (orders === undefined) {
            if (error) {
                return <div className="ui error">{error}</div>;
            }
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        } else if (orders.length === 0) {
            return <div className="ui message">No orders created</div>;
        }

        return (
            <table className="ui celled striped selectable table">
                <TableHeader type="orders" />
                <tbody>{this.renderList(orders)}</tbody>
            </table>
        );
    }

    render() {
        return (
            <div>
                {this.renderTable()}
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersData,
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(OrderList);