import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskProps } from "../types/Task.type";
import { TaskService } from "../service/TaskService";

export const loadTasks = createAsyncThunk<TaskProps[]>(
    'tasks/loadTasks',
    async () => {
        return await TaskService.loadTasks();
    }
);

export const addTask = createAsyncThunk<TaskProps, { title: string; userId: number }>(
    'tasks/addTask',
    async function({ title, userId }) {
        return await TaskService.addTask(title, userId);
    }
);

export const deleteTask = createAsyncThunk<void, { id: number }>(
    'tasks/deleteTask',
    async function({ id }) {
      await TaskService.deleteTask(id);
    }
);
  
export const updateTask = createAsyncThunk<TaskProps, { id: number; title: string , completed : boolean, userId: number}>(
    'tasks/updateTask',
    async function({ id, title, completed, userId}) {
        const taskToUpdate = await TaskService.updateTask(id, title, completed, userId); 
        return taskToUpdate;
    }
);


const todoSlice =  createSlice({
    name: 'todo',
    initialState: [] as TaskProps[],
    reducers: {
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.find(task => task.id === action.payload)
            if(task){
                task.completed = !task.completed
            }
        },
        markAllTasks: (state, action:PayloadAction<number | null>) => {
            const userId = action.payload;
            state.forEach(task => {
                if(task.userId === userId){
                    task.completed = true
                }
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadTasks.fulfilled, (state, action) => {
                return action.payload;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                return state.filter(task => task.id !== action.meta.arg.id);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const index = state.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            });
    }
})

export const { toggleTask, markAllTasks } = todoSlice.actions;
export default todoSlice.reducer;