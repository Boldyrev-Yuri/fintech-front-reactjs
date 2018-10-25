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

export class EditForm extends Component {
  state = { 
    id: this.props.id, 
    task: this.props.value,
    edit: this.props.edit
  };

  changeState = (id, task, edit) => {
    this.setState((state) => ({
      id: id, 
      task: task,
      edit: edit
    }));
  };

  editElement = () => {
    this.changeState(this.state.id, this.state.task, true);
  }

  removeElement = (id) => {
    this.props.del(id);
  }

  confirmEdit = (id) => {
    const value = document.getElementById("editinput" + id).value;
    this.props.change(id, value);
    this.changeState(this.state.id, value, false);
  }

  cancelEdit = () => {
    this.changeState(this.state.id, this.state.task, false);
  }

  render() {
    let form;
    if(this.state.edit === false) {
      form = 
      <div className="container">
        <div className="row row-centered" id={"dv" + this.state.id}>
          <div className="col-md-5 offset-md-2">
            <li id={"li" + this.state.id}>
              <span id={"sp" + this.state.id}>{this.state.task}</span>
            </li>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-warning" onClick={() => this.editElement()}>
              Изменить
            </button>
            <button type="button" className="btn btn-danger" onClick={() => this.removeElement(this.state.id)}>
              Удалить
            </button>
          </div>
        </div>
      </div>;
    } else {
      form = 
      <div className="container">
        <div className="row row-centered" id={"dv" + this.state.id}>
          <div className="col-md-5 offset-md-2">
            <li id={"li" + this.state.id}>
              <input type="text" id={"editinput" + this.state.id} defaultValue={this.state.task} onChange={e => this.setState({ text: e.target.value })} placeholder="Напишите здесь задачу" required></input>
            </li>
          </div>
          <div className="col-md-3">
            <button type="button" className="btn btn-success" onClick={() => this.confirmEdit(this.state.id)}>
              Подтвердить
            </button>
            <button type="button" className="btn btn-default" onClick={() => this.cancelEdit()}>
              Отменить
            </button>
          </div>
        </div>
      </div>;
    }
    return form;
  }
}

export class ToDoList extends Component {
  state = { tasks: [] };

  addElement = () => {
    const value = document.getElementById("myinput").value;
    console.log(12345);
    document.getElementById("myinput").value = '';
    if (value !== '') {
      this.state.tasks.push(value);
      this.forceUpdate();
    }
  }

  editElement = (id, value) => {
    //не используется setState (forceUpdate), чтобы не рендерить весь список
    this.state.tasks[id] = value;
  }
  
  removeElement = (id) => {
    delete this.state.tasks[id]
    console.log(id);
    this.forceUpdate();
  }

  render() {
    var mylist = this.state.tasks.map((value, i) => {
      return <EditForm id={i} key={i} value={value} edit={false} del={this.removeElement} change={this.editElement}/>;
    })

    return (
      <div className="App">
        <h4>Дополнительное задание. TODO</h4>
        <p className="lead">To-do List</p>
        <input type="text" id="myinput" placeholder="Напишите здесь задачу" required></input>
        <button type="button" class="btn btn-success" onClick={() => this.addElement()}>Добавить</button>
        <ul>{mylist}</ul>
      </div>
    );
  }
}

export default Counter;
