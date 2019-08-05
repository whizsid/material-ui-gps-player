import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import FastForwardIcon from '@material-ui/icons/FastForward';
import StopIcon from '@material-ui/icons/Stop';
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
    	timeout:null,
    	_currentTime:0,
    	_speed:1000
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleForward = this.handleForward.bind(this);
  }
  
  _getCurrentCoordinates(){
  	const {coordinates} = this.props;
  	const {_currentTime} = this.state;
  	
  	return coordinates.map((coordinate)=>{
  		return coordinate.time < _currentTime;
  	})
  }
  
  _getLastCoordinate(){
  	const {coordinates} = this.props;
  	
  	return coordinates[coordinates.length-1];
  }
  
  _continue(){
  	const {speed,onChangeTime,currentTime} = this.props;
  	const {_currentTime,_speed,timeout,playing} = this.state;
  	const currentSpeed= speed?speed:_speed;
  	
  	if(!playing){
  		// If paused or stopped not continue
  		return;
  	}
  	
  	// If passed current time via props
  	let time = currentTime?currentTime:_currentTime;
 
  	const lastCoordinate = this._getLastCoordinate();
  	// Checking the weather current time is in the valid time range
  	if(
  		(time<1&&currentSpeed<0)//||
  		//(lastCoordinate && lastCoordinate.time>=time)||
  		//!lastCoordinate
  	){
  		return ;
  	}
  	
  	const _timeout = window.setTimeout(()=>{
  		
  		time+= 5*currentSpeed/1000;

  		if(onChangeTime){
  			onChangeTime(time);
 
 			 if(!currentTime){
 				this.setState({
  					_currentTime:time
 				},()=>this._continue());
  			} else {
  				this._continue();
  			}
  			
  		} else {
  			this.setState({
  				_currentTime:time
  			},()=>this._continue());
  		}

	  },5);
	  
  	this.setState({
  		timeout:_timeout
  	})
  }

  handlePause() {
  	
  	this.setState({
  		playing:false
  	});
  }

  handlePlay() {
  	
  	this.setState({
  		playing:true
  	},()=>{
  		this._continue();
  	})
  	
  }

  handleStop() {}

  handleSeek() {}

  handleForward() {
 	const {speeds,speed,onChangeSpeed} = this.props;
 	const {_speed} = this.state;
  	console.log(_speed);
 	const currentSpeed=speed?speed:_speed;
 	
 	let index=0;
 	
 	const currentIndex = speeds.indexOf(currentSpeed);
 	if(currentIndex!=speeds.length-1){
 		index = currentIndex +1;
 	}
 	
 	if(onChangeSpeed){
 		onChangeSpeed(speeds[index]);
 	}
 	
 	if(!speed){
 		this.setState({
 			_speed:speeds[index]
 		});
 	}
  }
  
  renderSatusIcon() {
  	const {
  		playing
  	} = this.state;
  	
  	
  	if(playing){
  		return (
  			<IconButton onClick={this.handlePause} >
  				<PauseIcon />
  			</IconButton >
  		)
  	}
  	
  	return (
  		<IconButton onClick={this.handlePlay} >
  			<PlayIcon />
  		</IconButton >
  	)
  }

  render() {
    const { classes, google, zoom } = this.props;

    return (
      <Paper>
        {/*<Map google={google} zoom={zoom} />*/}
        <Toolbar variant="dense" className={classes.panel}>
        	{this.renderSatusIcon()}
        	<IconButton onClick={this.handleForward} >
        		<FastForwardIcon/>
        	</IconButton>
        	<IconButton >
        		<StopIcon />
        	</IconButton>
        	<div className={classes.seekBar}>
        		<div className={classes.seeked}/>
        		hjjhh
        	</div>
        </Toolbar>
      </Paper>
    );
  }
}

const Player =/* GoogleApiWrapper(props => ({
  apiKey: props.apiKey,
  language: props.language
}))(*/withStyles(styles)(PlayerComponent);
/*
Player.propTypes = {
	coordinates: 	PropTypes.arrayOf(PropTypes.shape({
						lat: PropTypes.number.isRequired,
						lng: PropTypes.number.isRequired,
						time: PropTypes.number.isRequired
					})).isRequired,
	
	onChangeTime:	PropTypes.func,
	onChangeSpeed:	PropTypes.func,
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
	speeds:[-1000,-750,-500,-100,100,500,750,1000],
	coordinates:[]
}

export default Player;
    
    
    
    
    