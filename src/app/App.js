import React, { Component } from 'react';
import SoundCtrl from './SoundCtrl';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weight: 40000,
			socket: props.socket,
			shouldPlay: false,
			elaspedTime: 0,
			previousTime: 0
		}

		this.newWeightReceived = this.newWeightReceived.bind(this);
	}

	componentDidMount() {
		this.state.socket.on('newWeight', weight => {
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
		if (weight >= 500 && this.state.elaspedTime >= 5000) {
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
				<div className="dashboard">
					<SoundCtrl startPlay={this.state.shouldPlay}/>
					<div className="truck-indicator">
						<div className="truck-indicator-text">
							<h2>{ this.state.weight >= 500 ? "Truck is On" : "No Truck" }</h2>
						</div>
						<div className="truck-indicator-img">
							<img src= { this.state.weight >= 500 ? "/images/truck-on.png" : "/images/truck-off.png" }></img>
						</div>
					</div>
					<div className="currentWeight">
						<h2>CURRENT WEIGHT:</h2>
						<div className="weight-number">{this.state.weight}</div>
					</div>
				</div>

			</div>
		);
	}
}

export default App;
