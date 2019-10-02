import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createData } from '../../action';
import Button from '../elements/Button';
import Spinner from '../elements/Spinner';
import Error from '../elements/Error';

class ClientCreate extends Component {
    state = {
        orderLetter: '',
        name: '',
        email: '',
        phone: ''
    }

    componentDidMount() {
    }

    onChange = async e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.createData('/clients', this.state);
    }

    render() {
        if (this.props.load) return <Spinner />;
        return (
            <div className="ui container">
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="orderLetter">Letter for orders</label>
                        <input type="text" name="orderLetter" value={this.state.orderLetter} onChange={this.onChange} />
                    </div>
                    <Button button={{ type: 'primary ', text: 'Submit' }} />
                </form>
                {this.props.error && <Error error={this.props.error} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.clientsData.error,
        load: state.eventsData.load
    }
}

export default connect(mapStateToProps,
    {
        createData,
    })(ClientCreate);