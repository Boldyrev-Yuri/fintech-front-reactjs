import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Counter, { ToDoList } from './App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById("root");

const page = 
<div>
    <Counter init={0} step={1} max={10} message={"Счетчик достиг предельного значения"} />
    <ToDoList />
</div>;

ReactDOM.render(page, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
