import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handle as handleError } from '../actions/error';
import generateMnemonic from '../crypto/generateMnemonic';
import Title from '../components/Title';
import Paragraph from '../components/Paragraph';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Link from '../components/Link';
import BaseScreen from './BaseScreen';

const windowDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  title: {
    marginBottom: windowDimensions.height < 600 ? 10 : 20
  },
  paragraph: {
    textAlign: 'center'
  },
  button: {
    marginBottom: 10
  }
});

@connect()
export default class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  _showMnemonicScreen(mnemonic) {
    const navigation = this.props.navigation;
    navigation.navigate('Mnemonic', { mnemonic });
  }

  _createKey() {
    const dispatch = this.props.dispatch;

    return generateMnemonic()
      .then((mnemonic) => {
        this._showMnemonicScreen(mnemonic);
      })
      .catch((error) => {
        dispatch(handleError(error));
      });
  }

  _importKey() {
    const navigation = this.props.navigation;
    navigation.navigate('ImportMnemonic');
  }

  render() {
    return (
      <BaseScreen>
        <Title style={styles.title}>
          Welcome to Payla
        </Title>

        <Paragraph style={styles.paragraph}>
          One secure key for all your bitcoin wallets and services.
        </Paragraph>

        <Footer>
          <Button
            label='Create a new key'
            loadingLabel='Creating key...'
            onPress={this._createKey.bind(this)}
            style={styles.button}
          />

          <Link onPress={this._importKey.bind(this)}>
            Or import an existing Payla key
          </Link>
        </Footer>
      </BaseScreen>
    );
  }
}

WelcomeScreen.propTypes = {
  dispatch: PropTypes.func,
  navigation: PropTypes.any
};