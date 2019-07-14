import React from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import TableHeader from '../TableHeader';

class ClientShow extends React.Component {
    componentDidMount() {
        this.props.fetchSingleData('/client', this.props.match.params.id);
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

    renderTable() {
        if (!this.props.client) {
            return (
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
            );
        }
        return (
            <table className="ui celled striped selectable table">
                <TableHeader type="client" />
                <tbody>{this.renderClient(this.props.client)}</tbody>
            </table>
        );
    }

    render() {
        return <div className="ui container">{this.renderTable()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client
    }
}

export default connect(mapStateToProps, { fetchSingleData })(ClientShow);