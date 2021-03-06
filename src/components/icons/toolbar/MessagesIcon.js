import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';

const IMAGE_DEFAULT = require('../../../images/icons/toolbar/Messages.png');
const IMAGE_WHITE = require('../../../images/icons/toolbar/MessagesWhite.png');

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50
  }
});

export default class MessagesIcon extends Component {
  render() {
    const image = this.props.white ? IMAGE_WHITE : IMAGE_DEFAULT;

    return (
      <View style={this.props.style}>
        <Image source={image} style={styles.icon} />
      </View>
    );
  }
}

MessagesIcon.propTypes = {
  style: PropTypes.any,
  white: PropTypes.bool
};
