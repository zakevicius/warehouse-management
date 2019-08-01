import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';

class ClientList extends React.Component {
    componentDidMount() {
        this.props.setActiveTab('clients');
        this.props.fetchData('/clients');
    }

    render() {
        return (
            <Table
                type="clients"
                clients={this.props.clients}
                page={this.props.match ? this.props.match.params.no : null}
                url={this.props.url ? this.props.url : '/clients/'}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        clients: state.clientsData
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(ClientList);