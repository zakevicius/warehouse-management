import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import OrderList from './orders/OrderList';
import OrderShow from './orders/OrderShow';
import OrderCreate from './orders/OrderCreate';
import OrderEdit from './orders/OrderEdit';
import OrderDelete from './orders/OrderDelete';
import ClientList from './clients/ClientList';
import ClientShow from './clients/ClientShow';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={createBrowserHistory()}>
                    <div>
                        <Header handleClick={this.handleClick} />
                        <Switch>
                            <Route path="/" exact component={OrderList} />
                            <Route path="/clients" exact component={ClientList} />
                            <Route path="/clients/:id" exact component={ClientShow} />
                            <Route path="/orders/new" exact component={OrderCreate} />
                            <Route path="/orders/edit/:id" exact component={OrderEdit} />
                            <Route path="/orders/delete/:id" exact component={OrderDelete} />
                            <Route path="/orders/:id" exact component={OrderShow} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;