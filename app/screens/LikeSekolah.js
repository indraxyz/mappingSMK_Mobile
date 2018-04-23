import React, { Component } from 'react';
import {
  View, ScrollView, Alert, BackHandler, Modal, TouchableHighlight, TextInput
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail,
  Right, List, ListItem, Footer, Form, Item, Input,
} from 'native-base';
import styles from '../config/styles';
import g from '../config/global';

class LikeSekolah extends Component {
  constructor() {
    super();
    this.state = {
      listLike: [],
    };
  }

  // dijalankan sebelum ui dirender
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true // do not exit app
    })
    this.getListLike(this.props.navigation.state.params.id);
  }

  // navigation
  goBack(){
    this.props.navigation.navigate('DetailSekolah',this.props.navigation.state.params);
  }

  // ambil data suka
  getListLike(d){
    fetch(g.baseUrl+'getLike_And/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
        this.drawListLike(r);
    }).catch((error) => {
      console.error(error);
    });
  }

  // draw list like
  drawListLike(d){
    d.map((data) => {
      this.state.listLike.push(
        <ListItem
          key={data.id}
        >
          <Body>
            <Text>{data.id_user}</Text>
            <Text note>{data.waktu}</Text>
          </Body>
        </ListItem>
      );
      this.setState({listLike: this.state.listLike});
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
              onPress={() => this.goBack()}
            >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title> Likes </Title>
          </Body>
          
        </Header>
        <Content>
          <List>
            {this.state.listLike}
          </List>
        </Content>
      </Container>
    );
  }
}

export default LikeSekolah;
