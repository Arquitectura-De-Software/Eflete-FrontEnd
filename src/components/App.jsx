import React, {Component} from 'react';
import {ciudades, refrigeracion} from "../constants/constants";
import Pokemon from "./Pokemon";
import ID from "../utils/auxs";

class App extends Component {
    constructor() {
        super();

        this.state = {
            origen: ciudades[0],
            destino: ciudades[0],
            refrigeracion: refrigeracion[0].value,
            estadoActual: {},
            envioGenerado: {}
        }

    }

    // onSelectTypeChange(event) {
    //     //console.log(event.target.value)
    //     this.setState({: event.target.value})
    // };

  onButtonClick = (event) => {
        event.preventDefault();
        console.log("STATEEE", this.state)
        let options = {
            "Access-Control-Allow-Credentials": true,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                origen: this.state.origen,
                destino: this.state.destino,
                refrigeracion: this.state.refrigeracion
            })
        };
        fetch(`http://localhost:8083/envios/`, options)
            .then(result => {
                if (result.ok) {
                    return result.json()
                }
            })
            .then(data => {
                this.setState({envioGenerado: data})
            })
            .catch(error => console.log(error))

    }

    setStateProp = (propertyName) => (event) => {
        var newState = {};
        const value = event.target.value;
        newState[propertyName] = value;
        console.log("object set", newState);
        this.setState(newState);
    }

    render() {
        return (
            <div
                className={"container app-container"}
            >
                <div>
                    <h4>EFlete</h4>
                    <form>
                        <label>Seleccione ciudad Origen </label>
                        <select
                            onChange={this.setStateProp.bind(this)('origen')}
                        >
                            {ciudades.map((cuidad, index) => {
                                return <option key={index} value={cuidad}>{cuidad}</option>
                            })}
                        </select>

                        <label>Seleccione ciudad Destino </label>
                        <select
                            onChange={this.setStateProp.bind(this)('destino')}
                        >
                            {ciudades.map((cuidad, index) => {
                                return <option key={index} value={cuidad}>{cuidad}</option>
                            })}
                        </select>

                        <label>Seleccione tipo de refrigeracion </label>
                        <select
                            onChange={this.setStateProp.bind(this)('refrigeracion')}
                        >
                            {refrigeracion.map((ref, index) => {
                                return <option key={index} value={ref.value}>{ref.display}</option>
                            })}
                        </select>
                        {/*HTML buttons has a bug, forces to reload the whole page, changing to div instead*/}
                        <button
                            onClick={this.onButtonClick.bind(this)}
                            className={"btn btn-success"}
                        >search for type
                        </button>


                    </form>

                </div>

                <Pokemon data={this.props.envioGenerado}/>

            </div>
        )
    }
}

export default App;