import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'
import Main from '../components/Main';
import Chat from '../components/Chat';

const RootNavigator = StackNavigator({
    Home: {
      screen: Main,
      navigationOptions:
        { header: null }
    },
    Main: {
      screen: Chat,
      navigationOptions:
        { title: "Chat" }
    },
  }, {
      initialRouteName: "Home",
      navigationOptions: {
  
        headerStyle: {
          backgroundColor: '#871f78',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          textAlign:"center",
          alignSelf: 'center',
          fontWeight: 'bold',
          fontFamily: 'Roboto',
          color: '#fff',
        },
        //  headerLeft: (<View><Text>Back</Text></View>),
        headerRight: (<View></View>)
      }
    }
  );
  
  export default RootNavigator