import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom'
import Account from './account'

class todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data: '', item : '', cookies : this.props.cookie};
		this.handletodoitem = this.handletodoitem.bind(this);
		this.handleadditem = this.handleadditem.bind(this);
		this.getitems = this.getitems.bind(this);
		this.deleteitem = this.deleteitem.bind(this);
		this.completeitem = this.completeitem.bind(this);
	}
	
	componentDidMount(){
		this.getitems();
	}
	
	handletodoitem(event){
		this.setState({item: event.target.value});
	}
	
	handleadditem(event){
		event.preventDefault();
		
		axios.post('http://hunter-todo-api.herokuapp.com/todo-item',
			{'content' : this.state.item},
			{ headers : {'sillyauth': this.state.cookies} })
			.then(response => {
				//console.log(response)
				this.setState({item: ''})
				this.getitems()
			})
			.catch(error => {
				//console.log(error)
			})
	}
	
	getitems(){
		
		axios.get('http://hunter-todo-api.herokuapp.com/todo-item',
			{ headers : {sillyauth: this.state.cookies} })
		.then(response => {
			//console.log(response)
			this.setState({data : response.data})
			//console.log(this.state.data)
		})
		.catch(error => {
			//console.log(error)
		})
	}		
	deleteitem(id){
		axios.delete('http://hunter-todo-api.herokuapp.com/todo-item/' + id,
			{ headers : {'sillyauth': this.state.cookies} })
		.then(response => {
			//console.log(response)
			this.setState({data : response.data})
			//console.log(this.state.data)
			this.getitems()
		})
		.catch(error => {
			//console.log(error)
		})
	}	
	completeitem(id){
		axios.put('http://hunter-todo-api.herokuapp.com/todo-item/' + id,
			{'completed' : 1},
			{headers: {'sillyauth': this.state.cookies}})
		.then(response => {
			//console.log(response)
			this.setState({data : response.data})
			//console.log(this.state.data)
			this.getitems()
		})
		.catch(error => {
			//console.log(error)
		})
	}		
	
	signout(){
		ReactDOM.render(
			<Account />,
			document.getElementById('root')
		);
	}
	
	render () {		

		const item = (this.state.data.length > 0 ?
			(this.state.data.map(item => {
					if(item['completed'])
					{
						return (
							<li key = {item.id} >
								<del>{item['content']}</del>
								<button onClick = {this.deleteitem.bind(this, item['id'])}> Delete </button>
							</li>
						)
					}
					else
					{
						return (
							<li key = {item.id} >
								{item['content']} <button onClick = {this.deleteitem.bind(this, item['id'])}> Delete </button>
								<button onClick = {this.completeitem.bind(this, item['id'])}> Mark Done </button>
							</li>
						)
					}
			})): <br />)
		
			
		return (
			<div>
			<h1>To Do</h1>
			<form onSubmit = {this.handleadditem}>
				<label> Add Item </label>
				<input type = "text" name = "item" value={this.state.item} onChange = {this.handletodoitem} />
				<button type = "submit">Add</button>
			</form>	
			<button onClick = {this.signout}> Logout </button>
			<ul>
			{item}
			</ul>
			</div>
		)
	};
}

export default todo