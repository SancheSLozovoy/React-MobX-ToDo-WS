import React, { useState } from 'react';
import { TaskProps } from '../../types/Task.type';
import { TaskContainer, TaskContent, TaskTitle, Checkbox, Button, ChangeButton, ButtonContainer } from './TaskStyle';
import { TaskService } from '../../service/TaskService';
import InputChange from '../InputChange/InputChange';

const Task: React.FC<TaskProps> = ({ id, title, completed, onToggle, onDelete, onEdit, userId }) => {

    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (newTitle: string) => {
        onEdit(id, newTitle)
        setIsEditing(false)
    };

    const handleToggle = async () => {
        const newComplState = !completed

        await TaskService.updateTask(id, title, newComplState, userId)

        onToggle(id)
    }

    return (
        <TaskContainer>
            <TaskContent>
                {isEditing ? 
                    (<InputChange
                        currentTitle={title}
                        onTitleChange={handleEdit}
                    />) :
                    <TaskTitle completed={completed}>{title}</TaskTitle>}

                <ButtonContainer>
                    <Checkbox type="checkbox" checked={completed} onChange={handleToggle} />
                    <Button onClick={() => onDelete(id)}>Delete</Button>
                    <ChangeButton className="change-button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Cancel' : 'Change'}
                    </ChangeButton>
                </ButtonContainer>
            </TaskContent>
        </TaskContainer>
    );
};

export default Task;
