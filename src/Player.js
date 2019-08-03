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
    	timeout:null,
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

  			newState['_currentTime'] = currentTime;
 
  	}
  }

  _getCurrentCoordinates(){
  	const {coordinates} = this.props;
  	const {_currentTime} = this.state;
  	
  	return coordinates.map((coordinate)=>{
  		return coordinate.time < _currentTime;
  	})
  }
  
  _continue(){
  	const {speed,onChangeTime,currentTime} = this.props;
  	const {_currentTime,timeout,playing} = this.state;
  	
  	const isBackward = speed<0?true:false;
  	
  	if(!playing){
  		return;
  	}
  	
  	let time = currentTime?currentTime:_currentTime;
	  console.log(time);
  	if(time<2&&isBackward){
  		return;
  	}
  	
  	const _timeout = window.setTimeout(()=>{
  		
  		time+=(isBackward?-1:1)*5*speed/1000;

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

  handleForward() {}

  handleBackward() {}
  
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
    
    
    
