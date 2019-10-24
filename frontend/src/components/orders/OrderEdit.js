import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData, fetchNewID, fetchData } from '../../action';
import Button from '../elements/Button';
import Error from '../elements/Error';

class OrderEdit extends Component {
    state = {
        orderID: '',
        date: '',
        sender: '',
        receiver: '',
        truck: '',
        trailer: '',
        qnt: '',
        bruto: '',
        description: '',
        declarations: [],
        client: 'Select a client',
        clientID: '',
        status: 'Select status',
    }

    componentDidMount = async () => {
        await this.props.fetchData('/clients');
        if (!this.props.order) {
            this.props.fetchSingleData('/orders', this.props.match.params.id);
        }
        const { orderID, additionalID, date, sender, receiver, truck, trailer, qnt, bruto, description, declarations, status } = this.props.order;
        const client = this.props.clients.filter(client => client._id === this.props.order.clientID)[0].name;
        this.setState({
            orderID,
            additionalID,
            date: date.split('T')[0],
            sender,
            receiver,
            truck,
            trailer,
            qnt,
            bruto,
            description,
            declarations,
            client,
            status,
        });
    }

    renderClientList = () => {
        if (this.props.clients.length === 0) return null;
        return this.props.clients.map(client => (
            <option key={client._id} value={client.name}>
                {client.name}
            </option>));
    }

    onChange = async e => {
        if (e.target.name === 'declarations') {
            this.setState({
                ...this.state,
                declarations: e.target.value.split(/[\s,;.]+/)
            })
        } else if (e.target.name === 'client') {
            const client = this.props.clients.filter(client => client.name === e.target.value)[0];
            this.setState({
                ...this.state,
                clientID: client._id,
                [e.target.name]: e.target.value
            });
        } else if (e.target.name === 'bruto') {
            let newBruto = e.target.value.replace(',', '.');
            this.setState({
                ...this.state,
                [e.target.name]: newBruto
            });
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            });
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.updateData('/orders', this.state, this.props.match.params.id);
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui very padded segment">
                    <form onSubmit={this.onSubmit} className="ui form">

                        <div className="three fields">
                            <div className="field">
                                <label htmlFor="client">Client</label>
                                <select
                                    className="ui fluid dropdown"
                                    name="client"
                                    value={this.state.client}
                                    onChange={this.onChange}
                                    required
                                >
                                    {this.renderClientList()}
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="orderID">ID</label>
                                <input type="text" name="orderID" value={this.state.orderID} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="additionalID">Additional ID</label>
                                <input type="text" name="additionalID" value={this.state.additionalID} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="four fields">
                            <div className="field">
                                <label htmlFor="status">Status</label>
                                <select
                                    className="ui fluid dropdown"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value=''>Select status...</option>
                                    <option value='waiting'>Waiting</option>
                                    <option value='in'>In</option>
                                </select>
                            </div>
                            <div className="field">
                                <label htmlFor="date">Date</label>
                                <input type="date" name="date" value={this.state.date.split('T')[0]} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="truck">Truck</label>
                                <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="trailer">Trailer</label>
                                <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="four fields">
                            <div className="six wide field">
                                <label htmlFor="sender">Sender</label>
                                <input type="text" name="sender" value={this.state.sender} onChange={this.onChange} />
                            </div>
                            <div className="six wide field">
                                <label htmlFor="receiver">Receiver</label>
                                <input type="text" name="receiver" value={this.state.receiver} onChange={this.onChange} />
                            </div>
                            <div className=" two wide field">
                                <label htmlFor="qnt">CLL</label>
                                <input type="text" name="qnt" value={this.state.qnt} onChange={this.onChange} />
                            </div>
                            <div className="two wide field">
                                <label htmlFor="bruto">Bruto</label>
                                <input type="text" name="bruto" value={this.state.bruto} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="declarations">Declarations</label>
                            <input type="text" name="declarations" value={this.state.declarations} onChange={this.onChange} />
                        </div>
                        <Button button={{ type: 'primary ', text: 'Submit' }} />
                    </form>
                    {this.props.error && <Error error={this.props.error} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.ordersData.newOrderID,
        clients: state.clientsData.clients,
        order: state.ordersData.order,
        error: state.ordersData.error
    }
}

export default connect(mapStateToProps,
    {
        updateData,
        fetchNewID,
        fetchData,
    })(OrderEdit);