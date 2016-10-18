import React, { Component } from 'react';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weight: 0
		}
		props.socket.on('newWeight', weight => {
			newWeightReceived(weight);
		})
	}

	newWeightReceived(weight) {
		console.log(weight);
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
