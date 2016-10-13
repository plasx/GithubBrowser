'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';

class Login extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.logo} source={require('image!slice4')} />
        <Text stlye={styles.heading}>GithubBrowser</Text>
        <TextInput style={styles.input} placeholder="Github username" />
        <TextInput style={styles.input} placeholder="Github password" secureTextEntry={true}/>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop:40,
    alignItems: 'center',
    padding:10
  },
  logo: {
    width:66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop:10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  }
});
module.exports = Login;
