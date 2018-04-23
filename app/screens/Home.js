import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert, BackHandler
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail,
  Right
} from 'native-base';
import styles from '../config/styles';
import g from '../config/global';

const session='';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  // dijalankan sebelum ui dirender
  componentWillMount(){
    // back press handle
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true // do not exit app
    })
  }

  // fungsi logout
  logout(){
    fetch(g.baseUrl+'logoutUserAnd',
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        this.props.navigation.navigate('Login')
    }).catch((error) => {
      console.error(error);
    });
  }

  // render ui
  render() {
    return (
      <Container style={styles.container}>
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
            <Title> Home </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={()=> this.logout()}
            >
              <Icon name='log-out' />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{alignItems: 'center', paddingTop:17, }}>
            <Thumbnail 
              square 
              source={require('../assets/logo_home.png')} 
              style={styles.logo}
            />
            <Text>Welcome and enjoy this app .</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Home;
