import React, {Component} from 'react';
import {ciudades, refrigeracion} from "../constants/constants";
import Envios from "./Envios";
import {ToastContainer, ToastStore} from 'react-toasts';
import ID from "../utils/auxs";
import ModificarEnvios from "./ModificarEnvios";
import CrearEnvios from "./CrearEnvios";

class App extends Component {



    render() {
        return (
            <div
                className={"container app-container"}
            >
                <div>
                    <h4>EFlete</h4>
                </div>

                <CrearEnvios/>
                <br/> <br/>
                <ModificarEnvios/>
                <br/> <br/>
                <Envios data={this.props.envioGenerado}/>

            </div>
        )
    }
}

export default App;