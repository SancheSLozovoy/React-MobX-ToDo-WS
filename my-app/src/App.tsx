import React from 'react';
import './assets/css/App.css';
import TaskList from './components/TaskList/TaskList';


export default  function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TaskList/>
      </header>
    </div>
  );
}