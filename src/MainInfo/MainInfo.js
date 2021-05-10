import React, { Component } from "react";
import "./MainInfo.css";
import CurrencyInfo from "../CurrencyInfo/CurrencyInfo";

export default class Info extends Component {
  state = {
    ua: {
      name: "UAH"
    },
    us: {
      name: "USD"
    },
    eu: {
      name: "EUR"
    }
  };

  async componentDidMount() {
    await this.getRateExchange();
  }

  async getRateExchange() {
    try {
      const linkUa = "http://www.floatrates.com/daily/uah.json";
      const linkUs = "http://www.floatrates.com/daily/usd.json";
      const linkEu = "http://www.floatrates.com/daily/eur.json";

      const resUa = await fetch(linkUa);
      const resUs = await fetch(linkUs);
      const resEu = await fetch(linkEu);

      const ua = await resUa.json();
      const us = await resUs.json();
      const eu = await resEu.json();

      const uaState = { ...this.state.ua };
      uaState.firstName = ua.usd.code;
      uaState.firstRate = ua.usd.inverseRate.toFixed(2);
      uaState.secondName = ua.eur.code;
      uaState.secondRate = ua.eur.inverseRate.toFixed(2);

      const usState = { ...this.state.us };
      usState.firstName = us.uah.code;
      usState.firstRate = us.uah.inverseRate.toFixed(2);
      usState.secondName = us.eur.code;
      usState.secondRate = us.eur.inverseRate.toFixed(2);

      const euState = { ...this.state.eu };
      euState.firstName = eu.uah.code;
      euState.firstRate = eu.uah.inverseRate.toFixed(2);
      euState.secondName = eu.usd.code;
      euState.secondRate = eu.usd.inverseRate.toFixed(2);

      this.setState({ ua: uaState, us: usState, eu: euState });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <>
        <CurrencyInfo
          name={this.state.ua.name}
          firstName={this.state.ua.firstName}
          firstRate={this.state.ua.firstRate}
          secondName={this.state.ua.secondName}
          secondRate={this.state.ua.secondRate}
        />
        <CurrencyInfo
          name={this.state.us.name}
          firstName={this.state.us.firstName}
          firstRate={this.state.us.firstRate}
          secondName={this.state.us.secondName}
          secondRate={this.state.us.secondRate}
        />
        <CurrencyInfo
          name={this.state.eu.name}
          firstName={this.state.eu.firstName}
          firstRate={this.state.eu.firstRate}
          secondName={this.state.eu.secondName}
          secondRate={this.state.eu.secondRate}
        />
      </>
    );
  }
}
