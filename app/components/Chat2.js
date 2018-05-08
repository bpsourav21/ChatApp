import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client/dist/socket.io'; //'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const USER_ID = '@userId';
const USER = "@user"

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: false,
      isLoadingEarlier: false,
      typingText: " ",
      userId: null,
      user: { _id: null, 
        name: "mahadi hasan", 
        avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" }
    };

    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.renderFooter = this.renderFooter.bind(this);

    this.socket = SocketIOClient('http://192.168.0.105:3000');
    this.socket.on('message', this.onReceivedMessage);
    this.socket.on('typingOn', this.typingOn);
    this.determineUser();
  }

  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
   * Set the userId to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER)
      .then((user) => {
        console.log("-------user id--------")
        console.log(user)
        // If there isn't a stored userId, then fetch one from the server.
        if (!user) {
          console.log("-------if-------")
          console.log(user)
          this.socket.emit('userJoined', this.state.user);
          this.socket.on('userJoined', (user) => {
            console.log("socket.on field")
            console.log(user)
            AsyncStorage.setItem(USER, JSON.stringify(user));
            this.setState({ user });
          });
          console.log("------- after emit user id--------")
          console.log(user)
        } else {
          console.log("-------else-------")
          console.log(JSON.parse(user))
          var user = JSON.parse(user)
          this.socket.emit('userJoined', user);
          this.setState({ user });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    this._storeMessages(messages);
  }
  // Helper functions
  _storeMessages(messages) {
    console.log("-----------------store messages------------")
    console.log(messages)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }
  //-----------------------------------------------------------------------------------------------------------------
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={{  marginTop: 5, marginLeft: 10,  marginRight: 10, marginBottom: 10}}>
          <Text style={{  fontSize: 14, color: "red"}}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return "";
  }
 typingOn(){
  console.log("rendering typing")
 }
  render() {
    // var user = { _id: this.state.userId, name: "mahadi" };
    // console.log(this.state.userId)

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={this.state.user}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        renderFooter={this.renderFooter}
      />
    );
  }
}

export default Chat
