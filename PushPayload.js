'use strict';
import moment from 'moment';
import React, { Component } from 'react';
import {
  Text,
  View,
  ListView,
  Image
} from 'react-native';


class PushPayload extends Component{
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    });
    this.state = {
      dataSource: ds
    };
  }

  render(){
    return(
      <View style={{flex:1, paddingTop: 80, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>HALO</Text>
      </View>
    );
  }
}

module.exports = PushPayload;
