using KanbanBoard.Api.Models;

namespace KanbanBoard.Api.Repositories;


public interface ITaskRepository
{
    Task<IEnumerable<TaskItem>> GetAllAsync(string userId);
    Task<TaskItem?> GetByIdAsync(int id, string userId);
    Task AddAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(TaskItem task);
}