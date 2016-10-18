import React, { Component } from 'react';


var Sound = require('react-sound');
class SoundCtrl extends Component {

	render() {
		return <Sound
		url="sounds/153213__freezeman__beep1.wav"
		playStatus={Sound.status.PLAYING}
		playFromPosition={0 /* in milliseconds */}
		onLoading={this.handleSongLoading}
		onPlaying={this.handleSongPlaying}
		onFinishedPlaying={this.handleSongFinishedPlaying} />
	}

}

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
				<SoundCtrl />
				<h1>Current Weight: {this.state.weight}</h1>
			</div>
		);
	}
}

export default App;
