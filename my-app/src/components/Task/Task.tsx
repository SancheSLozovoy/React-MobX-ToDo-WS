import React from 'react';
import './Task.css';
import { TaskProps } from '../../types/Task.type';
import { TaskContainer, TaskContent, TaskTitle, Checkbox, Button, ChangeButton, ButtonContainer } from './TaskStyle';

const Task: React.FC<TaskProps> = ({ id, title, completed, onToggle, onDelete, onEdit }) => {

    const handleEdit = () => {
        const newTitle = prompt("Edit task title", title);
        if (newTitle && newTitle.trim() !== "") {
            onEdit(id, newTitle.trim());
        }
    };

    return (
        <TaskContainer>
            <TaskContent>
            <TaskTitle completed={completed}>{title}</TaskTitle>
                <ButtonContainer>
                    <Checkbox type="checkbox" checked={completed} onChange={() => onToggle(id)} />
                    <Button onClick={() => onDelete(id)}>Delete</Button>
                    <ChangeButton className="change-button" onClick={handleEdit}>Change</ChangeButton>
                </ButtonContainer>
            </TaskContent>
        </TaskContainer>
    );
};

export default Task;
