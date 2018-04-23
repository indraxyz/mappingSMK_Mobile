import React, { Component } from 'react';
import {
  View, ScrollView, ToastAndroid,
  Alert, AsyncStorage, BackHandler
} from 'react-native';
import { 
  Container, Content, Card, CardItem, Body, Text, Form, Item, Input, Label,
  Button, ActionSheet, Badge, Thumbnail, Toast,
} from 'native-base';
import styles from '../config/styles';
import g from '../config/global';

// tidak dipakai
const session = {
  username : 'xxxxxx',
  password : '',
}

const exitApp = 0; // cek exit app 

class Login extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      username:'',
      password:'',
      _token:'',
    };
 
  }

  // dijalanakn sbelum ui dirender
  componentWillMount() {
    fetch(g.baseUrl+'getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ _token:responseJson })
        // Alert.alert(this.state._token);
    }).catch((error) => {
      console.error(error);
    });

    BackHandler.addEventListener('hardwareBackPress', () => {
      
      if (exitApp == 1) {
        BackHandler.exitApp();
      }else{
        ToastAndroid.show('Tekan sekali lagi untuk keluar dari Aplikasi', ToastAndroid.SHORT);
        exitApp++;
        return true // do not exit app
      }
      
    })
  }

  // login
  _login(){
    console.log('click');
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("password", this.state.password);
    formdata.append("_token", this.state._token );

    fetch(g.baseUrl+'loginUser', {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      })
      .then((response) => response.json())
      .then((response) => {
        // Alert.alert(response.toString())
        if(response == 0){
          Toast.show({
              text: 'Wrong Account',
              position: 'bottom',
              duration: 3000
            })
        }else{
          // Alert.alert(session.username);
          session.username = this.state.username;
          session.password = this.state.password;
          this.props.navigation.navigate('Dasboard',session);
        }
    }).catch((error) => {
      console.error(error);
    });
  }

  // navigation
  vSignUp = () => {
    this.props.navigation.navigate('SignUp');
  };

  // render ui
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={{alignItems: 'center', paddingTop:17, }}>
            <Thumbnail 
              square 
              source={require('../assets/logo.png')} 
              style={styles.logo}
            />
            <Text>Pemetaan SMK Surabaya</Text>
          </View>

          <Form>
            <Item>
              <Input 
               placeholder="Username" 
               onChangeText={(username) => this.setState({ username })}
              />
            </Item>
            <Item last>
              <Input 
               placeholder="Password" 
               onChangeText={(password) => this.setState({ password })}
               secureTextEntry={true}
              />
            </Item>

            <Button 
             block 
             success
             onPress={() => this._login()}
             style={styles.button}
            >
              <Text>Login</Text>
            </Button>

            <Button 
             block 
             success
             onPress={() => this.vSignUp()}
             style={styles.button}
            >
              <Text>Sign Up</Text>
            </Button>

          </Form>

        </Content>
      </Container>           
    );
  }
}

export default Login;
