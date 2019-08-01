import React from 'react';
import { Link } from 'react-router-dom';
import { history } from '../history';
import Button from './Button';

const TableHeader = (props) => {
    const goBack = (type) => {
        switch (type) {
            case 'client':
                history.push('/clients/page/1');
                break;
            case 'order':
                history.push('/orders/page/1');
                break;
            default:
                history.push('/');
        }
    }

    switch (props.type) {
        case 'orders':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">
                            <Link to='/orders/new'>
                                <Button button={{ type: 'primary basic', text: 'New order' }} />
                            </Link>
                        </th>
                        <th className="one wide center aligned">Order</th>
                        <th className="one wide center aligned">Date</th>
                        <th className="two wide center aligned">Sender</th>
                        <th className="two wide center aligned">Receiver</th>
                        <th className="one wide center aligned">Truck</th>
                        <th className="one wide center aligned">Trailer</th>
                        <th className="one wide center aligned">CLL</th>
                        <th className="one wide center aligned">Bruto</th>
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
                        <th className="one wide center aligned">
                            <Button
                                button={{ type: "secondary", text: "Back" }}
                                onClick={() => goBack(props.type)}
                            />
                        </th>
                        <th className="six wide">
                            <Button button={{ type: 'primary left floated', text: 'Edit' }} />
                            <Button button={{ type: 'negative right floated', text: 'Delete' }} />
                        </th>
                        {props.type === "order" && <th className="three wide">Files</th>}
                    </tr>
                </thead>
            );
        case 'clients':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">
                            <Link to='/clients/new'>
                                <Button button={{ type: 'primary basic', text: 'New client' }} />
                            </Link>
                        </th>
                        <th className="two wide center aligned">Name</th>
                        <th className="two wide center aligned">Phone</th>
                        <th className="two wide center aligned">E-mail</th>
                    </tr>
                </thead>
            );
        case 'loadings':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">
                            <Link to='/loadings/new'>
                                <Button button={{ type: 'primary basic', text: 'New loading' }} />
                            </Link>
                        </th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Truck</th>
                        <th>Trailer</th>
                        <th>Total CLL</th>
                        <th>Total Bruto</th>
                        <th>Client</th>
                    </tr>
                </thead>
            );
        case 'loading':
            return (
                <thead>
                    <tr>
                        <th className="two wide center aligned">Cargo ID</th>
                        <th className="two wide center aligned">Date</th>
                        <th className="two wide center aligned">Sender</th>
                        <th className="two wide center aligned">Receiver</th>
                        <th className="two wide center aligned">Auto</th>
                        <th className="two wide center aligned">CLL</th>
                        <th className="two wide center aligned">Bruto</th>
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