import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ToastContainer, ToastStore} from "react-toasts";

class Login extends Component {
    constructor() {
        super();
    }

    render() {
        return (
        	  <div class="container">
        	  	<div class="row">
	        	  <div class="col-4">
        	  		<div class="card">
	        	  		<div class="container">
						    <form className="form-signin">       
						      <h2 className="form-signin-heading">Please login</h2>
						      <br/>
						      <input type="text" className="form-control" name="username" placeholder="Email Address" />
						      <br/>
						      <input type="password" className="form-control" name="password" placeholder="Password" />      
						      <br/>
						      <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>   
						      <br/>
						    </form>
						    <ToastContainer store={ToastStore}/>
						  </div>
						</div>
					</div>
			  	</div>
			  </div>
		);
	}
}

export default Login;