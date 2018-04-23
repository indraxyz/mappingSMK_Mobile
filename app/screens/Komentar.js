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

const session='';

class Komentar extends Component {
  constructor() {
    super();
    this.state = {
      allKomentar: [],
      modalVisible: false,
      vKomentar: [],
      textKomentar: '',
    };
  }

  // dijalankan sebelum ui dirender
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true // do not exit app
    })
    this.getToken();
    var dSekolah = this.props.navigation.state.params;
    this.getKomentar(dSekolah.id);
  }

  // ambil token web API
  getToken(){
    fetch(g.baseUrl+'getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ _token:responseJson })
        // Alert.alert(this.state._token);
    }).catch((error) => {
      console.error(error);
    });
  }

  // navigation
  goBack(){
    this.props.navigation.navigate('DetailSekolah',this.props.navigation.state.params);
  }

  // tidak dipakai
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  // ambil komentar
  getKomentar(d) {
    fetch(g.baseUrl+'getKomentar_And/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
      this.setState({allKomentar: r});
    }).catch((error) => {
      console.error(error);
    });
  }

  // kirim komentar
  sendKomentar(idSekolah){
    // send to server
    let formdata = new FormData();
    formdata.append("id_sekolah", idSekolah);
    formdata.append("teks", this.state.textKomentar);
    formdata.append("_token", this.state._token );

    fetch(g.baseUrl+'sendKomentar_And', {
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
        // Alert.alert(response.teks)
        this.state.vKomentar.push(
          <ListItem 
            key={response.id}
          >
              <Body>
                <Text>{response.id_user}</Text>
                <Text note>{response.waktu}</Text>
                <Text note>{response.teks}</Text>
              </Body>
          </ListItem>
        )
        this.setState({
            vKomentar: this.state.vKomentar,
            textKomentar:'',
        })
        
    }).catch((error) => {
      console.error(error);
    });
  }

  // render ui
  render() {
    const ds = this.props.navigation.state.params;
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
            <Title> Komentar </Title>
          </Body>
          
        </Header>
        <Content>
        
          <List >
            {this.state.allKomentar.map((d) => (

              <ListItem 
                key={d.id}
              >
                <Body>
                  <Text>{d.id_user}</Text>
                  <Text note>{d.waktu}</Text>
                  <Text note>{d.teks}</Text>
                </Body>
              </ListItem>
            
            ))}

            {this.state.vKomentar}
          </List>

        </Content>
        <Footer style={{backgroundColor:'#019875'}} >
          <ListItem icon style={{width:350}}>
            <Left>
              <Icon name="chatbubbles" 
                style={{color:'#C8F7C5'}}
              />
            </Left>
            <Body>
              <Item style={{width:200}}>
                <Input placeholder="tulis komentar" 
                  placeholderTextColor="#ffffff"
                  selectionColor= "#ffffff"
                  style={{color:"#ffffff"}}
                  onChangeText={(v) => this.setState({ textKomentar:v })}
                  value={this.state.textKomentar}
                />
              </Item>
            </Body>
            <Right>
              <Button transparent
                onPress={() => this.sendKomentar(ds.id)}
              >
                <Icon name="send" 
                  style={{color:'#C8F7C5'}}
                />
              </Button>
            </Right>
          </ListItem>
        </Footer>
      </Container>
    );
  }
}

export default Komentar;
