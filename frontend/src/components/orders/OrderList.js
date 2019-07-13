import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import TableHeader from '../TableHeader';

class OrderList extends React.Component {
    componentDidMount() {
        this.props.fetchData('/orders');
        this.props.setActiveTab('orders');
    }

    renderList() {
        return this.props.orders.map(order => {
            return (
                <tr key={order.id}>
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
        if (this.props.orders === undefined) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }
        return (
            <table className="ui celled striped selectable table">
                <TableHeader type="orders" />
                <tbody>{this.renderList()}</tbody>
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
        orders: state.ordersData.orders
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(OrderList);