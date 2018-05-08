import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider, connect } from 'react-redux';
import store from './store/store.js'
import RootNavigator from './navigator/RootNavigator'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
export default App