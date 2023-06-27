import React, { Component } from 'react';
import { TodoBanner } from './TodoBanner';
import { TodoCreator } from './TodoCreator';
import { TodoRow } from './TodoRow';
//import logo from './logo.svg';
//import './App.css';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: "Michal",
      todoItems: [{ action: "Kupić kwiaty", done: false },
                  { action: "Wziać buty", done: false },
                  { action: "Zebrać bilety", done: true },
                  { action: "Zadzwonić do Jurka", done: false }],
      //newItemText: ""
    }
  }

  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  }

  createNewTodo = (task) => {
    if (!this.state.todoItems.find(item => item.action === task)){
        this.setState({
          // ... - operator rozproszenia, wyodrebnienie elem. tablicy
          todoItems: [...this.state.todoItems, { action: task, done: false }]
        });
      }
  }

  toggleTodo = (todo) => this.setState({
    todoItems: this.state.todoItems.map(item => item.action === todo.action ?
      { ...item, done: !item.done } : item)
  });

  todoTableRows = () => this.state.todoItems.map(item =>
    <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
    );

  render = () =>
    <div>
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
      <div className='container-fluid'>
        <TodoCreator callback={this.createNewTodo} />
        <table className='table table-striped table-bordered'>
          <thead>
            <tr><th>Opis</th><th>Wykonane</th></tr>
          </thead>
          <tbody>{this.todoTableRows()}</tbody>
        </table>
      </div>
    </div>
  
}
