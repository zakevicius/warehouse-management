import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createData, fetchNewID, fetchData } from '../../action';
import Button from '../elements/Button';

class OrderCreate extends Component {
    state = {
        orderID: '',
        date: new Date(),
        sender: '',
        receiver: '',
        truck: '',
        trailer: '',
        qnt: '',
        bruto: '',
        description: '',
        declarations: '',
        client: '',
        clientID: '',
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    // PATIKRINT AR TIKRAI REIKIA PAPILDOMAI IESKOTI KLIENTO ID JEI JIS JAU GAUNAMAS CIA

    onBlur = async (e) => {
        //Fetch client ID by selected client name
        if (e.target.name === 'client') {
            await this.props.fetchData('/clients')
                .then(async (response) => {
                    const client = this.props.clients.filter(client => client.firstName === this.state.client)[0];
                    this.setState({
                        ...this.state,
                        clientID: client._id
                    });
                    // Fetch new ID for new order based on client selected
                    await this.props.fetchNewID(this.state.clientID)
                        .then((response) => {
                            const newID = this.props.id.let + this.props.id.num;
                            this.setState({
                                ...this.state,
                                orderID: newID,
                            });
                        })
                })
                .catch((error) => console.log(error))
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.createData('/orders', this.state);
    }

    render() {
        return (
            <div className="ui container">
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="orderID">ID</label>
                        <input type="text" name="orderID" value={this.state.orderID} disabled />
                    </div>
                    <div className="field">
                        <label htmlFor="client">Client</label>
                        <input type="text" name="client" value={this.state.client} onChange={this.onChange} onBlur={this.onBlur} />
                    </div>
                    <div className="field">
                        <label htmlFor="date">Date</label>
                        <input type="text" name="date" value={this.state.date} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="sender">Sender</label>
                        <input type="text" name="sender" value={this.state.sender} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="receiver">Receiver</label>
                        <input type="text" name="receiver" value={this.state.receiver} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="truck">Truck</label>
                        <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="trailer">Trailer</label>
                        <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="qnt">CLL</label>
                        <input type="text" name="qnt" value={this.state.qnt} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="bruto">Bruto</label>
                        <input type="text" name="bruto" value={this.state.bruto} onChange={this.onChange} />
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.ordersData.newOrderID,
        clients: state.clientsData.clients
    }
}

export default connect(mapStateToProps, { createData, fetchNewID, fetchData })(OrderCreate);