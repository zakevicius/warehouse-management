import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab } from '../../action'
import Table from '../elements/Table';
import ClientOrderList from './ClientOrderList';

class ClientShow extends Component {
    componentDidMount() {
        this.props.fetchSingleData('/clients', this.props.match.params.id);
        this.props.setActiveTab('clients');
    }

    // componentDidUpdate() {
    //     this.render();
    // }

    render() {
        if (this.props.load) {
            return <div>Loading</div>
        }
        return (
            <div>
                <Table type="client" client={this.props.client} />
                <ClientOrderList
                    ordersToShow={this.props.client}
                    page={this.props.match ? this.props.match.params.no : null}
                    url={this.props.match.url.split('page')[0]}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client,
        load: state.eventsData.load
    };
};

export default connect(mapStateToProps, { fetchSingleData, setActiveTab })(ClientShow);