import {StyleSheet} from 'react-native';

// STYLE

export default {
	container:{
		backgroundColor: '#FFFFFF',
		flex: 1,
	},
	formLogin:{
		paddingBottom: 1,
		paddingTop: 39,
	},
	formSignUp:{
		paddingBottom: 3,
	},
	button:{
		margin: 10,
		marginBottom: 1,
	},
	logo:{
		width: 200,
		height: 200,
	},
	picker:{
		margin: 10,
		marginBottom: 5,
	},
	content:{
		margin: 7,
	},
	containerMap: {
		...StyleSheet.absoluteFillObject,
		flex:1,
	    justifyContent: 'flex-end',
	    alignItems: 'center',
   },
   map:{
   	...StyleSheet.absoluteFillObject,
   },
   pembuat:{
   	marginBottom: 3,
   },
   formRouteMap:{
   	backgroundColor:'#ECF0F1'
   },
}