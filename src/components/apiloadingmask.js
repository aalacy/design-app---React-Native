import React from 'react';
import { connect } from "react-redux";
import { Animated, StyleSheet, View, StatusBar, ActivityIndicator, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

class ApiLoadingMask extends React.Component {

	state = {
		fadeAnim: new Animated.Value(0),	// Initial value for opacity: 0
		show: false
	}

	constructor(props) {
		super(props);

		this._mounted = false;

		this.processProps = this.processProps.bind(this);
	}

	componentDidMount() {
		this._mounted = true;
		this.processProps(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.processProps(nextProps);
	}

	componentWillUnmount() {
		this._mounted = false;
		this.setState({
			show: false
		})
	}

	processProps(nextProps) {
		if(!this._mounted) return;
		let vm = this;
		let f_show = nextProps.loading;
		if(f_show === undefined)
			f_show = nextProps.apiProcessing;
		if(f_show) {
			this.setState({ show: true });
			Animated.timing(									// Animate over time
				this.state.fadeAnim,						// The animated value to drive
				{
					toValue: 1,									 // Animate to opacity: 1 (opaque)
					duration: 200,							// Make it take a while
				}
			).start();												// Starts the animation
		} else {
			Animated.timing(									// Animate over time
				this.state.fadeAnim,						// The animated value to drive
				{
					toValue: 0,									 // Animate to opacity: 1 (opaque)
					duration: 200,							// Make it take a while
				}
			).start();												// Starts the animation
			setTimeout(() => {
				try {
					if(vm.props.finish)
						vm.props.finish();
					if(!this._mounted) return;
					vm.setState({
						show: false
					}); 
				} catch(e) {
					console.log("Exception on loading ", e);
				}
			}, 500);
		}
	}

	render() {
		let { fadeAnim } = this.state;

		if(this.state.show)
			return (
				<Animated.View
					style={{
						flex: 1,
						position: 'absolute',
						width: width,
						height: height,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'rgba(0,0,0,0.2)',
						zIndex: 100,
						opacity: fadeAnim,				 // Bind opacity to animated value
					}} >
						<ActivityIndicator size="large" color="#fff" />
				</Animated.View>
			)
		return null;
	}
}

export default connect(
	(state) => { return {	...state.common } }, { }
)(ApiLoadingMask);