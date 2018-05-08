import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


//var importing
import { Colors, Fonts } from '../constants';
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome To CHATAPP !!!</Text>
                <FormLabel>Mobile Number</FormLabel>
                <FormInput
                    keyboardType={"phone-pad"} />
                <Button
                    //raised
                    //icon={{name: 'home', size: 32}}
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ textAlign: 'center' }}
                    onPress={() => this.props.navigation.navigate('Main')}
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
    },
    text:{
        fontSize: 30,
        textAlign:"center",
        color:"#FFF",
        marginBottom:40
    }
});

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Main);
