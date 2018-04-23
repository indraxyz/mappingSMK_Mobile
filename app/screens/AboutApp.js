import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail,
  List, ListItem, Badge, CardItem, Card, Right
} from 'native-base';
import styles from '../config/styles';

class AboutApp extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
 
  }

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
            <Title> About App </Title>
          </Body>
        </Header>
        <Content>

          <List>
            <ListItem>
              <Thumbnail large source={require('../assets/foto_profil.jpg')} />
              <Body style={{marginLeft:5}}>
                <Text>Aplikasi ini dibuat oleh :</Text>
                
                  <Badge success style={styles.pembuat} >
                    <Text>Nama : Kus Hendrat Moko</Text>
                  </Badge>
                  <Badge success>
                    <Text>NBI : 461304180</Text>
                  </Badge>
                
              </Body>
            </ListItem>
          </List>

          <List>
            <ListItem avatar>
              <Left>
                <Text>1.</Text>
              </Left>
              <Body>
                <Text>Menu Home</Text>
                <Text note>
                  Halaman pembuka aplikasi dan logout aplikasi
                </Text>
              </Body>
            </ListItem>
          </List>
           <List>
            <ListItem avatar>
              <Left>
                <Text>2.</Text>
              </Left>
              <Body>
                <Text>Menu Akun Saya</Text>
                <Text note>
                  Melihat dan mengedit data akun anda.
                </Text>
              </Body>
            </ListItem>
          </List>
           <List>
            <ListItem avatar>
              <Left>
                <Text>3.</Text>
              </Left>
              <Body>
                <Text>Menu List Sekolah</Text>
                <Text note>
                  melihat detail sekolah, memberi like dan komentar untuk sekolah
                </Text>
              </Body>
            </ListItem>
          </List>
           <List>
            <ListItem avatar>
              <Left>
                <Text>4.</Text>
              </Left>
              <Body>
                <Text>Menu Map Sekolah</Text>
                <Text note>
                  melihat posisi sekolah, melihat rute sekolah
                </Text>
              </Body>
            </ListItem>
          </List>
           <List>
            <ListItem avatar>
              <Left>
                <Text>5.</Text>
              </Left>
              <Body>
                <Text>Menu About App</Text>
                <Text note>
                  Info pembuat Aplikasi dan keterangan menu aplikasi
                </Text>
              </Body>
            </ListItem>
          </List>

        </Content>
      </Container>
    );
  }
}

export default AboutApp;
