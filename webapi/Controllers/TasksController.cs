using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Services;
using Task = webapi.Models.Task;

namespace webapi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly TaskService _taskService;
        public TasksController(TaskService taskService)
        {
            _taskService = taskService;
        }
        // GET: api/Tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Task>>> GetTasks([FromQuery] int cursor = 0, [FromQuery] int limit = 10)
        {
            return Ok(await _taskService.GetTasksAsync(cursor, limit));
        }
        // GET: api/Tasks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Task>> GetTask(int id)
        {
            var task = await _taskService.GetTaskAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }
        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTask(int id, Task task)
        {
            task.Id = id;
            try
            {
                await _taskService.UpdateTaskAsync(task);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_taskService.TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // POST: api/Tasks
        [HttpPost]
        public async Task<ActionResult<Task>> PostTask(Task task)
        {
            await _taskService.CreateTaskAsync(task);

            return CreatedAtAction("GetTask", new { id = task.Id }, task);
        }
        // DELETE: api/Tasks/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskService.GetTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            await _taskService.DeleteTaskAsync(task);

            return NoContent();
        }
    }
}
