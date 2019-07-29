import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Map, GoogleApiWrapper } from "google-maps-react";
//import PropTypes from 'proptypes';
//import PlayIcon from '@material-ui/icons/Play';
//import PauseIcon from '@material-ui/icons/Pause';
//import StopIcon from '@material-ui/icons/Stop';
//import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {}
});

class PlayerComponent extends Component {
  constructor(props) {
    super(props);

    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
  }

  handlePause() {}

  handlePlay() {}

  handleStop() {}

  handleSeek() {}

  handleForward() {}

  handleBackward() {}

  render() {
    const { classes, google, zoom } = this.props;

    return (
      <Paper>
        <div className={classes.seekBar}>hhhhh</div>
        <Map google={google} zoom={zoom} />
      </Paper>
    );
  }
}

const Player = GoogleApiWrapper(props => ({
  apiKey: props.apiKey,
  language: props.language
}))(withStyles(styles)(PlayerComponent));
/*
Player.propTypes = {
	coordinates: 	PropTypes.arrayOf(PropTypes.shape({
						lat: PropTypes.number.isRequired,
						lng: PropTypes.number.isRequired,
						time: PropTypes.number.isRequired
					})).isRequired,
	
	onChangeTime:	PropTypes.func,
	onPlay:  		PropTypes.func,
	onPause: 		PropTypes.func,
	onStop:  		PropTypes.func,
	
	currentTime: 	PropTypes.number.isRequired,
	speed:   		PropTypes.number,
	
	classes: 		PropTypes.shape({
						paper: PropTypes.string
					}),
}

*/

export default Player;
