import React, { Component } from 'react';
import { StyleSheet, View, ActionSheetIOS } from 'react-native';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import Paragraph from '../Paragraph';
import SmallButton from '../buttons/SmallButton';
import Link from '../Link';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 20
  },
  paragraph: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
    paddingTop: 20,
    maxWidth: 300
  },
  ignore: {
    paddingTop: 0,
    marginTop: 20
  },
  delete: {
    paddingTop: 0
  },
  destructiveLabel: {
    color: '#FF3B30'
  }
});

export default class ContactRequest extends Component {
  constructor() {
    super(...arguments);

    this._confirmIgnore = this._confirmIgnore.bind(this);
    this._confirmDelete = this._confirmDelete.bind(this);
  }

  _confirmIgnore() {
    const { contact } = this.props;

    return new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions({
        title: `Ignore contact request from ${contact.contactRequest.from}?`,
        options: ['Cancel', 'Ignore'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          return resolve(); // Cancel
        }

        this.props.onIgnore().finally(resolve);
      });
    });
  }

  _confirmDelete() {
    const { contact } = this.props;

    return new Promise((resolve) => {
      ActionSheetIOS.showActionSheetWithOptions({
        title: `Delete contact request to ${contact.address}?`,
        options: ['Cancel', 'Delete'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0
      }, (buttonIndex) => {
        if (buttonIndex === 0) {
          return resolve(); // Cancel
        }

        this.props.onDelete().finally(resolve);
      });
    });
  }

  _renderAvatar() {
    const { contact } = this.props;
    const avatarChecksum = contact.avatar ? contact.avatar.checksum : null;

    return (
      <Avatar
        pineAddress={contact.address}
        checksum={avatarChecksum}
        size={60}
      />
    );
  }

  _renderIncoming() {
    const { contact } = this.props;

    return (
      <View style={styles.wrapper}>
        {this._renderAvatar()}

        <Paragraph style={styles.paragraph}>
          {contact.address} wants to add you as a contact.
        </Paragraph>

        <SmallButton label='Accept' onPress={this.props.onAccept} showLoader={true} />

        <Link
          onPress={this._confirmIgnore}
          style={styles.ignore}
          labelStyle={styles.destructiveLabel}
          showLoader={true}
          loaderHidingDelay={0}
        >
          Ignore
        </Link>
      </View>
    );
  }

  _renderOutgoing() {
    const { contact } = this.props;

    return (
      <View style={styles.wrapper}>
        {this._renderAvatar()}

        <Paragraph style={styles.paragraph}>
          Waiting for {contact.address} to respond to
          your contact request.
        </Paragraph>

        <Link
          onPress={this._confirmDelete}
          style={styles.delete}
          labelStyle={styles.destructiveLabel}
          showLoader={true}
          loaderHidingDelay={0}
        >
          Delete
        </Link>
      </View>
    );
  }

  render() {
    const { contact, userProfile } = this.props;

    if (!contact.contactRequest) {
      return null;
    }

    if (contact.contactRequest.from === userProfile.address) {
      return this._renderOutgoing();
    }

    return this._renderIncoming();
  }
}

ContactRequest.propTypes = {
  contact: PropTypes.object.isRequired,
  userProfile: PropTypes.object,
  onAccept: PropTypes.func,
  onIgnore: PropTypes.func,
  onDelete: PropTypes.func
};
