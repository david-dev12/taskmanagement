using Serilog;
using webapi.Services;

public class LogHighPriorityTaskUpdatesMiddleware
{
    private readonly RequestDelegate _next;
    public LogHighPriorityTaskUpdatesMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    public async Task InvokeAsync(HttpContext context, TaskService taskService)
    {
        taskService.HighPriorityTaskUpdated += message => Log.Logger.Fatal(message);
        await _next(context);
    }
}