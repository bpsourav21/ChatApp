import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//component importing
import FirstLook from './FirstLook';
import MobileVar from './MobileVar';

//action importing
import { mobileVar } from '../actions/nav'

//var importing
import { Colors, Fonts } from '../constants';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLook: true
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text h4>Welcome To LetsGO !!!</Text>
                <FormLabel>Mobile Number</FormLabel>
                <FormInput
                    keyboardType={"phone-pad"} />
                <Button
                    //raised
                    //icon={{name: 'home', size: 32}}
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ textAlign: 'center' }}
                    onPress={(e) => this.props.dispatch(mobileVar())}
                    title={`Add Number`} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.content_bg_color
    },
    buttonStyle: {
        backgroundColor: Colors.button_color,
        borderRadius: 10,
        height: 50
    }
});

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Main);
