import React, {Component} from 'react';
import {ToastStore} from "react-toasts";

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
        fetch(`http://localhost:9090/envios/${this.state.idEnvio}`)
            .then(result => {
                if (result.ok) {
                    {ToastStore.success("Envio Encontrado Exitosamente!")}
                    return result.json()
                }else{
                    ToastStore.error("Error interno");
                }
            })
            .then(data => {
                console.log("data envio", data);
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
                <h4>Envios</h4>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <label>Seleccione Envio por ID:
                        <input type="text" pattern="[0-9]*" value={this.state.idEnvio} onChange={this.handleChange.bind(this)} />
                    </label> <br/>
                    <input type="submit" value="Submit" />
                </form>

                {console.log("ENVIO SELECCIONADO", this.state.envioSeleccionado)}
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
                            {this.state.envioSeleccionado.estadoEnvios.map(estado =>
                                <div className={"col-6"}>
                                    <p><li>Estado: {estado.codigoEstadoEnvio}</li></p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ubicación: {estado.ubicacion}</p>
                                </div>
                            )
                            }
                        </div>
                        {/*<div className={"col-6"}>*/}
                        {/*<img src={this.state.imageURL}/>*/}
                        {/*</div>*/}
                    </div>
                </li>
                }

            </div>

        );
    }
}

export default Envios;