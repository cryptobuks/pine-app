import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import DateSectionList from '../DateSectionList';
import Message from './Message';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 16
  }
});

export default class Messages extends PureComponent {
  constructor() {
    super(...arguments);
    this._renderMessage = this._renderMessage.bind(this);
  }

  _keyExtractor(item, index) {
    return item.id || index;
  }

  _renderMessage({ item, index, section }) {
    const prevItem = section.data[index + 1]; // Plus one because the list is reversed.
    const nextItem = section.data[index - 1]; // Minus one because the list is reversed.
    const isFirst = Boolean(!prevItem || prevItem.from !== item.from);
    const isLast = Boolean(!nextItem || nextItem.from !== item.from);

    return (
      <Message
        message={item}
        contact={this.props.contact}
        isFirst={isFirst}
        isLast={isLast}
      />
    );
  }

  render() {
    const messages = [...this.props.messages];

    messages.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return (
      <DateSectionList
        style={styles.view}
        inverted={true}
        data={messages}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderMessage}
      />
    );
  }
}

Messages.propTypes = {
  messages: PropTypes.array,
  contact: PropTypes.object
};