import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import TableHeader from '../elements/TableHeader';

class OrderShow extends React.Component {
    componentDidMount() {
        this.props.fetchSingleData('/orders', this.props.match.params.id);
    }

    renderOrder(order) {
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
                        {i === 1 && <td rowspan={secondColumn.length}></td>}
                    </tr >
                );
            })
        );
    }

    renderButtons() {
        return (
            <Fragment>
                <button className="ui button primary basic">
                    Add to loading
                </button>
                <button className="ui button negative right floated">
                    Delete
                </button>
            </Fragment>
        )
    }

    renderTable() {
        if (!this.props.order) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        return (
            <table className="ui celled striped selectable table">
                <TableHeader type="order" renderButtons={this.renderButtons} />
                <tbody>{this.renderOrder(this.props.order)}</tbody>
            </table>
        );
    }

    render() {
        return <div className="ui container">{this.renderTable()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        order: state.ordersData.order
    }
}

export default connect(mapStateToProps, { fetchSingleData })(OrderShow);