import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Alert
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, List, ListItem, Right,
  Form, Picker, Label, Item
} from 'native-base';
import styles from '../config/styles';
import g from '../config/global';

class ListSekolah extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      listSekolah: [],
      rayon: 'all',
    };
 
  }

  // dijalankan sebelum ui dirender
  componentWillMount() {
    this.getData('all');
  }

  // ambil data sekolah sesuai rayon
  getData(rayon) {
    fetch(g.baseUrl+'listSekolah/'+rayon,
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
      this.setState({data: responseJson});
      this.drawListSekolah();
    }).catch((error) => {
      console.error(error);
    });
  }

  // detail sekolah
  detailSekolah(d){
    this.props.navigation.navigate('DetailSekolah',d);
  }

  // render list sekolah
  drawListSekolah(){
    this.setState({listSekolah: []});
    this.state.data.map((d) => {
      this.state.listSekolah.push(
        <ListItem
          key={d.id}
          onPress={() => this.detailSekolah(d)}
        >
          <Text>{d.nama}</Text>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      );
      this.setState({listSekolah: this.state.listSekolah});
    });
  }

  // saat ubah rayon
  onRayonChange(d) {
    this.setState({
      rayon: d
    });
    this.getData(d);
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
            <Title> Sekolah </Title>
          </Body>
          <Right>

          </Right>
        </Header>
        <Picker
          mode="dropdown"
          placeholder="Select One"
          selectedValue={this.state.rayon}
          onValueChange={this.onRayonChange.bind(this)}
        >
          <Item label="Semua Wilayah" value="all" />
          <Item label="Surabaya Barat" value="0" />
          <Item label="Surabaya Pusat" value="1" />
          <Item label="Surabaya Selatan" value="2" />
          <Item label="Surabaya Timur" value="3" />
          <Item label="Surabaya Utara" value="4" />
        </Picker>
        <Content>          

          {this.state.listSekolah}

        </Content>
      </Container>
    );
  }
}

export default ListSekolah;