using System.Security.Claims;
using KanbanBoard.Api.Mappings;
using KanbanBoard.Api.Models;
using KanbanBoard.Api.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KanbanBoard.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController(ITaskRepository repository) : ControllerBase
{
    private readonly ITaskRepository _repository = repository;
    private string CurrentUserId => User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                                    ?? throw new UnauthorizedAccessException("User ID missing.");

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetAll()
    {
        var tasks = await _repository.GetAllAsync(CurrentUserId);

        var dtos = tasks.Select(t => t.ToResponseDto());

        return Ok(dtos);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> GetById(int id)
    {
        var task = await _repository.GetByIdAsync(id, CurrentUserId);

        if (task is null) return NotFound();

        return Ok(task.ToResponseDto());
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> Create([FromBody] TaskCreateDto dto)
    {
        var task = dto.ToEntity(CurrentUserId);

        await _repository.AddAsync(task);

        return CreatedAtAction(nameof(GetById), new { id = task.Id }, task.ToResponseDto());
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> Update(int id, [FromBody] TaskUpdateDto dto)
    {
        var task = await _repository.GetByIdAsync(id, CurrentUserId);

        if (task is null) return NotFound();

        dto.UpdateEntity(task);

        await _repository.UpdateAsync(task);

        return Ok(task.ToResponseDto());
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> Delete(int id)
    {
        var task = await _repository.GetByIdAsync(id, CurrentUserId);

        if (task is null) return NotFound();

        await _repository.DeleteAsync(task);

        return Ok(task.ToResponseDto());
    }
}
