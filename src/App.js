import React, { Component } from 'react';
import './App.css';
import "./bootstrap.css";

class Counter extends Component {

  state = { 
    counter: this.props.init,
    init: this.props.init,
    step: this.props.step,
    max: this.props.max,
    message: this.props.message
   };

  changeState = (c) => {
    this.setState((state) => ({
      counter: c,
      init: this.state.init,
      step: this.state.step,
      max: this.state.max,
      message: this.state.message
    }));
  };

  increment = () => {
    const pMessage = document.getElementById("message");
    if (this.state.counter < this.state.max) {
      if (this.state.counter + this.state.step >= this.state.max) {
        pMessage.style.visibility = "visible";
      } else {
        pMessage.style.visibility = "hidden";
      }
      const c = Math.min(this.state.counter + this.state.step, this.state.max);

      this.changeState(c);
    }
  };

  decrement = () => {
    const pMessage = document.getElementById("message");
    if (this.state.counter > -this.state.max) {
      if (this.state.counter - this.state.step <= -this.state.max) {
        pMessage.style.visibility = "visible";
      } else {
        pMessage.style.visibility = "hidden";
      }
      const c = Math.max(this.state.counter - this.state.step, - this.state.max);

      this.changeState(c);
    }
  };

  reset = () => {
    const pMessage = document.getElementById("message");
    pMessage.style.visibility = "hidden";
    this.changeState(this.state.init);
  };

  save =() => {
    const init = parseInt(document.getElementById("init").value);
    const max = parseInt(document.getElementById("max").value);
    const step = parseInt(document.getElementById("step").value);

    if (isNaN(init) || isNaN(max) || isNaN(step)) {
      alert("Ошибка. Все значения должны быть объявлены.");
    } else if (init <= max && init >= -max) {
      this.setState((state) => ({
        counter: parseInt(document.getElementById("init").value),
        init: parseInt(document.getElementById("init").value),
        step: parseInt(document.getElementById("step").value),
        max: parseInt(document.getElementById("max").value),
        message: document.getElementById("mes").value
      }));
    } else {
      alert("Ошибка. Допустимые значения init: от -max до max.");
    }
  }

  render() {
    return (
      <div className="App">
        <h4>Основное задание. Счетчик</h4>
        <div className="container">
          <p className="lead">Начальные значения:</p>
          <div className="row row-centered">
            <div className="col-sm-2 offset-sm-3">
              init<br/>
              <input id="init" type="number" defaultValue="0" className="form-control" min="0" max="100"></input>
            </div>
            <div className="col-sm-2">
              max<br />
              <input id="max" type="number" defaultValue="10" className="form-control" min="1" max="100"></input>
            </div>
            <div className="col-sm-2">
              step<br />
              <input id="step" type="number" defaultValue="1" className="form-control" min="1" max="100"></input>
            </div>
          </div>
          <div className="row">
            <div className="col-4 col-centered">
              message<br />
              <input id="mes" type="text" defaultValue="Счетчик достиг предельного значения" className="form-control"></input>
            </div>
          </div>
          <div className="row">
            <div className="col col-centered">
              <button className="btn btn-primary" onClick={this.save}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
        <p className="lead">Значение счетчика: <span>{this.state.counter}</span></p>
        <button className="btn btn-success" onClick={this.increment}>
          Увеличить
        </button>
        <button className="btn btn-danger" onClick={this.decrement}>
          Уменьшить
        </button>
        <button className="btn btn-warning" onClick={this.reset}>
          Сбросить
        </button>
        <p className="alert alert-info" id="message" style={{ textAlign: "center", visibility: "hidden" }}> {this.state.message} </p>
      </div>
    );
  }
}

export default Counter;
