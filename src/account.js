import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import Todo from './todo';

class Account extends React.Component {
	constructor(props) {
		super(props);
		this.state = {username: '', Lstatus : '', Rstatus : '', cookies : ''};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
		this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
	}
	
	handleInputChange(event) {
		this.setState({username: event.target.value});
	}
	
	handleLoginSubmit(event){
		event.preventDefault();
		
		axios.post('https://hunter-todo-api.herokuapp.com/auth', 
			{'username': this.state.username})
			.then(response => {
				//console.log(response)
				this.setState({cookies: response.data['token']})
				//console.log(this.state.cookies)
				this.Login()
			})
			.catch(error => {
				//console.log(error)
				this.setState({Lstatus: 'Username not found'})
			})
	}
	handleRegisterSubmit(event){
		event.preventDefault();
		
		axios.post('https://hunter-todo-api.herokuapp.com/user', 
			{'username': this.state.username})
			.then(response => {
				//console.log(response)
				const str = "You can now login as " + this.state.username;
				this.setState({Rstatus: str})
			})
			.catch(error => {
				//console.log(error)
				this.setState({Rstatus: 'Username already exist'})
			})
	}
		
	render() {
		return (<div>
					<h1>Login</h1>
					<form onSubmit = {this.handleLoginSubmit}>
					<label> Username </label>
					<input type = "text" name = "username" value={this.state.username} onChange={this.handleInputChange} />
					<button type = "submit">Login</button>
					</form>
					{this.state.Lstatus}
					<br />
					<h1>Register</h1>
					<form onSubmit = {this.handleRegisterSubmit}>
					<label> Username </label>
					<input type = "text" name = "username" value={this.state.username} onChange={this.handleInputChange} />
					<button type = "submit">Register</button>
					</form>
					{this.state.Rstatus}
				</div>
		);
	}
	
	Login(props){
		ReactDOM.render(
			<Todo cookie = {this.state.cookies} />,
			document.getElementById('root')
		);
	}
	

}
	


export default Account
