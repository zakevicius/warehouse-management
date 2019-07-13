import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import TableHeader from '../TableHeader';

class ClientList extends React.Component {
    componentDidMount() {
        this.props.fetchData('/clients');
        this.props.setActiveTab('clients');
    }

    renderList() {
        return this.props.clients.map(client => {
            return (
                <tr key={client.id}>
                    <td className="center aligned">{client.firstName}</td>
                    <td className="center aligned">{client.lastName}</td>
                    <td>{client.phone}</td>
                    <td>{client.email}</td>
                </tr>
            );
        });
    }

    renderTable() {
        if (this.props.clients === undefined) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            )
        }
        return (
            <table className="ui celled striped selectable table">
                <TableHeader type="clients" />
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
        clients: state.clientsData.clients
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(ClientList);