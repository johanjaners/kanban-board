using KanbanBoard.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Add DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapControllers();

// Health check endpoint
app.MapGet("/", () => Results.Ok(new
{
    status = "healthy",
    message = "kanban-board API is running",
    timestamp = DateTime.UtcNow
}))
.WithName("HealthCheck");

// DB endpoint
app.MapGet("/tasks-count", async (AppDbContext db) =>
{
    try
    {
        var count = await db.Tasks.CountAsync();
        return Results.Ok(new { count });
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "DB error on tasks-count",
            detail: ex.Message
        );
    }
});

// debug
app.MapGet("/config-check", (IConfiguration config) =>
{
    var cs = config.GetConnectionString("DefaultConnection");
    return Results.Ok(new
    {
        hasConnectionString = !string.IsNullOrWhiteSpace(cs),
        length = cs?.Length ?? 0
    });
});


app.Run();