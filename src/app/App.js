import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weight: 0,
			socket: props.socket
		}

		this.newWeightReceived = this.newWeightReceived.bind(this);
	}

	componentDidMount() {
		console.log('mouncted');
		this.state.socket.on('newWeight', weight => {
			this.newWeightReceived(weight);
		})
	}

	newWeightReceived(weight) {
		this.setState({
			weight: weight
		})
	}

	render() {
		return (
			<div>
				<h1>Current Weight: {this.state.weight}</h1>
			</div>
		);
	}
}

export default App;
