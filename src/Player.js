import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { Map, GoogleApiWrapper } from "google-maps-react";
//import PropTypes from 'proptypes';
//import StopIcon from '@material-ui/icons/Stop';
//import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {},
  seekBar: {},
  seeked:{}
});

class PlayerComponent extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    	playing:false,
    	timeout:0,
    	_currentTime:0
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleForward = this.handleForward.bind(this);
    this.handleBackward = this.handleBackward.bind(this);
  }
  
  componentDidUpdate(){
  	const {currentTime} = this.props;
  	const {_currentTime} = this.state;
  	
  	let newState = {};
  	
  	if(currentTime && currentTime != _currentTime){

  			newState=[_currentTime] = currentTime;
  		
  	}
  }

  handlePause() {}

  handlePlay() {
  	const {currentTime, speed,onChangeTime} = this.props;
  	
  	const isBackward = speed<0?true:false;
  	
  	let _currentTime = currentTime;
  	
  	if(currentTime<2&&isBackward){
  		return;
  	}
  	
  	const timeout = window.setTimeout(()=>{
  		
  		_currentTime+=isBackward?-1:1;
  		
  		if(onChangeTime){
  			onChangeTime(_currentTime);
  			
 			 if(!currentTime){
  				this.setState({
  					_currentTime
  				})
  			}
  		} else {
  			this.setState({
  				_currentTime
  			})
  		}
  		
  		
  	}, 1000/(isBackward?((-1)*speed):speed));
  	
  	this.setState({
  		timeout
  	})
  }

  handleStop() {}

  handleSeek() {}

  handleForward() {}

  handleBackward() {}
  
  renderSatusIcon() {
  	const {
  		playing
  	} = this.state;
  	
  	
  	if(!playing){
  		return (
  			<PauseIcon />
  		)
  	}
  	
  	return (
  		<PlayIcon onClick={this.handlePlay} />
  	)
  }

  render() {
    const { classes, google, zoom } = this.props;

    return (
      <Paper>
        <Map google={google} zoom={zoom} />
        <Toolbar variant="dense" className={classes.panel}>
        	<IconButton>
        		{this.renderSatusIcon()}
        	</IconButton>
        	<div className={classes.seekBar}>
        		<div className={classes.seeked}/>
        	</div>
        </Toolbar>
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
	
	
Player.defaultProps ={
	speed:1000
}

export default Player;
    
    