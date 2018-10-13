import React, {Component} from 'react';

class Envios extends Component{
    constructor() {
        super();

        this.state = {
            envioId: 0,
            envioSeleccionado
        }
    }

    onEnvioClick () {
        fetch(this.props.url)
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({
                    showValues: true,
                    height: data.height,
                    weight: data.weight,
                    imageURL: data.sprites.front_default
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return(
            <div>
                {this.state.showValues ?
                    <li className={"card"}>

                        <div className={"row"}>
                            <div className={"col-6"}>
                                <p>name: {this.props.name}</p>
                                <p>height: {this.state.height}</p>
                                <p>weight: {this.state.weight}</p>
                            </div>
                            <div className={"col-6"}>
                                <img src={this.state.imageURL}/>
                            </div>
                        </div>
                    </li> :
                    <li
                        onClick={this.onEnvioClick.bind(this)}
                        className={"card"}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <p>Envios: {this.props.name}</p>
                            </div>
                        </div>
                    </li>
                }
            </div>

        );
    }
}

export default Envios;