import React, {Component} from 'react';
import ID from '../utils/auxs'

class Pokemon extends Component{
    constructor() {
        super();

        this.state = {
            showValues: false,
            imageURL: '',
            height: 0,
            weight: 0
        }
    }

    onPokemonClick () {
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
                        onClick={this.onPokemonClick.bind(this)}
                        className={"card"}>
                        <div className={"row"}>
                            <div className={"col-6"}>
                                <p>Pokemon Name: {this.props.name}</p>
                            </div>
                        </div>
                    </li>
                }
            </div>

        );
    }
}

export default Pokemon;