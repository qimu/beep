var Sound = require('react-sound');
import React, { Component } from 'react';

class SoundCtrl extends Component {

	constructor(props) {
		super(props);
	}

	handleSongFinishedPlaying() {
		this.setState({
			status: Sound.status.STOPPED
		})
	}

	handleSongPlaying() {
		// console.log('start playing!!!');
	}

	render() {
    console.log('render ctrl again ---------');
		return <Sound
		url="sounds/213795__austin1234575__beep-1-sec.wav"
		playStatus={this.props.startPlay ? Sound.status.PLAYING : Sound.status.STOPPED}
		playFromPosition={0 /* in milliseconds */}
		onLoading={this.handleSongLoading}
		onPlaying={this.handleSongPlaying.bind(this)}
		onFinishedPlaying={this.handleSongFinishedPlaying.bind(this)} />
	}

}

export default SoundCtrl;
