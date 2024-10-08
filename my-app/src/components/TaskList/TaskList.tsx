import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Task from '../Task/Task';
import UserSelect from '../TaskSelectUser/TaskSelectUser';
import { TasksContainer, TasksList, ListTitle, ButtonContainer } from './TaskListStyle';
import { taskStore } from '../../state/store';

const TaskList: React.FC = () => {
    useEffect(() => {
        taskStore.loadTasks();
    }, []);

    const handleAddTask = () => {
        const title = prompt('Enter a task title');
        if (title) {
            const userId = taskStore.selectedUserId || 1;
            taskStore.addTask(title, userId);
        }
    };

    const deleteMarks = async () => {
        await taskStore.deleteCompleted();
    };

    return (
        <TasksContainer>
            <ListTitle>Tasks List</ListTitle>
            <ButtonContainer>
                <button onClick={handleAddTask}>Add Task</button>
                <button onClick={() => taskStore.markAllTasks(taskStore.selectedUserId)}>Mark All</button>
                <button onClick={deleteMarks}>Delete Completed</button>
                <UserSelect
                    userIds={Array.from(new Set(taskStore.tasks.map(task => task.userId)))}
                    selectedUserId={taskStore.selectedUserId}
                    onUserChange={(userId) => taskStore.setSelectedUserId(userId)}
                />

            </ButtonContainer>
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
