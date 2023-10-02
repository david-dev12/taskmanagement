using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using webapi.Data;
using webapi.Hubs;
using webapi.Models;
using Task = webapi.Models.Task;

namespace webapi.Services
{
    public class TaskService
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<TaskHub> _hubContext;
        public event Action<string> HighPriorityTaskUpdated = delegate { };
        public TaskService(AppDbContext context, IHubContext<TaskHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        public async Task<IEnumerable<Task>> GetTasksAsync(int cursor = 0, int limit = 10)
        {
            return await _context.Tasks
                .Where(task => task.Id > cursor)
                .OrderBy(task => task.Id)
                .Take(limit)
                .ToListAsync();
        }
        public async Task<Task?> GetTaskAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }
        public async Task<Task> CreateTaskAsync(Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            if(task.Priority == Priority.High)
            {
                HighPriorityTaskUpdated($"High priority task '{task.Id}' has been created.");
            }
            await _hubContext.Clients.All.SendAsync("TaskCreated", task);
            return task;
        }
        public async System.Threading.Tasks.Task UpdateTaskAsync(Task task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            if (task.Priority == Priority.High)
            {
                HighPriorityTaskUpdated($"High priority task '{task.Id}' has been updated.");
            }
            await _hubContext.Clients.All.SendAsync("TaskUpdated", task);
        }
        public async System.Threading.Tasks.Task DeleteTaskAsync(Task task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.SendAsync("TaskDeleted", task.Id);
        }
        public bool TaskExists(int id)
        {
            return _context.Tasks.Any(e => e.Id == id);
        }
    }
}
