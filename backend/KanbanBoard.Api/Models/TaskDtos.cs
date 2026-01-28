namespace KanbanBoard.Api.Models;

public record TaskCreateDto(
    string Title,
    string? Description,
    TaskStatus Status,
    int? Priority,
    DateTime? DueDate
);

public record TaskUpdateDto(
    string Title,
    string? Description,
    TaskStatus Status,
    int? Priority,
    DateTime? DueDate
);

public record TaskResponseDto(
    int Id,
    string Title,
    string? Description,
    TaskStatus Status,
    int? Priority,
    DateTime? DueDate,
    DateTime CreatedAt,
    DateTime UpdatedAt
);