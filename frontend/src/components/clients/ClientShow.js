import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import TableHeader from '../elements/TableHeader';
import OrderList from '../orders/OrderList';

class ClientShow extends React.Component {
    componentDidMount() {
        this.props.fetchSingleData('/clients', this.props.match.params.id);
    }

    componentDidUpdate() {
        console.log(this.props);
        this.render();
    }

    renderClient(client) {
        const firstColumn = ['First Name', 'Last Name', 'Phone', 'E-mail'];
        const secondColumn = [client.firstName, client.lastName, client.phone, client.email];
        let i = 0;
        return (
            firstColumn.map(text => {
                i++;
                return (
                    <tr key={i}>
                        <td>{text}</td>
                        <td className="center aligned">{secondColumn[i - 1]}</td>
                    </tr>
                );
            })
        );
    }

    renderButtons() {
        return (
            <Fragment>
                <button className="ui button negative right floated">
                    Delete
                </button>
            </Fragment>
        )
    }

    renderTable() {
        if (!this.props.client && !this.props.orders) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        return (
            <Fragment>
                <table className="ui celled striped table segment">
                    <TableHeader type="client" renderButtons={this.renderButtons} />
                    <tbody>{this.renderClient(this.props.client.data)}</tbody>
                </table>
                <OrderList ordersByClient={this.props.client.orders} />
            </Fragment>
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
        client: state.clientsData.client,
    };
};

export default connect(mapStateToProps, { fetchSingleData })(ClientShow);