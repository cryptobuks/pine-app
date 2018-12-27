import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FiatLabel from '../components/FiatLabel';
import BtcLabelContainer from './BtcLabelContainer';

const CURRENCY_BTC = 'BTC';

const mapStateToProps = (state) => {
  return {
    fiatRates: state.bitcoin.fiat.rates,
    settings: state.settings
  };
};

class CurrencyContainer extends Component {
  static propTypes = {
    amountBtc: PropTypes.number,
    fiatRates: PropTypes.object,
    settings: PropTypes.object,
    currencyType: PropTypes.string
  };

  _renderBtcLabel() {
    return (
      <BtcLabelContainer
        {...this.props}
        amount={this.props.amountBtc}
      />
    );
  }

  _renderFiatLabel() {
    const { amountBtc, fiatRates, settings, currencyType } = this.props;
    const currency = settings.currency[currencyType];
    const amountFiat = fiatRates[currency] * amountBtc;

    return (
      <FiatLabel
        {...this.props}
        amount={amountFiat}
        currency={currency}
      />
    );
  }

  render() {
    const { settings, currencyType } = this.props;
    const currency = settings.currency[currencyType];

    if (currency === CURRENCY_BTC) {
      return this._renderBtcLabel();
    }

    return this._renderFiatLabel();
  }
}

const CurrencyConnector = connect(
  mapStateToProps
)(CurrencyContainer);

export default CurrencyConnector;
