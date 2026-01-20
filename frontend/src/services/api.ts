const API_URL = import.meta.env.VITE_API_URL;

export type TaskItem = {
    id: number;
    title: string;
    description?: string;
    status: number; // 0=Todo, 1=InProgress, 2=Done
    priority?: number;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
};

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

    async createTask(
        token: string,
        task: {
            title: string;
            description?: string;
            status: number;
            priority?: number;
            dueDate?: string;
        },
    ): Promise<TaskItem> {
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

    async updateTask(
        token: string,
        id: number,
        task: {
            title: string;
            description?: string;
            status: number;
            priority?: number;
            dueDate?: string;
        },
    ): Promise<TaskItem> {
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
