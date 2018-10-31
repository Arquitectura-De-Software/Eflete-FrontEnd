import React, {Component} from 'react';
import Header from "./Header";
import Main from "./Main";

class App extends Component {
    render() {
        return (
            <div
                className={"container app-container"}
            >
                <Header />
                <br/>
                <div class="container">
                <Main />
                </div>
            </div>
        )
    }
}

export default App;