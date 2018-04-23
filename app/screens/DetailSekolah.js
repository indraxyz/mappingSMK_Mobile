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
import g from '../config/global';

const win = Dimensions.get('window');

class DetailSekolah extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      like: 0,
      colorLike: '#ecf0f1',
      footerHeight: 0,
      toggleFooter: 0,
    };
 
  }

  // fungsi dijalankan sebelum ui dirender
  componentWillMount(){
    this.getToken();      // ambil token dari web API
  }

  componentDidMount(){
   // 
  }

  // navigasi untuk kembali
  goBack(){
    this.props.navigation.navigate('ListSekolah');
  }

  // ambil token dari web API
  getToken(){
    fetch(g.baseUrl+'getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        this.setState({ _token:response });

        var dSekolah = this.props.navigation.state.params;
        this.getUserLike(dSekolah.id);
    }).catch((error) => {
      console.error(error);
    });
  }

  // hitung komentar sekolah
  countKomentar(d){
    fetch(g.baseUrl+'countKomentar_And/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
          this.setState({ countKomentar:r })
    }).catch((error) => {
      console.error(error);
    });
  }

  // hitung user yg menyukai sekolah
  countUserLike(d){
    fetch(g.baseUrl+'countUserLike/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((r) => {
          this.setState({ countLike:r })
          this.countKomentar(d);  
    }).catch((error) => {
      console.log(error);
    });
  }

  // cek, apakah user sudah menyukai atau belum
  getUserLike(id){
    fetch(g.baseUrl+'getUserLike_And/'+id,
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
            // set color
          if(response == 0){
            this.setState({like:0 });
            this.setState({colorLike:'#ecf0f1' });
          }else{
            this.setState({idLike:response.id });
            this.setState({like:1 });
            this.setState({colorLike:'#F64747' });
          }

          this.countUserLike(id);
    }).catch((error) => {
      console.log(error);
    });
  }

  // aksi saat button love di klik
  _likeSekolah(d,s){

    if(s == 0){
      this.sukai(d);
    }
    if(s == 1){
      this.batalSuka(d);
    }

  }

  // batal menyukai sekolah
  batalSuka(d){
    fetch(g.baseUrl+'deleteUserLike/'+this.state.idLike, 
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

  // menyukai sekolah
  sukai(d){
    // send data like
    let formdata = new FormData();
    formdata.append("idSekolah", d);
    formdata.append("_token", this.state._token );

    fetch(g.baseUrl+'sendLike_And', {
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
          this.setState({idLike:response.id });
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

  // macam-macam rayon
  _rayon(d){
    if(d == 0){
      return 'Surabaya Barat';
    }else if (d == 1){
      return 'Surabaya Pusat';
    }else if (d == 2){
      return 'Surabaya Selatan';
    }else if (d == 3){
      return 'Surabaya Timur';
    }else if (d == 4){
      return 'Surabaya Utara';
    }
  }

  // untuk setting footer hidden atau visible
  setFooterHeight(d){
    if(d == 0){
      this.setState({toggleFooter: 1});
      this.setState({footerHeight: 50});
    }else{
      this.setState({toggleFooter: 0});
      this.setState({footerHeight: 0});
    }

    
  }

  // tampilan ui
  render() {
    const data = this.props.navigation.state.params; // terima parameter 
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
            <Title> Detail </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this._likeSekolah(data.id ,this.state.like)}
            >
              <Icon 
                name='heart' 
                style={{color:this.state.colorLike}}
              />
            </Button>
            <Button transparent
              onPress={() => this.setFooterHeight(this.state.toggleFooter)}
            >
              <Icon 
                name='bookmark' 
                style={{color:'#ecf0f1'}}
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
                  source={{uri: g.baseUrl+'img/sekolah/'+data.foto}} 
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
        <Footer style={{height:this.state.footerHeight}}>
          <FooterTab>
            <Button badge vertical
              onPress={() => this.props.navigation.navigate('KomentarSekolah',data)}
            >
              <Badge><Text>{this.state.countKomentar}</Text></Badge>
              <Icon name="chatbubbles" />
            </Button>
            <Button badge vertical 
              onPress={() => this.props.navigation.navigate('LikeSekolah',data)}
            >
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

