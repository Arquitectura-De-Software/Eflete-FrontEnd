import React, {Component} from 'react';
import {ciudades, estados} from "../constants/constants";
import {ToastContainer, ToastStore} from 'react-toasts';

class ModificarEnvios extends Component {
    constructor() {
        super();

        this.state = {
            idEnvio: 0,
            CodigoEstadoEnvio: "",
            ubicacion: ""
        }

    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value == '' || re.test(event.target.value)) {
            this.setState({idEnvio: event.target.value});
        }
    }

    onButtonClick = (event) => {
        event.preventDefault();
        console.log("state actual", this.state)
        let options = {
            "Access-Control-Allow-Credentials": true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CodigoEstadoEnvio: this.state.CodigoEstadoEnvio,
                ubicacion: this.state.ubicacion
            })
        };
        fetch(`http://localhost:9090//estadoenvios/${this.state.idEnvio}`, options)
            .then(result => {
                if (result.ok) {
                    ToastStore.success(`Envio con ID ${data.id} modificado exitosamente!`);
                    return result.json()
                } else {
                    ToastStore.error("El envio con id " + this.state.idEnvio + " no existe!");
                }
            })
            .then(data => {
                this.setState({envioGenerado: data})
            })
            .catch(error => {
                ToastStore.error("Error de coneccion");
                console.log(error)
            })

    }

    setStateProp = (propertyName) => (event) => {
        var newState = {};
        const value = event.target.value;
        newState[propertyName] = value;
        this.setState(newState);
    }

    render() {
        return (

            <div>
                <h4>Modificar Envíos</h4>
                <form>
                    <label>Seleccione Envio a modificar por ID:
                        <input
                            type="text"
                            value={this.state.idEnvio}
                            onChange={this.handleChange.bind(this)}
                            onFocus = {() => this.setState({idEnvio: ""})}
                        />
                    </label> <br/>
                    <br/>

                    <label>Seleccione Ubicación</label> <br/>
                    <select
                        onChange={this.setStateProp.bind(this)('ubicacion')}
                    >
                        {ciudades.map((cuidad, index) => {
                            return <option key={index} value={cuidad}>{cuidad}</option>
                        })}
                    </select> <br/><br/>

                    <label>Seleccione Estado</label> <br/>
                    <select
                        onChange={this.setStateProp.bind(this)('CodigoEstadoEnvio')}
                    >
                        {estados.map((ref, index) => {
                            return <option key={index} value={ref}>{ref}</option>
                        })}
                    </select> <br/>

                    <br/>
                    <button
                        onClick={this.onButtonClick.bind(this)}
                        className={"btn btn-success"}
                    >Modificar Estado
                    </button>
                </form>
            </div>

        )
    }
}

export default ModificarEnvios;