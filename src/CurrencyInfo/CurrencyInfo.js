import React, { Component } from "react";
import "./CurrencyInfo.css";

export default class RateInfo extends Component {
  constructor() {
    super();
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  state = {
    firstFrom: "",
    firstResult: "",
    secondFrom: "",
    secondResult: ""
  };

  onChangeHandler(event) {
    const { name, value } = event.target;
    const numbersOnly = /^[0-9]*$/;
    if (value === "" || numbersOnly.test(value)) {
      if (name === "first") this.setState({ firstFrom: value });
      if (name === "second") this.setState({ secondFrom: value });
    }
    this.convertCurrencyHandler(name, value);
  }

  convertCurrencyHandler(name, value) {
    if (name === "first") {
      const result = value * this.props.firstRate;
      this.setState({ firstResult: result });
    } else if (name === "second") {
      const result = value * this.props.secondRate;
      this.setState({ secondResult: result });
    }
  }

  render() {
    const currencyInfo = (
      <>
        <p>{this.props.name}</p>
        <div>
          {this.props.firstRate
            ? `1 ${this.props.firstName} = ${this.props.firstRate} ${this.props.name}`
            : ""}
        </div>
        <p>
          {this.props.firstName} to {this.props.name}
        </p>
        <input
          type="text"
          name="first"
          value={this.state.firstFrom}
          onChange={this.onChangeHandler}
        />
        <div>
          {this.state.firstResult
            ? `${this.state.firstResult.toFixed(2)} ${this.props.name}`
            : null}
        </div>
        <div>
          {this.props.firstRate
            ? `1 ${this.props.secondName} = ${this.props.secondRate} ${this.props.name}`
            : ""}
        </div>
        <p>
          {this.props.secondName} to {this.props.name}
        </p>
        <input
          type="text"
          name="second"
          value={this.state.secondFrom}
          onChange={this.onChangeHandler}
        />
        <div>
          {this.state.secondResult
            ? `${this.state.secondResult.toFixed(2)} ${this.props.name}`
            : null}
        </div>
      </>
    );
    const loading = "Loading...";

    const result = this.props.secondName ? currencyInfo : loading;

    return <div className="currency-info">{result}</div>;
  }
}
