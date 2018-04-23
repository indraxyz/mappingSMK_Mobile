import React, { Component } from 'react';
import {
  View, ScrollView, Alert, Dimensions
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail,
  Card, CardItem, Image, List, ListItem, Right, Footer, FooterTab, Badge, Form, Item,
  Input, Toast,
} from 'native-base';
import styles from '../config/styles';

const win = Dimensions.get('window');

class DetailSekolah extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      like: 0,
      colorLike: '#ecf0f1',
    };
 
  }

  componentWillMount(){
    var dSekolah = this.props.navigation.state.params;
    this.getUserLike(dSekolah.id);
    this.getToken();
    this.countUserLike(dSekolah.id);
    this.countKomentar(dSekolah.id);
  }

  goBack(){
    this.props.navigation.navigate('MapSekolah');
  }

  getToken(){
    fetch('http://10.0.3.2/pemetaansmk/public/getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ _token:responseJson })
        // Alert.alert(this.state._token);
    }).catch((error) => {
      console.error(error);
    });
  }

  countKomentar(d){
    fetch('http://10.0.3.2/pemetaansmk/public/countKomentar_And/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
        this.setState({ countKomentar:r })
        // Alert.alert(this.state._token);
    }).catch((error) => {
      console.error(error);
    });
  }

  countUserLike(d){
    fetch('http://10.0.3.2/pemetaansmk/public/countUserLike/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
        this.setState({ countLike:r })
        // Alert.alert(this.state._token);
    }).catch((error) => {
      console.error(error);
    });
  }

  getUserLike(id){
    fetch('http://10.0.3.2/pemetaansmk/public/getUserLike_And/'+id,
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        // set like
        this.setState({like:1 });
        this.setState({idLike:response.id });
        // set color
        if(response == 0){
          this.setState({colorLike:'#ecf0f1' });
        }else{
          this.setState({colorLike:'#F64747' });
        }
    }).catch((error) => {
      console.error(error);
    });
  }

  _likeSekolah(d,s){

    if(s == 0){
      this.sukai(d);
    }
    if(s == 1){
      this.batalSuka(d);
    }

  }

  batalSuka(d){
    fetch('http://10.0.3.2/pemetaansmk/public/deleteUserLike/'+this.state.idLike, 
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        this.setState({like:0 });
        this.setState({colorLike:'#ecf0f1' });
        Toast.show({
          text: 'Batal sukai Sekolah ini',
          position: 'bottom',
          duration: 3000
        });
        this.countUserLike(d);
    }).catch((error) => {
      console.error(error);
    });
  }

  sukai(d){
    // send data like
    let formdata = new FormData();
    formdata.append("idSekolah", d);
    formdata.append("_token", this.state._token );

    fetch('http://10.0.3.2/pemetaansmk/public/sendLike_And', {
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
        this.setState({like:1 });
        this.setState({colorLike:'#F64747' });
        Toast.show({
          text: 'Menyukai Sekolah ini',
          position: 'bottom',
          duration: 3000
        });
        this.countUserLike(d);
    }).catch((error) => {
      console.error(error);
    });
  }

  _rayon(d){
    if(d == 1){
      return 'surabaya barat';
    }else{
      return 'surabaya timur';
    }
  }

  render() {
    // const {goBack} = this.props.navigation;
    const data = this.props.navigation.state.params;
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
            <Title> Detail Sekolah </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this._likeSekolah(data.id,this.state.like)}
            >
              <Icon 
                name='heart' 
                style={{color:this.state.colorLike}}
              />
            </Button>
          </Right>
        </Header>
        <Content>
        
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Icon name="school" />
                <Body>
                  <Text>{data.nama}</Text>
                  <Text> Akreditas {data.akreditas}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Thumbnail 
                  source={{uri: 'http://10.0.3.2/pemetaansmk/public/img/sekolah/'+data.foto}} 
                  style={{flex: 1,
                          width: 350,
                          height: 300,}}
                />
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="mail" />
              <Body>
                <Text>E-Mail</Text>
                <Text note>{data.email}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="pin" />
              <Body>
                <Text>Alamat</Text>
                <Text note>{data.alamat}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="phone-portrait" />
              <Body>
                <Text>Tlp.</Text>
                <Text note>{data.tlp}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="git-network" />
              <Body>
                <Text>Website</Text>
                <Text note>{data.website}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="person" />
              <Body>
                <Text>Kepala Sekolah</Text>
                <Text note>{data.kep_sek}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="bookmark" />
              <Body>
                <Text>Status Mutu</Text>
                <Text note>{data.status_mutu}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="paper" />
              <Body>
                <Text>ISO</Text>
                <Text note>{data.sertifikasi_iso}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="map" />
              <Body>
                <Text>Wilayah</Text>
                <Text note>{this._rayon(data.rayon)}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Icon active name="information-circle" />
              <Body>
                <Text>Deskripsi</Text>
                <Text note>{data.deskripsi}</Text>
              </Body>
            </CardItem>
          </Card>
  
        </Content>
        <Footer>
          <FooterTab>
            <Button badge vertical
              
            >
              <Badge><Text>{this.state.countKomentar}</Text></Badge>
              <Icon name="chatbubbles" />
            </Button>
            <Button badge vertical >
              <Badge ><Text>{this.state.countLike}</Text></Badge>
              <Icon name="heart" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default DetailSekolah;

// <Item style={{width:100}}>
//   <Input placeholder="Username" />
// </Item>
// onPress={() => this.props.navigation.navigate('KomentarSekolah',data)}
