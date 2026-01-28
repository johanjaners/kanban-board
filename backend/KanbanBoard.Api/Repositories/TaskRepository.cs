

using KanbanBoard.Api.Data;
using KanbanBoard.Api.Models;
using KanbanBoard.Api.Repositories;
using Microsoft.EntityFrameworkCore;

public class TaskRepository(AppDbContext context) : ITaskRepository
{
    private readonly AppDbContext _context = context;

    public async Task<IEnumerable<TaskItem>> GetAllAsync(string userId)
    {
        return await _context.Tasks
            .Where(t => t.UserId == userId)
            .OrderBy(t => t.Id)
            .ToListAsync();
    }

    public async Task<TaskItem?> GetByIdAsync(int id, string userId)
    {
        return await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
    }

    public async Task AddAsync(TaskItem task)
    {
        _context.Add(task);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TaskItem task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskItem task)
    {
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }
}