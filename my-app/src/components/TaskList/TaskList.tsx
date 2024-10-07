import React, { useEffect, useState } from 'react';
import Task from '../Task/Task';
import './TaskList.css';
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TasksContainer, TasksList, ListTitle, ButtonContainer } from './TaskListStyle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../state/store';
import { loadTasks, markAllTasks, toggleTask, addTask as addTaskAction, deleteTask, updateTask } from '../../state/todoSlice';

const TaskList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch(); 
    const tasks = useSelector((state: RootState) => state.tasks);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [filterTasks, setFilterTasks] = useState(tasks);

    useEffect(() => {
        dispatch(loadTasks());
    }, [dispatch]);

    useEffect(() => {
        if (selectedUserId === null) {
            setFilterTasks(tasks);
        } else {
            setFilterTasks(tasks.filter(task => task.userId === selectedUserId));
        }
    }, [tasks, selectedUserId]);

    const handleAddTask = () => {
        const title = prompt('Enter a task title');
        if (title) {
            const userId = selectedUserId || 1;
            dispatch(addTaskAction({ title, userId }));
        }
    };

    const deleteMarks = async () => {
        const tasksToDelete = tasks.filter(task => task.completed && (!selectedUserId || task.userId === selectedUserId));
        try {
            await Promise.all(tasksToDelete.map(task => dispatch(deleteTask({id : task.id}))));
            
        } catch (error) {
            console.error('Error deleting tasks', error);
        }
    };
    

    return (
        <TasksContainer>
            <ListTitle>Tasks List</ListTitle>
            <ButtonContainer>
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={() => dispatch(markAllTasks(selectedUserId))}>Mark All</button>
                <button onClick={() => dispatch(() => deleteMarks())}>Delete Completed</button>
                <UserSelect userIds={Array.from(new Set(tasks.map(task => task.userId)))} 
                selectedUserId={selectedUserId} 
                onUserChange={setSelectedUserId} />
            </ButtonContainer>
            <TasksList>
                {filterTasks.map(task => (
                    <Task key={task.id} 
                    {...task} 
                    onToggle={() => dispatch(toggleTask(task.id))} 
                    onEdit={(id, newTitle) => dispatch(updateTask({id, title : newTitle, userId: task.userId, completed: task.completed}))}
                    onDelete={() => dispatch(deleteTask({id : task.id}))} />
                ))}
            </TasksList>
        </TasksContainer>
    );
};

export default TaskList;
