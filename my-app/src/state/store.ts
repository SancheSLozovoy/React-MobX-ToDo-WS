import { TaskProps } from "../types/Task.type";
import { TaskService } from "../service/TaskService";
import { makeAutoObservable } from "mobx";


class TaskStore {
    tasks: TaskProps[] = [];
    selectedUserId: number | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    async loadTasks() {
        const tasks = await TaskService.loadTasks();
        this.tasks = tasks;
    }

    async addTask(title: string, userId: number) {
        const newTask = await TaskService.addTask(title, userId);
        this.tasks.push(newTask)
    }

    async deleteTask(id: number) {
        await TaskService.deleteTask(id);
        this.tasks = this.tasks.filter(task => task.id !== id)
    }

    async updateTask(id: number, title: string, completed: boolean, userId: number) {
        const taskToUpdate = await TaskService.updateTask(id, title, completed, userId);
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = taskToUpdate;
        }
    }

    toggleTask(id: number) {
        const taskToToggle = this.tasks.find(task => task.id === id)
        if (taskToToggle) {
            taskToToggle.completed = !taskToToggle.completed
        }
    }

    async markAllTasks(userId: number | null) {
        const someTask = userId === null 
            ? this.tasks.some(task => !task.completed) 
            : this.tasks.some(task => task.userId === userId && !task.completed); 
    
        const tasksToUpdate = userId === null 
            ? this.tasks 
            : this.tasks.filter(task => task.userId === userId);
    
        const updateTaskPromises = tasksToUpdate.map(task => {
            const updateCompleted = someTask; 
            return this.updateTask(task.id, task.title, updateCompleted, task.userId);
        });
    
        await Promise.all(updateTaskPromises); 
    }
    

    async deleteCompleted() {
        const tasksToDelete = this.tasks.filter(task => task.completed && (!this.selectedUserId || task.userId === this.selectedUserId));
        try {
            await Promise.all(tasksToDelete.map(task => this.deleteTask(task.id)));

        } catch (error) {
            console.error('Error deleting tasks', error);
        }
    }

    get filterTask() {
        return this.selectedUserId === null ? this.tasks : this.tasks.filter(task => task.userId === this.selectedUserId)
    }

    setSelectedUserId(userId: number | null) {
        this.selectedUserId = userId;
    }

}

export const taskStore = new TaskStore();
