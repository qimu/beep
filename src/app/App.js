import React, { Component } from 'react';
import SoundCtrl from './SoundCtrl';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weight: 0,
			socket: props.socket,
			shouldPlay: false,
			elaspedTime: 0,
			previousTime: 0
		}

		this.newWeightReceived = this.newWeightReceived.bind(this);
	}

	componentDidMount() {
		this.state.socket.on('newWeight', weightString => {
			var weight = parseInt(weightString);
			this.newWeightReceived(weight);
		})
	}

	newWeightReceived(weight) {
		var now = Date.now();

		this.setState({
			previousTime: now,
			elaspedTime: this.state.elaspedTime + (now - this.state.previousTime)
		})

		// always update the weight on screen
		this.setState({
			weight: weight
		})

		// if 5 seconds not passed since last beep, don't beep
		if (weight > 100 && this.state.elaspedTime >= 5000) {
			this.setState({
				shouldPlay: true,
				elaspedTime: 0
			})
		} else {
			this.setState({
				shouldPlay: false
			})
		}

	}

	render() {
		return (
			<div>
				<SoundCtrl startPlay={this.state.shouldPlay}/>
				<h1>Current Weight: {this.state.weight}</h1>
				 <p>{this.state.shouldPlay}</p>
			</div>
		);
	}
}

export default App;
