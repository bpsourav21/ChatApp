import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View, ScrollView, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage } from 'react-native-elements';
import { bindActionCreators } from 'redux';

//action importing
import { login } from '../actions/nav'
//variables
import { Colors, Fonts } from '../constants';


class MobileVar extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <FormLabel>Mobile Varification</FormLabel>
                <FormInput
                    keyboardType={"phone-pad"} />

                <Button
                    // icon={{ name: 'home', size: 32 }}
                    buttonStyle={styles.buttonStyle}
                    textStyle={{ textAlign: 'center' }}
                    onPress={() => this.props.dispatch(login())}
                    title={`Confirm`} />
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

export default connect(mapStateToProps)(MobileVar);