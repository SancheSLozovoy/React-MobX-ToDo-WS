import React from 'react';
import { TaskProps } from '../../types/Task.type';
import { TaskContainer, TaskContent, TaskTitle, Checkbox, Button, ChangeButton, ButtonContainer } from './TaskStyle';
import { TaskService } from '../../service/TaskService';

const Task: React.FC<TaskProps> = ({ id, title, completed, onToggle, onDelete, onEdit, userId }) => {

    const handleEdit = () => {
        const newTitle = prompt("Edit task title", title);
        if (newTitle && newTitle.trim() !== "") {
            onEdit(id, newTitle.trim());
        }
    };

    const handleToggle = async () => {
        const newComplState = !completed

        await TaskService.updateTask(id, title, newComplState, userId)

        onToggle(id)
    }

    return (
        <TaskContainer>
            <TaskContent>
                <TaskTitle completed={completed}>{title}</TaskTitle>
                <ButtonContainer>
                    <Checkbox type="checkbox" checked={completed} onChange={handleToggle} />
                    <Button onClick={() => onDelete(id)}>Delete</Button>
                    <ChangeButton className="change-button" onClick={handleEdit}>Change</ChangeButton>
                </ButtonContainer>
            </TaskContent>
        </TaskContainer>
    );
};

export default Task;
