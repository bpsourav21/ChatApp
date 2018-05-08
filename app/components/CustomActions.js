import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewPropTypes,
  Text,
  BackHandler,
  Dimensions,
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import CameraRollPicker from 'react-native-camera-roll-picker';
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import { customLocation } from '../actions/location';
import { setInitialMarker, setFinalMarker, searchOptionInit } from '../actions/map';





const { width, height } = Dimensions.get('window')
const aspect_ratio = width / height
const Latitude_Delta = 0.0922
const Longitude_Delta = Latitude_Delta * aspect_ratio

class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      modalVisible: false,
      cLModalVisible: false,
    };
    this.onActionsPress = this.onActionsPress.bind(this);
    this.selectImages = this.selectImages.bind(this);
  }

  //===============================================================================================================
  setImages(images) {
    this._images = images;
  }

  getImages() {
    return this._images;
  }

  setModalVisible(visible = false) {
    this.setState({ modalVisible: visible });
  }

  customLocationModal(visible = false) {
      // this function show map modal
      this.setState({ cLModalVisible: visible });
  }

  //===============================================================================================================
  onActionsPress() {
    const options = ['Choose From Library', 'Send Location', 'Send Custom Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            this.setModalVisible(true);
            break;
          case 1:
          this.props.onSend({
            location: {
              latitude: this.props.initialPosition.latitude,
              longitude: this.props.initialPosition.longitude,
            },
          });
            break;

          case 2:
            this.customLocationModal(true);
            break;
          default:
        }
      });
  }
  //===============================================================================================================

  selectImages(images) {
    this.setImages(images);
  }

  //===============================================================================================================
  renderNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.setModalVisible(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>
        <NavTitle style={{
          color: '#000',
        }}>
          {'Camera Roll'}
        </NavTitle>
        <NavButton onPress={() => {
          this.setModalVisible(false);

          const images = this.getImages().map((image) => {
            return {
              image: image.uri,
            };
          });
          this.props.onSend(images);
          this.setImages([]);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Send'}
          </NavButtonText>
        </NavButton>
      </NavBar>
    );
  }
  //===============================================================================================================

  customMapNavBar() {
    return (
      <NavBar style={{
        statusBar: {
          backgroundColor: '#FFF',
        },
        navBar: {
          backgroundColor: '#FFF',
        },
      }}>
        <NavButton onPress={() => {
          this.customLocationModal(false);
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Cancel'}
          </NavButtonText>
        </NavButton>

        <NavButton onPress={() => {
          this.customLocationModal(false);

          this.props.onSend({
            location: {
              latitude: this.props.customLocation.latitude,
              longitude: this.props.customLocation.longitude,
            },
          });
        }}>
          <NavButtonText style={{
            color: '#000',
          }}>
            {'Send'}
          </NavButtonText>
        </NavButton>

      </NavBar>
    );
  }
  //===============================================================================================================

  renderIcon() {
    if (this.props.icon) {
      return this.props.icon();
    }
    return (
      <View
        style={[styles.wrapper, this.props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, this.props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }
  //===============================================================================================================

  render() {
    console.log('this.props.customLocation');
    console.log(this.props.customLocation);
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={this.onActionsPress}
      >



        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          {this.renderNavBar()}
          <CameraRollPicker
            maximum={10}
            imagesPerRow={4}
            callback={this.selectImages}
            selected={[]}
          />
        </Modal>






        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.cLModalVisible}
          onRequestClose={() => {
            this.customLocationModal(false);
          }}
        >

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: this.props.initialPosition.latitude,
              longitude: this.props.initialPosition.longitude,
              latitudeDelta: Latitude_Delta,
              longitudeDelta: Longitude_Delta
            }}

            zoomEnabled={true}
            minZoomLevel={18}
            maxZoomLevel={25}
            showsMyLocationButton={true}
            showsUserLocation={true}
            loadingEnabled={true}
            rotateEnabled={false}
            moveOnMarkerPress={true}
            onPress={(e) => this.props.dispatch(customLocation(e.nativeEvent.coordinate))}
          >


            <MapView.Marker
              coordinate={this.props.initialPosition}
              pinColor={'red'}
              title={"My Location"}
            />
            <MapView.Marker
              coordinate={this.props.customLocation}
              pinColor={'green'}
              onDragEnd={(e) => this.props.dispatch(customLocation(e.nativeEvent.coordinate))}
              draggable
              title={"Custom Location"}
            />


          </MapView>




          {this.customMapNavBar()}
        </Modal>





        {this.renderIcon()}
      </TouchableOpacity>
    );
  }
}
//===============================================================================================================

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => { },
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  iconTextStyle: Text.propTypes.style,
};


const mapStateToProps = (state) => {
  return {
    initialPosition: state.map.initialPosition,
    customLocation: state.location.customLocation,
    finalPosition: state.map.finalPosition,

  };
};

export default connect(mapStateToProps)(CustomActions);