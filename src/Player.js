import React,{
	Component
} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'proptypes';
import PlayIcon from '@material-ui/icons/Play';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography';

const styles = theme=>({
	paper:{
		
	}
})

class PlayerComponent extends Component {
	
	construct(props){
		super(props);
		
		this.handlePause = this.handlePause.bind(this);
		this.handlePlay = this.handlePlay.bind(this);
		this.handleStop = this.handleStop.bind(this);
		this.handleSeek = this.handleSeek.bind(this);
		this.handleForward = this.handleForward.bind(this);
		this.handleBackward = this.handleBackward.bind(this);
	}
	
	handlePause(){
		
	}
	
	handlePlay(){
		
	}
	
	handleStop(){

	}
	
	handleSeek(){
		
	}
	
	handleForward(){
		
	}
	
	handleBackward(){
		
	}

	render(){
		const {classes} = this.props;
		
		return (
			<Paper>
				
			</Paper>
		);
	}
}




const Player = withStyles(styles) (PlayerComponent);

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


export default Player;