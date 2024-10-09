import React from 'react';
import './assets/css/App.css';
import TaskList from './components/TaskList/TaskList';
import TodoTableProvider from './components/TodoTableProvider/TodoTableProvider';

export default function App() {
  return (
    <TodoTableProvider>
      <TaskList />
    </TodoTableProvider>

  );
}