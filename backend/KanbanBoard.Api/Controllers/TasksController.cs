using KanbanBoard.Api.Data;
using KanbanBoard.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KanbanBoard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaskItem>>> GetAll()
    {
        var tasks = await _db.Tasks
            .OrderBy(t => t.Id)
            .ToListAsync();

        return Ok(tasks);
    }

    // GET: api/tasks/{id}
    [HttpGet("{id:int}")]
    public async Task<ActionResult<TaskItem>> GetById(int id)
    {
        var task = await _db.Tasks.FindAsync(id);
        if (task is null) return NotFound();
        return Ok(task);
    }

    // GET: api/tasks/count
    [HttpGet("count")]
    public async Task<ActionResult<object>> GetCount()
    {
        var count = await _db.Tasks.CountAsync();
        return Ok(new { count });
    }
}
