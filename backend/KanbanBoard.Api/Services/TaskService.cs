using KanbanBoard.Api.Mappings;
using KanbanBoard.Api.Models;
using KanbanBoard.Api.Repositories;
using KanbanBoard.Api.Services;

public class TaskService(ITaskRepository repository) : ITaskService
{
    private readonly ITaskRepository _repository = repository;
    public async Task<IEnumerable<TaskResponseDto>> GetAllAsync(string userId)
    {
        var tasks = await _repository.GetAllAsync(userId);
        return tasks.Select(t => t.ToResponseDto());
    }

    public async Task<TaskResponseDto?> GetByIdAsync(int id, string userId)
    {
        var task = await _repository.GetByIdAsync(id, userId);
        return task?.ToResponseDto();
    }
    public async Task<TaskResponseDto> CreateAsync(TaskCreateDto dto, string userId)
    {
        var task = dto.ToEntity(userId);

        await _repository.AddAsync(task);

        return task.ToResponseDto();
    }
    public async Task<TaskResponseDto?> UpdateAsync(int id, TaskUpdateDto dto, string userId)
    {
        var task = await _repository.GetByIdAsync(id, userId);
        if (task is null) return null;

        dto.UpdateEntity(task);

        await _repository.UpdateAsync(task);

        return task.ToResponseDto();
    }
    public async Task<TaskResponseDto?> DeleteAsync(int id, string userId)
    {
        var task = await _repository.GetByIdAsync(id, userId);
        if (task is null) return null;

        await _repository.DeleteAsync(task);

        return task.ToResponseDto();
    }

}