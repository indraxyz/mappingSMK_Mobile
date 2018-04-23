import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert, AsyncStorage
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail,
  List, ListItem, Right, Fab
} from 'native-base';
import styles from '../config/styles';
import g from '../config/global';

const session = '';

class MyAkun extends Component {
  constructor() {
    super();
    this.state = {
      data: '',
    };
 
  }

  // dijalankan sebelum ui dirender
  componentWillMount(){
    this.getSession();
  }


  // ambil data user login
  getSession(){
    fetch(g.baseUrl+'getSessionUser',
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        this.getMyAkun(response);
      // Alert.alert(session.id)
    }).catch((error) => {
      console.error(error);
    });
  }

  // ambil data akun
  getMyAkun(d){
    fetch(g.baseUrl+'myUserAkun/'+d.id,
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
      this.setState({data: response});
    }).catch((error) => {
      console.error(error);
    });
  }

  // ui kelamin
  vKelamin(d){
    if(d == 1){
      return 'laki-laki'
    }else{
      return 'perempuan'
    }
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
            <Title> Akun Saya </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this.props.navigation.navigate('EditMyAkun',this.state.data.id)}
            >
              <Icon name='create' />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem avatar>
              <Left>
                <Icon name="contact" />
              </Left>
              <Body>
                <Text>ID</Text>
                <Text note>{this.state.data.id}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="lock" />
              </Left>
              <Body>
                <Text>Password</Text>
                <Text note>{this.state.data.password}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="contact" />
              </Left>
              <Body>
                <Text>Nama</Text>
                <Text note>{this.state.data.nama}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="man" />
              </Left>
              <Body>
                <Text>NIK / Nomor Siswa</Text>
                <Text note>{this.state.data.nik}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="mail" />
              </Left>
              <Body>
                <Text>Email</Text>
                <Text note>{this.state.data.email}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="pin" />
              </Left>
              <Body>
                <Text>Tempat Lahir</Text>
                <Text note>{this.state.data.tempat_lahir}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="calendar" />
              </Left>
              <Body>
                <Text>Tanggal Lahir</Text>
                <Text note>{this.state.data.tgl_lahir}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="arrow-dropdown-circle" />
              </Left>
              <Body>
                <Text>Kelamin</Text>
                <Text note>{this.vKelamin(this.state.data.kelamin)}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="bulb" />
              </Left>
              <Body>
                <Text>Pekerjaan</Text>
                <Text note>{this.state.data.pekerjaan}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="map" />
              </Left>
              <Body>
                <Text>Alamat</Text>
                <Text note>{this.state.data.alamat_lengkap}</Text>
              </Body>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Icon name="phone-portrait" />
              </Left>
              <Body>
                <Text>Tlp.</Text>
                <Text note>{this.state.data.tlp}</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default MyAkun;
