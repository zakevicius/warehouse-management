import React from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';

class ClientList extends React.Component {
    componentDidMount() {
        this.props.setActiveTab('clients');
        this.props.fetchData('/clients');
    }

    render() {
        if (this.props.load) return <Spinner />;
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
        clients: state.clientsData,
        load: state.eventsData.load
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(ClientList);