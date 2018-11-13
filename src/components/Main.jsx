import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom'
import CrearEnvios from "./CrearEnvios";
import Envios from "./Envios";
import ModificarEnvios from "./ModificarEnvios";
import HomePage from "./HomePage";
import Login from "./Login";

class Main extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <main>
                <Switch>
                    {/*<Route exact path='/' component={Home}/>*/}
                    {/* both /roster and /roster/:number begin with /roster */}
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/homepage' component={HomePage} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/crearenvio' component={CrearEnvios}/>
                    <Route exact path='/envios' component={Envios}/>
                    <Route exact path='/modificarenvio' component={ModificarEnvios}/>
                    {/*<Route exact ='/schedule' component={Schedule}/>*/}
                </Switch>
            </main>
        );
    }
}

export default Main;