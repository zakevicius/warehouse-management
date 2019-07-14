import React from 'react';
import { Link } from 'react-router-dom'

const TableHeader = (props) => {
    let link = '/';
    if (props.type === 'client' || props.type === 'client') {
        link = '/clients';
    }

    switch (props.type) {
        case 'orders':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">
                            <Link to={link}>
                                <button className="ui button">
                                    New order
                                </button>
                            </Link>
                        </th>
                        <th className="one wide center aligned">Order</th>
                        <th className="one wide center aligned">Date</th>
                        <th className="two wide center aligned">Sender</th>
                        <th className="two wide center aligned">Receiver</th>
                        <th className="one wide center aligned">Truck</th>
                        <th className="one wide center aligned">Trailer</th>
                        <th className="one wide center aligned">CLL</th>
                        <th className="one wide center aligned">Brutto</th>
                        <th className="three wide center aligned">Description</th>
                        <th className="two wide center aligned">Declarations</th>
                    </tr>
                </thead>
            );
        case 'order':
        case 'client':
            return (
                <thead>
                    <tr>
                        <th className="two wide center aligned">
                            <Link to={link}>
                                <button className="ui button">
                                    Back
                                </button>
                            </Link>
                        </th>
                        <th className="six wide center aligned"></th>
                    </tr>
                </thead>
            );
        case 'clients':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">
                            <Link to={link}>
                                <button className="ui button">
                                    New client
                                </button>
                            </Link>
                        </th>
                        <th className="two wide center aligned">First Name</th>
                        <th className="two wide center aligned">Last Name</th>
                        <th className="two wide center aligned">Phone</th>
                        <th className="two wide center aligned">E-mail</th>
                    </tr>
                </thead>
            );
        default:
            return (
                <thead>
                    <tr>
                        <th>Welcome</th>
                    </tr>
                </thead>
            )
    }

};

export default TableHeader;