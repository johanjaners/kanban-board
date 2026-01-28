
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

export type CreateTaskDto = {
    title: string;
    description?: string;
    status: number;
    priority?: number;
    dueDate?: string;
};

export type UpdateTaskDto = CreateTaskDto;