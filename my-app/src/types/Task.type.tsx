interface TaskProps{
    id: number;
    title : string;
    completed: boolean;
    userId  :number;
    onToggle: (id: number) => void;
    onDelete: (id: number) =>void;
    onEdit: (id: number, title: string) => void;
}

interface TaskState{
    selected: boolean;
}

interface TaskListState {
    tasks: TaskProps[];
    filterTasks: TaskProps[];
    selectedUserId: number | null;
    
}

interface UserSelectProps {
    userIds: number[];
    selectedUserId: number | null;
    onUserChange: (userId: number | null) => void; 
}


export type {TaskProps, TaskListState, TaskState, UserSelectProps}