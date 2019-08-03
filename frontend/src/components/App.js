import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history';

import Home from './Home';
import OrderList from './orders/OrderList';
import OrderShow from './orders/OrderShow';
import OrderCreate from './orders/OrderCreate';
import OrderEdit from './orders/OrderEdit';
import OrderDelete from './orders/OrderDelete';
import ClientList from './clients/ClientList';
import ClientShow from './clients/ClientShow';
import ClientCreate from './clients/ClientCreate';
import ClientEdit from './clients/ClientEdit';
// import ClientEdit from './clients/ClientEdit';
// import ClientDelete from './clients/ClientDelete';
import LoadingList from './loadings/LoadingList';
import LoadingShow from './loadings/LoadingShow';
import LoadingCreate from './loadings/LoadingCreate';
import Header from './Header';
import Footer from './Footer';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from '../routing/PrivateRoute';

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header handleClick={this.handleClick} />
                        <Switch>
                            <PrivateRoute path="/" exact component={Home} />

                            {/* Orders */}
                            <PrivateRoute path="/orders/new" exact component={OrderCreate} />
                            <PrivateRoute path="/orders/:id" exact component={OrderShow} />
                            <PrivateRoute path="/orders/page/:no" exact component={OrderList} />
                            <PrivateRoute path="/orders/edit/:id" exact component={OrderEdit} />
                            <PrivateRoute path="/orders/delete/:id" exact component={OrderDelete} />

                            {/* Clients */}
                            <PrivateRoute path="/clients/new" exact component={ClientCreate} />
                            <PrivateRoute path="/clients/:id/page/:no" exact component={ClientShow} />
                            <PrivateRoute path="/clients/page/:no" exact component={ClientList} />
                            <PrivateRoute path="/clients/edit/:id" exact component={ClientEdit} />

                            {/* Loadings */}
                            <PrivateRoute path="/loadings/new" exact component={LoadingCreate} />
                            <PrivateRoute path="/loadings/:id" exact component={LoadingShow} />
                            <PrivateRoute path="/loadings/page/:no" exact component={LoadingList} />


                            {/* Auth */}
                            <Route path="/login" exact component={Login} />
                            {/* <PrivateRoute path="/register" exact component={Register} /> */}
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;