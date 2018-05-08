import React, { Component } from 'react';
import { AppRegistry, View, ScrollView, StyleSheet, Text, Image } from 'react-native';
import { FormLabel, FormInput, Button, FormValidationMessage, Avatar, Card} from 'react-native-elements';
//variables
import { Colors, Fonts } from '../constants';

export default class History extends Component {
    static navigationOptions = {
        title: 'History',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View  style={styles.container}>
                <ScrollView >
                <View style={styles.histContainer}>
                    
                    <Card
                        title='Date: 12-12-12'
                        >
                        
                        <View style={{flexDirection: "row"}}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg" }}
                            />

                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
                            />
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }}
                            />
                        </View>
                        <Text style={{ marginBottom: 10, marginTop: 10 }}>
                            Banani to Dhanmondi
                        </Text>
                        <Button
                            icon={{ name: 'code' }}
                            backgroundColor={Colors.button_color}
                            fontFamily='Lato'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Chat History' 
                            onPress={() => navigate('ChatHistory')} />
                            
                    </Card>

                    <Card
                        title='Date: 13-13-13'
                        >
                        
                        <View style={{flexDirection: "row"}}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg" }}
                            />

                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
                            />
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg" }}
                            />
                        </View>
                        <Text style={{ marginBottom: 10, marginTop: 10 }}>
                            Banani to Dhanmondi
                        </Text>
                        <Button
                            icon={{ name: 'code' }}
                              backgroundColor={Colors.button_color}
                            fontFamily='Lato'
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Chat History' 
                            onPress={() => navigate('ChatHistory')} />
                    </Card>
                </View>
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.content_bg_color
    },
    histContainer: {
        //backgroundColor: '#ccc',
        paddingBottom: 30
    },
    image:{
        width: 80,
        height: 80,
        margin: 11
    }
})
