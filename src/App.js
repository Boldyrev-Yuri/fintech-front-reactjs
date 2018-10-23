import React, { Component } from 'react';
import './App.css';
import "./bootstrap.css";

class Counter extends Component {
  
  state = { counter: this.props.init };

  increment = () => {
    const pMessage = document.getElementById("message");
    if (this.state.counter < this.props.max) {
      if (this.state.counter + this.props.step >= this.props.max) {
        pMessage.style.visibility = "visible";
      } else {
        pMessage.style.visibility = "hidden";
      }
      this.setState((state) => ({
        counter: this.state.counter + this.props.step
      }));
    }
  };

  decrement = () => {
    const pMessage = document.getElementById("message");
    if (this.state.counter > -this.props.max) {
      if (this.state.counter - this.props.step <= -this.props.max) {
        pMessage.style.visibility = "visible";
      } else {
        pMessage.style.visibility = "hidden";
      }
      this.setState((state) => ({
        counter: this.state.counter - this.props.step
      }));
    }
  };

  reset = () => {
    const pMessage = document.getElementById("message");
    pMessage.style.visibility = "hidden";
    this.setState((state) => ({
      counter: 0
    }));
  };

  render() {
    return (
      <div key="1" className="App">
        <p key="11" className="lead">Значение счетчика: <span key="12">{this.state.counter}</span></p>
        <button key="21" className="btn btn-success" onClick={this.increment}>Увеличить</button>
        <button key="22" className="btn btn-danger" onClick={this.decrement}>Уменьшить</button>
        <button key="23" className="btn btn-warning" onClick={this.reset}>Сбросить</button>
        <p key="31" className="alert alert-info" id="message" style={{ textAlign: "center", visibility: "hidden"}}> {this.props.message} </p>
      </div>
    );
  }
}

export default Counter;
