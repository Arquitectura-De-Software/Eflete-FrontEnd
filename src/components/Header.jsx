import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to='/crearenvio'>Crear Envío</Link></li>
                        <li><Link to='/envios'>Consultar Envíos</Link></li>
                        <li><Link to='/modificarenvio'>Modificar Envíos</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;