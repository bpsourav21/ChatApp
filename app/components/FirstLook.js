import React, { Component } from 'react';
import { AppRegistry, View, ScrollView  } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { StackNavigator, navigation } from 'react-navigation';

export default class FirstLook extends Component {
    static navigationOptions = {
        title: 'Welcome',
    };


  render() {
    const { navigate } = this.props.navigation;
    return (
        <ScrollView>
            <View>
                <Text h1>Welcome To LetsGO !!!</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Lucy"
                />
            </View>
        </ScrollView>
    );
  }
}


