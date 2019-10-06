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
        email: [],
        phone: ''
    }

    onChange = async e => {
        let emailFields = ['email1', 'email2', 'email3'];
        let emails = [...this.state.email]
        if (emailFields.indexOf(e.target.name) >= 0) {
            emails[emailFields.indexOf(e.target.name)] = e.target.value;
            this.setState({
                ...this.state,
                email: emails
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
        this.props.createData('/clients', this.state);
    }

    render() {
        if (this.props.load) return <Spinner />;
        return (
            <div className="ui container">
                <div className="ui very padded segment">
                    <form onSubmit={this.onSubmit} className="ui form">
                        <div className="three fields">
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="orderLetter">Letter for orders</label>
                                <input type="text" name="orderLetter" value={this.state.orderLetter} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label htmlFor="email1">Email 1</label>
                                <input type="email" name="email1" value={this.state.email[0]} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email2">Email 2</label>
                                <input type="email" name="email2" value={this.state.email[1]} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email3">Email 3</label>
                                <input type="email" name="email3" value={this.state.email[2]} onChange={this.onChange} />
                            </div>
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
        error: state.clientsData.error,
        load: state.eventsData.load
    }
}

export default connect(mapStateToProps,
    {
        createData,
    })(ClientCreate);