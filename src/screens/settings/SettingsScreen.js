import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import headerStyles from '../../styles/headerStyles';
import DoneButton from '../../components/DoneButton';
import SettingsGroup from '../../components/SettingsGroup';
import SettingsLink from '../../components/SettingsLink';
import SettingsUserLink from '../../components/SettingsUserLink';
import BaseSettingsScreen from './BaseSettingsScreen';

@connect((state) => ({
  settings: state.settings
}))
export default class SettingsScreen extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: 'Settings',
    headerStyle: headerStyles.header,
    headerTitleStyle: headerStyles.title,
    headerBackTitle: null,
    headerRight: (<DoneButton onPress={screenProps.dismiss} />)
  });

  _showProfile() {
    const navigation = this.props.navigation;
    navigation.navigate('Profile');
  }

  _showGeneralSettings() {
    const navigation = this.props.navigation;
    navigation.navigate('GeneralSettings');
  }

  _showSecurityAndPrivacySettings() {
    const navigation = this.props.navigation;
    navigation.navigate('SecurityAndPrivacySettings');
  }

  _showBitcoinSettings() {
    const navigation = this.props.navigation;
    navigation.navigate('BitcoinSettings');
  }

  render() {
    const userProfile = this.props.settings.user.profile;

    return (
      <BaseSettingsScreen>
        <SettingsGroup>
          <SettingsUserLink user={userProfile} onPress={this._showProfile.bind(this)} />
        </SettingsGroup>

        <SettingsGroup>
          <SettingsLink icon={SettingsLink.ICON_GEAR} name='General' onPress={this._showGeneralSettings.bind(this)} />
          <SettingsLink icon={SettingsLink.ICON_LOCK} name='Security and Privacy' onPress={this._showSecurityAndPrivacySettings.bind(this)} />
          <SettingsLink icon={SettingsLink.ICON_BITCOIN} name='Bitcoin' onPress={this._showBitcoinSettings.bind(this)} isLastItem={true} />
        </SettingsGroup>
      </BaseSettingsScreen>
    );
  }
}

SettingsScreen.propTypes = {
  settings: PropTypes.object,
  screenProps: PropTypes.object,
  dispatch: PropTypes.func,
  navigation: PropTypes.any
};
