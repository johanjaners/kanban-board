import { type TaskItem, type CreateTaskDto, type UpdateTaskDto } from "../types/Task";

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
    async getTasks(token: string): Promise<TaskItem[]> {
        const res = await fetch(`${API_URL}/api/tasks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    },

    async createTask(token: string, task: CreateTaskDto): Promise<TaskItem> {
        const res = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error("Failed to create task");
        return res.json();
    },

    async updateTask(token: string, id: number, task: UpdateTaskDto): Promise<TaskItem> {
        const res = await fetch(`${API_URL}/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(task),
        });
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
    },

    async deleteTask(token: string, id: number): Promise<void> {
        const res = await fetch(`${API_URL}/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) throw new Error("Failed to delete task");
    },
};
