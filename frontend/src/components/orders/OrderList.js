import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import { Link } from 'react-router-dom';
import TableHeader from '../TableHeader';

class OrderList extends React.Component {
    componentDidMount() {
        this.props.fetchData('/orders');
        this.props.setActiveTab('orders');
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
        const { orders, error } = this.props.orders;
        if (orders.length === 0) {
            if (error) {
                return <div className="ui error">{error}</div>;
            }
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
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