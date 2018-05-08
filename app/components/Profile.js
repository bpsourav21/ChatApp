import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Dimensions, StyleSheet, Image, Picker, ScrollView } from 'react-native'
import { Text, FormLabel, FormInput, Button, FormValidationMessage, Avatar, Badge, Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker'
//action importing
import { updateProfileInfo } from '../actions/profile'
//variables
import { Colors, Fonts } from '../constants';
const { width, height } = Dimensions.get('window')
var image_url = "http://www.freeiconspng.com/uploads/profile-icon-9.png"

var options = {
    title: 'Change Avatar',
    customButtons: [
        { name: 'fb', title: 'Choose Photo from Facebook' },
        { name: 'wp', title: 'Choose Photo from Whatsapp' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: { uri: image_url },
            name: "Sourav",
            phone: "",
            email: "",
            gender: "Male",
        }
    }
    //==========================================================================================================
    updateAvatar() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    updateInfoField() {
        var profileObj = {}
        profileObj["name"] = this.state.name
        profileObj["phone"] = this.state.phone
        profileObj["email"] = this.state.email
        profileObj["gender"] = this.state.gender
        profileObj["avatarSource"] = this.state.avatarSource
        console.log(profileObj)
        this.props.dispatch(updateProfileInfo(profileObj))
    }
    //===============================================================================================================
    updateGender(gender) {
        this.setState({ gender: gender })
    }
    static navigationOptions = {
        title: 'Profile',
    };
    render() {
        console.log(image_url)
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.avatarStyles}>
                        <Avatar
                            //xlarge
                            rounded
                            //title="CR"
                            //icon={{ name: 'home' }}
                            width={100}
                            height={100}
                            source={this.state.avatarSource}
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                        <Icon
                            reverse
                            name='photo-camera'
                            size={16}
                            color='#007fa4'
                            onPress={() => this.updateAvatar()}
                            onLongPress={() => { console.log('double pressed') }}
                            containerStyle={styles.badgeStyles}
                        />
                    </View>
                    <View>
                        <FormLabel >Full Name</FormLabel>
                        <FormInput
                            keyboardType={"default"}
                            placeholder="Full Name"
                            defaultValue={this.state.name}
                            inputStyle={styles.textStyles}
                            onChange={(e) => this.setState({ name: e.nativeEvent.text })}
                        />
                    </View>
                    <View>
                        <FormLabel>Phone Number</FormLabel>
                        <FormInput
                            keyboardType={"phone-pad"}
                            defaultValue={this.state.phone}
                            inputStyle={styles.textStyles}
                            onChange={(e) => this.setState({ phone: e.nativeEvent.text })}
                            focus={true}
                        />
                    </View>
                    <View>
                        <FormLabel>Email ID</FormLabel>
                        <FormInput
                            keyboardType={"default"}
                            defaultValue={this.state.email}
                            inputStyle={styles.textStyles}
                            onChange={(e) => this.setState({ email: e.nativeEvent.text })}
                        />
                    </View>
                    <View>
                        <FormLabel>Gender</FormLabel>
                        <Picker
                            selectedValue={this.state.gender}
                            defaultValue={this.state.gender}
                            onValueChange={(gender) => this.updateGender(gender)}
                            style={styles.genderStyles}>
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Others" value="Others" />
                        </Picker>
                    </View>
                    <View style={styles.itemsButtonDiv}>
                        <Button
                            buttonStyle={styles.itemsButton}
                            textStyle={{ textAlign: 'center' }}
                            onPress={() => this.updateInfoField()}
                            title={`Save`} />
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
    scrollContent: {
        paddingVertical: 20,
        // backgroundColor: '#fff',
    },
    avatarStyles: {
        alignItems: "center",
        marginTop: 10,
    },
    badgeStyles:
    {
        marginTop: -40,
        marginLeft: 90,
        borderColor: "#fff",
        borderWidth: 3
    },
    textStyles: {
        color: '#000',
        //fontWeight: 'bold',
        fontSize: 16,
    },
    genderStyles: {
        alignItems: "center",
        borderColor: "black",
        borderWidth: 6,
        color: "#fff",
        //backgroundColor:'blue',
        // width: '90%'
        marginLeft: 15,
        marginRight: 15
    },
    itemsButtonDiv: {
        alignItems: "center",
        top: 15
    },
    itemsButton: {
        backgroundColor: Colors.button_color,
        borderRadius: 10,
        width: 300,
        // bottom: 50,
        // position: "absolute",
    }
});
const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Profile);
