import React, {Component} from 'react';
import {ciudades, estados, urlBackend} from "../constants/constants";
import {ToastContainer, ToastStore} from 'react-toasts';

class ModificarEnvios extends Component {
    constructor() {
        super();

        this.state = {
            idEnvio: 0,
            codigoEstadoEnvio: estados[0].value,
            ubicacion: ciudades[0],
        }

    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value == '' || re.test(event.target.value)) {
            this.setState({idEnvio: parseInt(event.target.value)});
        }
    }

    onButtonClick = (event) => {
        event.preventDefault();
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                codigoEstadoEnvio: this.state.codigoEstadoEnvio,
                ubicacion: this.state.ubicacion
            })
        };
        fetch(`${urlBackend}/estadoenvios/${this.state.idEnvio}`, options)
            .then(result => {
                if (result.ok) {
                    ToastStore.success(`Envio con ID ${this.state.idEnvio} modificado exitosamente!`);
                    return result.json();
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
                <div class="card">
                    <div class="card-header">
                        <h5>Modificar Envíos</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col col-lg-4">
                                    <label>Seleccione Envio a modificar por ID:
                                    </label>
                                </div>
                                <div class="col col-lg-4">
                                    <input type="text" value={this.state.idEnvio}
                                        onChange={this.handleChange.bind(this)}
                                        onFocus = {() => this.setState({idEnvio: ""})} />
                                </div>
                            </div>
                            <br />
                            <div class="row">
                                <div class="col col-lg-4">
                                    <label>Seleccione Ubicación</label>    
                                </div>
                                <div class="col col-lg-4">
                                    <select onChange={this.setStateProp.bind(this)('ubicacion')}>
                                        {ciudades.map((cuidad, index) => {
                                            return <option key={index} value={cuidad}>{cuidad}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col col-lg-4">
                                    <label>Seleccione Estado</label>    
                                </div>
                                <div class="col col-lg-4">
                                    <select onChange={this.setStateProp.bind(this)('codigoEstadoEnvio')}>
                                        {estados.map((ref, index) => {
                                            return <option key={index} value={ref.value}>{ref.display}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col col-lg-4">
                                    <button onClick={this.onButtonClick.bind(this)} className={"btn btn-success"}>Modificar Estado </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <ToastContainer store={ToastStore}/>
                </div>
            </div>
        )
    }
}

export default ModificarEnvios;