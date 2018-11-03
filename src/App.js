import React, { Component } from 'react';
import './App.css';
import './bootstrap.css';

class Counter extends Component {
  //Начальные параметры счетчика
  state = {
    counter: this.props.init,
    init: this.props.init,
    step: this.props.step,
    max: this.props.max,
    message: this.props.message,
    isMessageVisible: false
  };

  updateMessage = btn => {
    if (
      (this.state.counter - this.state.step <= -this.state.max &&
        btn === 'min') ||
      (this.state.counter + this.state.step >= this.state.max &&
        btn === 'max') ||
      (Math.abs(this.state.init) >= this.state.max && btn === 'res') ||
      (Math.abs(this.state.counter) >= this.state.max &&
        typeof btn === 'undefined')
    ) {
      return true;
    } else {
      return false;
    }
  };

  updateCounter = (c, bool) => {
    this.setState({
      counter: c,
      isMessageVisible: bool
    });
  };

  increment = () => {
    if (this.state.counter < this.state.max) {
      const c = Math.min(this.state.counter + this.state.step, this.state.max);
      this.updateCounter(c, this.updateMessage('max'));
    }
  };

  decrement = () => {
    if (this.state.counter > -this.state.max) {
      const c = Math.max(this.state.counter - this.state.step, -this.state.max);
      this.updateCounter(c, this.updateMessage('min'));
    }
  };

  reset = () => {
    this.updateCounter(this.state.init, this.updateMessage('res'));
  };

  updateInputValue = evt => {
    const value =
      evt.target.name === 'message'
        ? evt.target.value
        : parseInt(evt.target.value, 10);
    const init =
      evt.target.name === 'init'
        ? parseInt(evt.target.value, 10)
        : this.state.init;
    const max =
      evt.target.name === 'max'
        ? parseInt(evt.target.value, 10)
        : this.state.max;

    if (
      (isNaN(value) && evt.target.name !== 'message') ||
      (value === '' && evt.target.name === 'message')
    ) {
      alert('Ошибка. Все значения должны быть объявлены.');
      this.forceUpdate();
    }
    if (init > max || init < -max) {
      alert('Допустимые значения init: от - max до max.');
      this.forceUpdate();
    } else {
      this.setState({
        [evt.target.name]: value
      });
    }
  };

  render() {
    let className = 'alert alert-info';
    if (this.state.isMessageVisible) {
      className += ' show';
    } else {
      className += ' hide';
    }
    return (
      <div className='App'>
        <h4>Основное задание. Счетчик</h4>
        <div className='container'>
          <p className='lead'>Начальные значения:</p>
          <div className='row row-centered'>
            <div className='col-sm-2 offset-sm-3'>
              init<br />
              <input
                id='init'
                type='number'
                value={this.state.init}
                className='form-control'
                name='init'
                min='-100'
                max='100'
                onChange={evt => this.updateInputValue(evt)}
              />
            </div>
            <div className='col-sm-2'>
              max<br />
              <input
                id='max'
                type='number'
                value={this.state.max}
                className='form-control'
                name='max'
                min='1'
                max='100'
                onChange={evt => this.updateInputValue(evt)}
              />
            </div>
            <div className='col-sm-2'>
              step<br />
              <input
                id='step'
                type='number'
                value={this.state.step}
                className='form-control'
                name='step'
                min='1'
                max='100'
                onChange={evt => this.updateInputValue(evt)}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-6 col-centered'>
              message<br />
              <input
                id='mes'
                type='text'
                value={this.state.message}
                className='form-control'
                name='message'
                onChange={evt => this.updateInputValue(evt)}
              />
            </div>
          </div>
        </div>
        <p className='lead'>
          Значение счетчика: <span>{this.state.counter}</span>
        </p>
        <button className='btn btn-success' onClick={this.increment}>
          Увеличить
        </button>
        <button className='btn btn-danger' onClick={this.decrement}>
          Уменьшить
        </button>
        <button className='btn btn-warning' onClick={this.reset}>
          Сбросить
        </button>
        <p className={className} id='message'>
          {' '}
          {this.state.message}{' '}
        </p>
      </div>
    );
  }
}

export class EditForm extends Component {
  state = {
    id: this.props.id,
    task: this.props.value,
    edit: this.props.edit,
    editInput: ''
  };

  editElement = () => {
    this.setState({
      edit: true
    });
  };

  removeElement = () => {
    this.props.del(this.state.id);
  };

  confirmEdit = () => {
    const value = this[`editInput${this.state.id}`].value;
    this.props.change(this.state.id, value);
    this.setState({
      task: value,
      edit: false
    });
  };

  cancelEdit = () => {
    this.setState({
      edit: false
    });
  };

  render() {
    let form;
    if (this.state.edit === false) {
      form = (
        <div className='container'>
          <div className='row row-centered' id={'dv' + this.state.id}>
            <div className='col-md-5 offset-md-2'>
              <li id={'li' + this.state.id}>
                <span id={'sp' + this.state.id}>{this.state.task}</span>
              </li>
            </div>
            <div className='col-md-3'>
              <button
                type='button'
                className='btn btn-warning'
                onClick={() => this.editElement()}
              >
                Изменить
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => this.props.del(this.state.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      form = (
        <div className='container'>
          <div className='row row-centered' id={'dv' + this.state.id}>
            <div className='col-md-5 offset-md-2'>
              <li id={'li' + this.state.id}>
                <input
                  type='text'
                  id={'editInput' + this.state.id}
                  defaultValue={this.state.task}
                  ref={input => {
                    this[`editInput${this.state.id}`] = input;
                  }}
                  placeholder='Напишите здесь задачу'
                  required
                />
              </li>
            </div>
            <div className='col-md-3'>
              <button
                type='button'
                className='btn btn-success'
                onClick={() => this.confirmEdit()}
              >
                Подтвердить
              </button>
              <button
                type='button'
                className='btn btn-default'
                onClick={() => this.cancelEdit()}
              >
                Отменить
              </button>
            </div>
          </div>
        </div>
      );
    }
    return form;
  }
}

export class ToDoList extends Component {
  state = {
    tasks: [],
    toDoCounter: 1,
    curValue: ''
  };

  addElement = () => {
    if (this.state.curValue !== '') {
      this.setState({
        tasks: [...this.state.tasks, [this.state.curValue, this.state.toDoCounter]],
        toDoCounter: this.state.toDoCounter + 1,
      });
    }
  };

  updateCurValue = evt => {
    this.setState({
      curValue: evt.target.value
    });
  };

  editElement = (id, value) => {
    this.state.tasks[id][0] = value;
  };

  removeElement = id => {
    for (let i = 0; i < this.state.tasks.length; i++) { 
      if (this.state.tasks[i][1] === id) {
        this.state.tasks.splice(i, 1);
      }
    }
    this.forceUpdate();
  };

  render() {
    var mylist = this.state.tasks.map((value, i) => {
      return (
        <EditForm
          id={value[1]}
          key={value[1]}
          value={value[0]}
          edit={false}
          del={this.removeElement}
          change={this.editElement}
        />
      );
    });

    return (
      <div className='App'>
        <h4>Дополнительное задание. TODO</h4>
        <p className='lead'>To-do List</p>
        <input
          type='text'
          id='myinput'
          placeholder='Напишите здесь задачу'
          onChange={evt => this.updateCurValue(evt)}
        />
        <button
          type='button'
          className='btn btn-success'
          onClick={() => this.addElement()}
        >
          Добавить
        </button>
        <ul>{mylist}</ul>
      </div>
    );
  }
}

export default Counter;
