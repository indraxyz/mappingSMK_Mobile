import React, { Component } from 'react';
import {
  View, ScrollView, Alert, DatePickerAndroid
} from 'react-native';
import { 
  Header, Body, Title, Text, Left, Button, Icon, Container, Content, Thumbnail, Right,
  Form,Item, Input, Label, Badge, ActionSheet, Toast
} from 'native-base';
import TimerMixin from 'react-timer-mixin';
import styles from '../config/styles';
import g from '../config/global';

const id = '';
const data ='';

var BUTTONS = [
  'Perempuan',
  'Laki-laki',
];

class EditMyAkun extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      
    };
  }

  // dijalankan sebelum ui dirender
  componentWillMount(){
    this.getToken();
  }

  // ambil token dari web API
  getToken(){
    fetch(g.baseUrl+'getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ _token:responseJson });

        id = this.props.navigation.state.params;
        this.getMyAkun(id);
    }).catch((error) => {
      console.error(error);
    });
  }

  // ambil data MyAkun
  getMyAkun(d){
    fetch(g.baseUrl+'myUserAkun/'+d,
      {method: 'GET'})
      .then((response) => response.json())
      .then((response) => {
        this.setState({key: response.id});
        this.setState({id: response.id});
        this.setState({password: response.password});
        this.setState({email: response.email});
        this.setState({nama: response.nama});
        this.setState({nik: response.nik});
        this.setState({tempat_lahir: response.tempat_lahir});
        this.setState({tgl_lahir: response.tgl_lahir});
        this.setState({kelamin: response.kelamin});
        this._vKelamin(response.kelamin);
        this.setState({pekerjaan: response.pekerjaan});
        this.setState({alamat_lengkap: response.alamat_lengkap});
        this.setState({tlp: response.tlp});
    }).catch((error) => {
      console.error(error);
    });
  }

  // update akun
  _updateAKun(){
    // set data
    // Alert.alert('update')
    let formdata = new FormData();
    formdata.append("_token", this.state._token );
    formdata.append("id", this.state.id);
    formdata.append("password", this.state.password);
    formdata.append("email", this.state.email );
    formdata.append("nama", this.state.nama );
    formdata.append("nik", this.state.nik );
    formdata.append("tempat_lahir", this.state.tempat_lahir );
    formdata.append("tgl_lahir", this.state.tgl_lahir);
    formdata.append("kelamin", this.state.kelamin );
    formdata.append("pekerjaan", this.state.pekerjaan );
    formdata.append("alamat_lengkap", this.state.alamat_lengkap );
    formdata.append("tlp", this.state.tlp );
    formdata.append("key", this.state.key );

    // send data
    fetch(g.baseUrl+'updateUser_And', {
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
        console.log(response);
        if(response == 2){
          Toast.show({
              text: 'Coba Username Lain',
              position: 'bottom',
              duration: 3000
            })
        }else if(response == 0){
          Toast.show({
              text: 'Wrong Content',
              position: 'bottom',
              duration: 3000
            })
        }else{
          Toast.show({
              text: 'Save success',
              position: 'bottom',
              duration: 3000
            })

          TimerMixin.setTimeout( () => { 
            this.props.navigation.navigate('MyAkun');
          }, 4000);
        }
    }).catch((error) => {
      console.error(error);
    });
  }

  // date picker
  _openDatePicker = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {

      } 
      if(action == DatePickerAndroid.dateSetAction){
        var d = year+'-'+(month+1)+'-'+day;
        this.setState({ tgl_lahir: d });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  // pilihan jenis kelamin
  _kelamin(){
    ActionSheet.show(
    {
      options: BUTTONS,
      title: 'Pilih Jenis Kelamin'
    },
      (kelamin) => {
        this.setState({ kelamin: kelamin });
        this._vKelamin(kelamin);
      }
    )
  }

  // ui jenis kelamin
  _vKelamin(d){
    if (d == 1){
      this.setState({ vKelamin: 'Laki-laki' });
    }else{
      this.setState({ vKelamin: 'Perempuan' });
    }
  }

  // navigasi
  goBack(){
    this.props.navigation.navigate('MyAkun');
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
            <Title> Edit Akun </Title>
          </Body>
          <Right>
            <Button transparent
              onPress={() => this._updateAKun()}
            >
              <Icon name='checkmark' />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            <Item stackedLabel >
              <Label>Username</Label>
              <Input
                value = {this.state.id}
                onChangeText={(v) => this.setState({id:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>Password</Label>
              <Input
              value = {this.state.password}
              onChangeText={(v) => this.setState({password:v})}
              />
            </Item>

            <Item stackedLabel>
              <Label>Email</Label>
              <Input 
                value = {this.state.email}
                onChangeText={(v) => this.setState({email:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>Nama</Label>
              <Input
                value = {this.state.nama}
                onChangeText={(v) => this.setState({nama:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>NIK atau Nomor Siswa</Label>
              <Input
                value = {this.state.nik}
                onChangeText={(v) => this.setState({nik:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>Kota Lahir</Label>
              <Input
                value = {this.state.tempat_lahir}
                onChangeText={(v) => this.setState({tempat_lahir:v})}
              />
            </Item>

            <Badge success
             style={styles.picker}
            >
              <Text
                onPress={this._openDatePicker}
              >  
                Tanggal Lahir
              </Text>
            </Badge>
            <Text 
             style={styles.picker}
            >
              {this.state.tgl_lahir}
            </Text>

            <Badge 
             success
             style={styles.picker}
            >
              <Text
                onPress={() => this._kelamin()}
              >  Kelamin</Text>
            </Badge>            
            <Text 
             style={styles.picker}
            >{this.state.vKelamin}</Text>

            <Item stackedLabel >
              <Label>Pekerjaan</Label>
              <Input
                value = {this.state.pekerjaan}
                onChangeText={(v) => this.setState({pekerjaan:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>Alamat Lengkap</Label>
              <Input
                value = {this.state.alamat_lengkap}
                onChangeText={(v) => this.setState({alamat_lengkap:v})}
              />
            </Item>

            <Item stackedLabel >
              <Label>Tlp.</Label>
              <Input
                value = {this.state.tlp}
                onChangeText={(v) => this.setState({tlp:v})}
              />
            </Item>

          </Form>  
        </Content>
      </Container>
    );
  }
}

export default EditMyAkun;
