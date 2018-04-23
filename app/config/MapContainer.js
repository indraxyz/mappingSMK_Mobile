import React from "react";
import { View } from "native-base";
import MapView from "react-native-maps";

import styles from './styles'

export const MapContainer = ({region, marker}) => {
	return(
		<View style ={styles.containerMap}>
	        <MapView
	          style={styles.map}
	          region={region.region}
	          showsUserLocation={true}
	          followsUserLocation={true}
	        >
	        	<MapView.Marker
			      coordinate={{latitude: -7.257472, longitude: 112.752088}}
			      title='judul'
			      description='deskripsi'
			    />

	        </MapView>
      	</View>
	)
}

export default MapContainer;