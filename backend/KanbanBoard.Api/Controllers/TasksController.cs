using System.Security.Claims;
using KanbanBoard.Api.Mappings;
using KanbanBoard.Api.Models;
using KanbanBoard.Api.Repositories;
using KanbanBoard.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KanbanBoard.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TasksController(ITaskService service) : ControllerBase
{
    private readonly ITaskService _service = service;
    private string? GetUserId() =>
        User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskResponseDto>>> GetAll()
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        return Ok(await _service.GetAllAsync(userId));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> GetById(int id)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        var task = await _service.GetByIdAsync(id, userId);
        if (task is null) return NotFound();

        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> Create([FromBody] TaskCreateDto dto)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        var created = await _service.CreateAsync(dto, userId);

        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> Update(int id, [FromBody] TaskUpdateDto dto)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        var updated = await _service.UpdateAsync(id, dto, userId);
        if (updated is null) return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<TaskResponseDto>> Delete(int id)
    {
        var userId = GetUserId();
        if (userId is null) return Unauthorized();

        var deleted = await _service.DeleteAsync(id, userId);
        if (deleted is null) return NotFound();

        return Ok(deleted);
    }
}
