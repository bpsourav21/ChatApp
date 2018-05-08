import React, { Component } from 'react';
import { Platform, AppRegistry, View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StackNavigator, navigation } from 'react-navigation';
import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';


export default class ChatHistory extends React.Component {
    static navigationOptions = {
        
    };
  state = {
    messages: [],
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        user={{
          _id: 1,
        }}
      />
    );
  }

}