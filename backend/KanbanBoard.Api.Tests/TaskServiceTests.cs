namespace KanbanBoard.Api.Tests;

public class TaskServiceTests
{
    private readonly Mock<ITaskRepository> _repositoryMock;
    private readonly TaskService _service;

    public TaskServiceTests()
    {
        _repositoryMock = new Mock<ITaskRepository>();
        _service = new TaskService(_repositoryMock.Object);
    }

    [Fact]
    public async Task GetById_ReturnsNull_WhenTaskDoesNotExist()
    {
        //Arrange
        _repositoryMock
            .Setup(r => r.GetByIdAsync(1, "user1"))
            .ReturnAsync((TaskItem?)null);

        //Act
        var res
    }
}
