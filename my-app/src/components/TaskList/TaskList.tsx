import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Task from '../Task/Task';
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TasksContainer, TasksList, ListTitle, ButtonContainer, AddTask, AddTaskContainer } from './TaskListStyle';
import { taskStore } from '../../state/store';


const TaskList: React.FC = () => {
    useEffect(() => {
        taskStore.loadTasks();
    }, []);

    const inputRef = useRef<HTMLInputElement>(null);

    const handleAddTask = () => {
        const titleToAdd = inputRef.current?.value;
        if (titleToAdd) {
            const userId = taskStore.selectedUserId || 1;
            taskStore.addTask(titleToAdd, userId);
            if(inputRef.current){
                inputRef.current.value = '';
            }
        }
    };

    const deleteMarks = async () => {
        await taskStore.deleteCompleted();
    };

    return (
        <TasksContainer>
            <ListTitle>Tasks List</ListTitle>
            <ButtonContainer>
                <button onClick={() => taskStore.markAllTasks(taskStore.selectedUserId)}>Mark All</button>
                <button onClick={deleteMarks}>Delete Completed</button>
                <UserSelect
                    userIds={Array.from(new Set(taskStore.tasks.map(task => task.userId)))}
                    selectedUserId={taskStore.selectedUserId}
                    onUserChange={(userId) => taskStore.setSelectedUserId(userId)}
                />
            </ButtonContainer>
            <AddTaskContainer>
                <AddTask type="text" ref={inputRef} placeholder='Enter task'/>
                <button onClick={handleAddTask}>Add Task</button>
            </AddTaskContainer>
            <TasksList>
                {taskStore.filterTask.map(task => (
                    <Task
                        key={task.id}
                        {...task}
                        onToggle={() => taskStore.toggleTask(task.id)}
                        onEdit={(id, newTitle) => taskStore.updateTask(id, newTitle, task.completed, task.userId)}
                        onDelete={() => taskStore.deleteTask(task.id)}
                    />
                ))}
            </TasksList>
        </TasksContainer>
    );
};

export default observer(TaskList);
