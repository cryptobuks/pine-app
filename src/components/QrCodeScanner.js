/* eslint-disable max-lines */
import React, { Component } from 'react';
import { StyleSheet, View, Image, Dimensions, Linking, Clipboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';

import getPaymentInfoFromString from '../crypto/bitcoin/getPaymentInfoFromString';
import { parse as parseAddress, getAddressFromUri } from '../pineApi/address';
import getStatusBarHeight from '../utils/getStatusBarHeight';
import ContentView from '../components/ContentView';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import VibrancyButton from '../components/VibrancyButton';
import Link from '../components/Link';

const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: WINDOW_HEIGHT,
    width: WINDOW_WIDTH,
    position: 'absolute',
    backgroundColor: '#000000'
  },
  topGradient: {
    alignSelf: 'stretch',
    position: 'absolute',
    top: 0,
    width: WINDOW_WIDTH,
    height: getStatusBarHeight() + 10
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  text: {
    maxWidth: 200,
    color: 'white',
    textAlign: 'center',
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -0.1, height: 0.1 },
    textShadowRadius: 1
  },
  viewport: {
    width: 212,
    height: 212
  }
});

export default class QrCodeScanner extends Component {
  state = {
    cameraReady: false
  }

  shouldComponentUpdate(nextProps) {
    if (!this.state.cameraReady) {
      return true;
    }

    if (nextProps.showPreview === this.props.showPreview) {
      return true;
    }

    if (nextProps.showPreview) {
      this._camera.resumePreview();
    } else {
      this._camera.pausePreview();
    }

    return false;
  }

  _onReceiveData(data, fromCamera) {
    if (!data || typeof data !== 'string') {
      return;
    }

    const { network, onReceiveAddress } = this.props;
    const pineAddress = getAddressFromUri(data);
    const paymentInfo = getPaymentInfoFromString(data, network);

    // Try to evaluate data as a BIP21 URI.
    if (paymentInfo) {
      return onReceiveAddress(pineAddress || paymentInfo.address, paymentInfo.amount, fromCamera);
    }

    // Try to evaluate data as a Pine address.
    try {
      parseAddress(data);
      return onReceiveAddress(data.trim(), fromCamera);
    } catch (error) {
      // Suppress error.
    }
  }

  _onPaste() {
    Clipboard.getString().then(this._onReceiveData.bind(this));
  }

  _onBarCodeRead({ data }) {
    const fromCamera = true;
    this._onReceiveData(data, fromCamera);
  }

  _goToAppSettings() {
    Linking.openURL('app-settings:');
  }

  _onCameraReady() {
    this.setState({
      cameraReady: true
    });

    /*
     * HACK: Pausing the camera preview just after it's ready sometimes
     * makes the app freeze for a few seconds. Adding a 1s timeout seems
     * to be fixing this.
     */
    setTimeout(() => {
      if (!this.props.showPreview) {
        this._camera.pausePreview();
      }
    }, 1000);
  }

  _renderViewport(cameraAuthorized) {
    if (cameraAuthorized) {
      return <Image source={require('../images/QRViewport.png')} style={styles.viewport} />;
    }

    return <Link onPress={this._goToAppSettings.bind(this)}>Enable Camera Access</Link>;
  }

  _renderButton(cameraAuthorized) {
    if (cameraAuthorized) {
      return <VibrancyButton label='Paste Address' onPress={this._onPaste.bind(this)} />;
    }

    return <Button label='Paste Address' onPress={this._onPaste.bind(this)} />;
  }

  _renderCameraContent(cameraAuthorized) {
    return (
      <View style={styles.view}>
        <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.0)']} style={styles.topGradient} />

        <ContentView hasToolbar={true} style={styles.content}>
          <Paragraph style={styles.text}>
            Scan a QR code or paste an address to send bitcoin.
          </Paragraph>

          { this._renderViewport(cameraAuthorized) }
          { this._renderButton(cameraAuthorized) }
        </ContentView>
      </View>
    );
  }

  _renderCameraNotAuthorized() {
    return this._renderCameraContent(false);
  }

  _renderCameraAuthorized() {
    if (!this.state.cameraReady) {
      return;
    }

    return this._renderCameraContent(true);
  }

  render() {
    return (
      <View style={styles.view}>
        <RNCamera
          ref={(ref) => {
            this._camera = ref;
          }}
          style={styles.camera}
          onCameraReady={this._onCameraReady.bind(this)}
          notAuthorizedView={this._renderCameraNotAuthorized()}
          pendingAuthorizationView={<View />}
          onBarCodeRead={this._onBarCodeRead.bind(this)}
          captureAudio={false}
        />
        { this._renderCameraAuthorized() }
      </View>
    );
  }
}

QrCodeScanner.propTypes = {
  onReceiveAddress: PropTypes.func.isRequired,
  showPreview: PropTypes.bool,
  network: PropTypes.string
};
