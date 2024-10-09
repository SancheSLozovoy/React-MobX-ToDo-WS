import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Task from '../Task/Task';
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TasksContainer, TasksList, ListTitle, ButtonContainer, AddTask, AddTaskContainer } from './TaskListStyle';
import TodoTable from '../../state/TodoTable';
import { useTodoTable } from '../../service/useTodoTable';

const TaskList: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)

    const todoTable = useTodoTable();

    const handleAddTask = () => {
        const titleToAdd = inputRef.current?.value;
        if (titleToAdd) {
            const userId = todoTable.selectedUserId || 1;
            todoTable.addTask(titleToAdd, userId);
            if(inputRef.current){
                inputRef.current.value = '';
            }
        }
    };

    return (
        <TasksContainer>
            <ListTitle>Tasks List</ListTitle>
            <ButtonContainer>
                <button onClick={() => todoTable.markAllTasks(todoTable.selectedUserId)}>Mark All</button>
                <button onClick={() => todoTable.deleteCompleted()}>Delete Completed</button>
                <UserSelect
                    userIds={Array.from(new Set(todoTable.tasks.map(task => task.userId)))}
                    selectedUserId={todoTable.selectedUserId}
                    onUserChange={(userId) => todoTable.setSelectedUserId(userId)}
                />
            </ButtonContainer>
            <AddTaskContainer>
                <AddTask type="text" ref={inputRef} placeholder='Enter task'/>
                <button onClick={handleAddTask}>Add Task</button>
            </AddTaskContainer>
            <TasksList>
                {todoTable.filterTask.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        onToggle={() => todoTable.toggleTask(task.id)}
                        onEdit={(id, newTitle) => todoTable.updateTask(id, newTitle, task.completed, task.userId)}
                        onDelete={() => todoTable.deleteTask(task.id)}
                    />
                ))}
            </TasksList>
        </TasksContainer>
    );
};

export default observer(TaskList);
