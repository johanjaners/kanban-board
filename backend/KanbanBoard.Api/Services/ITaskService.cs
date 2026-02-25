using KanbanBoard.Api.Models;

namespace KanbanBoard.Api.Services;

public interface ITaskService
{
    Task<IEnumerable<TaskResponseDto>> GetAllAsync(string userId);
    Task<TaskResponseDto?> GetByIdAsync(int id, string userId);
    Task<TaskResponseDto> CreateAsync(TaskCreateDto dto, string userId);
    Task<TaskResponseDto?> UpdateAsync(int id, TaskUpdateDto dto, string userId);
    Task<TaskResponseDto?> DeleteAsync(int id, string userId);
}