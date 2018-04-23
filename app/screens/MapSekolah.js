import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert, Linking
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Item, Input, Right,
  Form, Label,
} from 'native-base';
import styles from '../config/styles'
import MapView from 'react-native-maps';
import MapContainer from '../config/MapContainer';
import g from '../config/global';

const keyPosisiSaya=0;

class MapSekolah extends Component {
  constructor() {
    super();
    this.state = {
      sekolah: [],
      currentLocation:[],
      route:[],
      coords:0,
      destStart:'',
      destFinish:'',
      regLat:-7.257472,
      regLong:112.752088,
    };
 
  }

  // dijalankan sebelum ui dirender
  componentWillMount() {
    this.getSekolah();
  }

  componentDidMount() {
    // this.getDirection();
  }

  // ambil data sekolah
  getSekolah() {
    fetch(g.baseUrl+'listSekolah/all',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
      this.setState({sekolah: responseJson});
    }).catch((error) => {
      console.error(error);
    });
  }

  // ambil data koordinat
  getCoordinate(lat,long){
      var r = {
                latitude: lat,
                longitude: long,
              };
    return r;
  }

  // posisi saya
  posisiSaya(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
          // this.setState({currentLocation: {longitude: position.longitude, latitude: position.latitude}});
          // Alert.alert(JSON.stringify(position.coords.latitude))
            
          var lat = position.coords.latitude;
          var long = position.coords.longitude;

          this.setState({currentLocation: []});
          this.state.currentLocation.push(
            <MapView.Marker
              key={keyPosisiSaya}
              coordinate={{latitude: lat,longitude: long,}}
              title='posisi saya'   
              pinColor='blue'     
              onPress={() => this.setDestination(lat,long)}
            />
          );
          this.setState({
              currentLocation: this.state.currentLocation,
          })

          this.setState({regLat: lat, regLong:long}); //set region map
      }, 
      (error) => {
          alert(JSON.stringify(error))
      }, 
      {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
      }
    );

  }

  // open gps
  openGps(){
    var url = 'google.navigation:q='+this.state.destFinish; //-7.298471, 112.766914' UNTAG
    Linking.canOpenURL(url)
      .then(
        supported => {
          if(supported){
            Linking.openURL(url);
          }else{
            Alert.alert('ga bisa buka');
          }
        }
      );
  }

  // rute
  getDirection(origin,destination){
    const mode = 'driving'; // 'walking';
    // const origin = '-7.298471, 112.766914'; //untag
    // const destination = '-7.305,112.734';
    const APIKEY = 'AIzaSyAnbCW_HlsNVGl0ibAVAG-3G6YpzI9UyU8';
    // const url = "https://maps.googleapis.com/maps/api/directions/json?origin=-7.355003,%20112.720952&destination=-7.350832,%20112.718796&key=AIzaSyAnbCW_HlsNVGl0ibAVAG-3G6YpzI9UyU8&mode=driving";
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    fetch(url,{method: 'GET'})
      .then(response => response.json())
      .then(responseJson => {
          if (responseJson.routes.length) {
              this.setState({
                  coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
              });
          }
      }).catch(e => {console.warn(e)});
  }

  // draw rute
  decode(t,e){for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})}

  // untuk rute
  setDestination(lat,long){
    // Alert.alert(lat.toString());
    var vOrigin = lat+','+long;
    this.setState({regLat: lat, regLong:long});

    // reset
    if(this.state.destStart != '' && this.state.destFinish != '' ){
      this.setState({destStart: ''});
      this.setState({destFinish: ''});
      this.setState({coords: 0});
      this.setState({destStart: vOrigin})
    }else{
      if(this.state.destStart == ''){
        this.setState({destStart: vOrigin})
      }else{
        this.setState({destFinish: vOrigin})
      }
    }

  }

  // render ui
  render() {
    return (
      <Container style={styles.container}>
        <View style ={styles.containerMap}>
          <MapView
            style={styles.map}
            region={
              {
                latitude: this.state.regLat,
                longitude: this.state.regLong,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            }
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
          >

            {this.state.sekolah.map((d) => (
              <MapView.Marker
                key={d.id}
                coordinate={this.getCoordinate(d.lat,d.long)}
                title={d.nama}
                description={d.alamat}
                onPress={() => this.setDestination(d.lat,d.long)}
              />
            ))}

            {this.state.currentLocation}
            
            <MapView.Polyline
                coordinates={[
                    ...this.state.coords,
                ]}
                strokeWidth={4}
            />
          </MapView>
        </View>
        <Header
          style={{backgroundColor:'#1abc9c'}}
          androidStatusBarColor='#16a085'
        >
          <Left>
            <Button transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}
            >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title> Map Sekolah </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={()=> this.posisiSaya()}
            >
              <Icon name='pin' />
            </Button>
            <Button transparent
              onPress={()=> this.getDirection(this.state.destStart,this.state.destFinish)}
            >
              <Icon name="navigate" />
            </Button>
            <Button transparent
              onPress={()=> this.openGps()}
            >
              <Icon name="map" />
            </Button>
          </Right>
        </Header>
        <View >
          <Form
            style={styles.formRouteMap}
          >
            <Item>
              <Input 
               editable={false}
               placeholder="mulai dari" 
               value={this.state.destStart}
               onChangeText={(v) => this.setState({ destStart:v })}
              />
            </Item>
            <Item last>
              <Input 
               editable={false}
               placeholder="tujuan" 
               value={this.state.destFinish}
               onChangeText={(v) => this.setState({ destFinish:v })}
              />
            </Item>

          </Form>
        </View>
      </Container>
    );
  }
}

export default MapSekolah;
