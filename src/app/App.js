import React, { Component } from 'react';
import SoundCtrl from './SoundCtrl';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			weight: 0,
			socket: props.socket,
			shouldPlay: false
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
		this.setState({
			weight: weight,
			shouldPlay: weight > 100 ? true : false
		})

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
