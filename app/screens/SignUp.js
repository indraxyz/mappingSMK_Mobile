import React, { Component } from 'react';
import {
  View, ScrollView,
  Alert, DatePickerAndroid, BackHandler
} from 'react-native';
import { 
  Container, Content, Card, CardItem, Body, Text, Form, Item, Input, Label,
  Button, ActionSheet, Badge, Toast
} from 'native-base';
import styles from '../config/styles';
import TimerMixin from 'react-timer-mixin';
import g from '../config/global';

var BUTTONS = [
  'Perempuan',
  'Laki-laki',
];

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      date:'',
      kelamin:'',
      vKelamin:'',
      vTglLahir:'',
      id:'',
      password:'',
      email:'',
      nama:'',
      nik:'',
      tempat_lahir:'',
      tgl_lahir:'',
      kelamin:'',
      pekerjaan:'',
      alamat_lengkap:'',
      tlp:'',
    };
 
  }

  // dijalankan sbelum ui dirender
  componentWillMount() {
    // get token
    fetch(g.baseUrl+'getToken',
      {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ _token:responseJson })
    }).catch((error) => {
      console.error(error);
    });
  }

  // sign up
  signUp(){
    // set data
    let formdata = new FormData();
    formdata.append("_token", this.state._token );
    formdata.append("id", this.state.id);
    formdata.append("password", this.state.password);
    formdata.append("email", this.state.email );
    formdata.append("nama", this.state.nama );
    formdata.append("nik", this.state.nik );
    formdata.append("tempat_lahir", this.state.tempat_lahir );
    formdata.append("tgl_lahir", this.state.vTglLahir );
    formdata.append("kelamin", this.state.kelamin );
    formdata.append("pekerjaan", this.state.pekerjaan );
    formdata.append("alamat_lengkap", this.state.alamat_lengkap );
    formdata.append("tlp", this.state.tlp );

    fetch(g.baseUrl+'saveNewUser_And', {
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
            this.props.navigation.navigate('Login');
          }, 4000);
        }
    }).catch((error) => {
      console.log(error);
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
        this.setState({ vTglLahir: d });
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  };

  // ui kelamin
  _kelamin(){
    ActionSheet.show(
    {
      options: BUTTONS,
      title: 'Pilih Jenis Kelamin'
    },
      (kelamin) => {
        this.setState({ kelamin: kelamin });
        if (kelamin == 1){
          this.setState({ vKelamin: 'Laki-laki' });
        }else{
          this.setState({ vKelamin: 'Perempuan' });
        }
      }
    )
  }

  // render ui
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form>
            <Item underline style={styles.formSignUp}>
              <Input placeholder="Username" 
                value = {this.state.id}
                onChangeText={(v) => this.setState({id:v})}
              />
            </Item>

            <Item underline >
              <Input 
                placeholder="Password" 
                value = {this.state.password}
                onChangeText={(v) => this.setState({password:v})}
              />
            </Item>
            
            <Item underline >
              <Input placeholder="Email" 
                value = {this.state.email}
                onChangeText={(v) => this.setState({email:v})}
              />
            </Item>

            <Item underline >
              <Input placeholder="Nama Lengkap" 
                value = {this.state.nama}
                onChangeText={(v) => this.setState({nama:v})}
              />
            </Item>

            <Item underline >
              <Input placeholder="NIK atau Nomor Siswa" 
                value = {this.state.nik}
                onChangeText={(v) => this.setState({nik:v})}
              />
            </Item>

            <Item underline >
              <Input placeholder="Kota Lahir" 
                value = {this.state.tempat_lahir}
                onChangeText={(v) => this.setState({tempat_lahir:v})}
              />
            </Item>

            <Badge 
             success
             style={styles.picker}
            >
              <Text
                onPress={this._openDatePicker}
              >  Tanggal Lahir</Text>
            </Badge>
            <Text 
             style={styles.picker}
            >{this.state.vTglLahir}</Text>

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

            <Item underline >
              <Input placeholder="Pekerjaan" 
                value = {this.state.pekerjaan}
                onChangeText={(v) => this.setState({pekerjaan:v})}
              />
            </Item>

            <Item underline >
              <Input placeholder="Alamat" 
                value = {this.state.alamat_lengkap}
                onChangeText={(v) => this.setState({alamat_lengkap:v})}
              />
            </Item>

            <Item underline >
              <Input placeholder="Telp." 
                value = {this.state.tlp}
                onChangeText={(v) => this.setState({tlp:v})}
              />
            </Item>

            <Button 
              block
              success 
              style={styles.button}
              onPress={() => this.signUp()}
            >
              <Text>Submit</Text>
            </Button>

          </Form>
        </Content>
      </Container>
    );
  }
}

export default SignUp;
