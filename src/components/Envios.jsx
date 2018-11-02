import React, {Component} from 'react';
import {ToastContainer, ToastStore} from "react-toasts";
import {urlBackend} from "../constants/constants";

class Envios extends Component {
    constructor() {
        super();
        this.state = {
            idEnvio: 0,
            envioSeleccionado: undefined
        }

    }

    handleChange = event => {
        const re = /^[0-9\b]+$/;
        if (event.target.value == '' || re.test(event.target.value)) {
            this.setState({idEnvio: event.target.value});
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        fetch(`${urlBackend}/envios/${this.state.idEnvio}`)
            .then(result => {
                if (result.ok) {
                    {ToastStore.success("Envio Encontrado Exitosamente!")}
                    return result.json()
                }else{
                    ToastStore.error("EL envio con id " + this.state.idEnvio + " no existe!");
                }
            })
            .then(data => {
                this.setState({envioSeleccionado: data})
            })
            .catch(error => {
                ToastStore.error("Error de coneccion");
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-header">
                        <h5>Consultar Envios</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col col-lg-4">
                                    <label>Seleccione Envio por ID: </label>
                                </div>
                                <div class="col col-lg-4">
                                    <input
                                        type="text"
                                        value={this.state.idEnvio}
                                        onChange={this.handleChange.bind(this)}
                                        onFocus = {() => this.setState({idEnvio: ""})}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div class="row">
                                <div class="col col-lg-4">
                                    <button onClick={this.handleSubmit.bind(this)} className={"btn btn-success"} >Consultar Envío </button>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
                <br/>
                {this.state.envioSeleccionado !== undefined &&

                <li className={"card"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <p>Identificador: {this.state.envioSeleccionado.id}</p>
                            <p>Origen: {this.state.envioSeleccionado.origen}</p>
                            <p>Destino: {this.state.envioSeleccionado.destino}</p>
                            <p>Refrigeracion: {this.state.envioSeleccionado.refrigeracion}</p>
                            <p>Estado Actual: </p>
                            <div className={"col-6"}>
                                <p>Estado: {this.state.envioSeleccionado.estadoActual.codigoEstadoEnvio}</p>
                                <p>Ubicación: {this.state.envioSeleccionado.estadoActual.ubicacion}</p>
                            </div>
                            <p>Histórico de Estados: </p>
                            {this.state.envioSeleccionado.estadoEnvios.map((estado, index)=>
                                <div className={"col-6"} key={index}>
                                    <p><li>Estado: {estado.codigoEstadoEnvio}</li></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ubicación: {estado.ubicacion}</p>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </li>
                }
                <ToastContainer store={ToastStore}/>
            </div>
        );
    }
}

export default Envios;