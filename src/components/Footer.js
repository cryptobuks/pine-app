import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  footer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
    left: 40,
    right: 40,
    paddingBottom: ifIphoneX(20, 30)
  },
  withToolbar: {
    marginBottom: 90
  }
});

export default class Footer extends Component {
  render() {
    const toolbarStyles = [
      styles.footer,
      this.props.hasToolbar ? styles.withToolbar : null,
      this.props.style
    ];

    return (
      <View style={toolbarStyles} pointerEvents={this.props.pointerEvents}>
        {this.props.children}
      </View>
    );
  }
}

Footer.propTypes = {
  style: PropTypes.any,
  pointerEvents: PropTypes.string,
  children: PropTypes.node,
  hasToolbar: PropTypes.bool
};
