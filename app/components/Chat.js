import React, { Component } from 'react';
import { Platform, AppRegistry, View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
// import { StackNavigator, navigation } from 'react-navigation';
import { GiftedChat, Actions, Bubble, Send, LoadEarlier, InputToolbar, Time, MessageText } from 'react-native-gifted-chat';
//component fetching
// import CustomActions from './CustomActions';
// import CustomView from './CustomView';
//variabes
import { Colors, Fonts } from '../constants';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            loadEarlier: true,
            typingText: null,
            isLoadingEarlier: false,
        };
        this._isMounted = false;
        this.onSend = this.onSend.bind(this);
        this.onReceive = this.onReceive.bind(this);
        // this.renderCustomActions = this.renderCustomActions.bind(this);
        // this.renderCustomView = this.renderCustomView.bind(this);
        this.renderBubble = this.renderBubble.bind(this);
        this.renderMessageText = this.renderMessageText.bind(this)
        this.renderTime = this.renderTime.bind(this)
        this.renderSend = this.renderSend.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
        this.renderInputToolbar = this.renderInputToolbar.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this._isAlright = null;
    }
    //-----------------------------------------------------------------------------------------------------------------
    componentWillMount() {
        this._isMounted = true;
        this.setState(() => {
            return {
                messages: require('../data/messages.js'),
            };
        });
    }
    //-----------------------------------------------------------------------------------------------------------------
    componentWillUnmount() {
        this._isMounted = false;
    }
    //-----------------------------------------------------------------------------------------------------------------
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
    onSend(messages = []) {
        console.log("---------nmessages------------------")
        console.log(messages)

        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });

        // for demo purpose
        this.answerDemo(messages);
    }
    //-----------------------------------------------------------------------------------------------------------------
    answerDemo(messages) {
        if (messages.length > 0) {
            if ((messages[0].image || messages[0].location) || !this._isAlright) {
                this.setState((previousState) => {
                    return {
                        typingText: 'React Native is typing'
                    };
                });
            }
        }
        setTimeout(() => {
            if (this._isMounted === true) {
                if (messages.length > 0) {
                    if (messages[0].image) {
                        this.onReceive('Nice picture!');
                    } else if (messages[0].location) {
                        this.onReceive('My favorite place');
                    } else {
                        if (!this._isAlright) {
                            this._isAlright = true;
                            this.onReceive('Alright');
                        }
                    }
                }
            }

            this.setState((previousState) => {
                return {
                    typingText: null,
                };
            });
        }, 1000);
    }
    //-----------------------------------------------------------------------------------------------------------------
    onReceive(text) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: Math.round(Math.random() * 1000000),
                    text: text,
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        // avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                }),
            };
        });
    }
    //-----------------------------------------------------------------------------------------------------------------
    // renderCustomActions(props) {
    //     return (
    //         <CustomActions
    //             {...props}
    //         />
    //     );
    // }
    //-----------------------------------------------------------------------------------------------------------------
    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: Colors.chat_box_bubble_color,
                    },
                    right: {
                        backgroundColor: Colors.chat_box_bubble_color2,
                    }
                }}
                tickStyle={{
                    fontSize: 10,
                    backgroundColor: 'transparent',
                    color: Colors.tick_color,
                }}
            />
        );
    }
    //-----------------------------------------------------------------------------------------------------------------
    renderMessageText(props) {
        return (
            <MessageText
                {...props}
                textStyle={{
                    left: { color: Colors.chat_text_color1, fontSize: 16 },
                    right: { color: Colors.chat_text_color2, fontSize: 16, }
                }}
                linkStyle={{
                    left: { color: Colors.chat_link_color, fontSize: 16 },
                    right: { color: Colors.chat_link_color, fontSize: 16, }
                }}
            />
        );
    }
    //-----------------------------------------------------------------------------------------------------------------
    renderTime(props) {
        return (
            <Time
                {...props}
                textStyle={{
                    left: { color: Colors.chat_time_color, fontSize: 10 },
                    right: { color: Colors.chat_time_color, fontSize: 10, }
                }}
            />
        );
    }
    //-----------------------------------------------------------------------------------------------------------------
    renderSend(props) {
        return (
            <Send
                {...props}
                containerStyle={{ backgroundColor: "transparent" }}>
                <View>
                    <Icon
                        reverse
                        name='send'
                        size={16}
                        color={Colors.chat_field_send_color}
                    />
                </View>

            </Send>
        );
    }
    //-----------------------------------------------------------------------------------------------------------------
    renderLoadEarlier(props) {
        return (
            <LoadEarlier
                {...props}
                label={"Load Previous"}
                textStyle={{ color: Colors.chat_field_text_color }}
                wrapperStyle={{ backgroundColor: Colors.chat_field_color, height: 25 }} />
        );

    }
    //-----------------------------------------------------------------------------------------------------------------
    // renderCustomView(props) {
    //     return (
    //         <CustomView
    //             {...props}
    //         />
    //     );
    // }
    //-----------------------------------------------------------------------------------------------------------------
    renderFooter(props) {
        if (this.state.typingText) {
            return (
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>
                        {this.state.typingText}
                    </Text>
                </View>
            );
        }
        return null;
    }
    //-----------------------------------------------------------------------------------------------------------------
    renderInputToolbar(props) {
        return (
            <InputToolbar
                {...props}
                placeholderTextColor={Colors.chat_field_placeholder_color}
                textInputStyle={{ color: Colors.chat_field_text_color }}
                iconTextStyle={{ color: Colors.chat_field_text_color }}
                wrapperStyle={{ backgroundColor: "transparent", borderColor: Colors.chat_field_text_color }}
                primaryStyle={{ backgroundColor: Colors.chat_field_color, borderColor: "transparent" }}
            // icon={this.Icon.bind(this)}
            />
        );
    }
    //-----------------------------------------------------------------------------------------------------------------
    render() {
        return (
            <View style={styles.container}>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={this.onSend}
                    loadEarlier={this.state.loadEarlier}
                    onLoadEarlier={this.onLoadEarlier}
                    isLoadingEarlier={this.state.isLoadingEarlier}

                    user={{
                        _id: 1, // sent messages should have same user._id
                    }}
                    renderActions={this.renderCustomActions}
                    renderBubble={this.renderBubble}
                    renderMessageText={this.renderMessageText}
                    renderTime={this.renderTime}
                    renderSend={this.renderSend}
                    renderLoadEarlier={this.renderLoadEarlier}
                    renderCustomView={this.renderCustomView}
                    renderFooter={this.renderFooter}
                    renderInputToolbar={this.renderInputToolbar}
                />
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
    footerContainer: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    footerText: {
        fontSize: 14,
        color: Colors.chat_time_color,
    },

});