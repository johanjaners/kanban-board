using KanbanBoard.Api.Models;

namespace KanbanBoard.Api.Mappings;

public static class TaskMappingExtensions
{
    public static TaskResponseDto ToResponseDto(this TaskItem task)
    {
        return new TaskResponseDto(
            task.Id,
            task.Title,
            task.Description,
            task.Status,
            task.Priority,
            task.DueDate,
            task.CreatedAt,
            task.UpdatedAt
        );
    }

    public static TaskItem ToEntity(this TaskCreateDto dto, string userId)
    {
        return new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            Status = dto.Status,
            Priority = dto.Priority,
            DueDate = dto.DueDate,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            UserId = userId
        };
    }

    public static TaskItem UpdateEntity(this TaskUpdateDto dto, TaskItem task)
    {
        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = dto.Status;
        task.Priority = dto.Priority;
        task.DueDate = dto.DueDate;
        task.UpdatedAt = DateTime.UtcNow;

        return task;
    }
}