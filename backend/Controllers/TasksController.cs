using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using TaskManager.Models;
using TaskManager.Data;
using task_manager_api.DTOs;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace TaskManager.API
{
    [Authorize]
    [ApiController]
    [Route("tasks")]
    public class TasksController(ApplicationDbContext context) : ControllerBase
    {
        private readonly ApplicationDbContext _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _context.Tasks
                .Include(t => t.User)
                .Include(t => t.CreatedByUser)
                .Select(t => new TaskResponseDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    IsDone = t.IsDone,

                    AssignedUserId = t.UserId,
                    AssignedUserEmail = t.User.Email,

                    CreatedByUserId = t.CreatedByUserId,
                    CreatedByUserEmail = t.CreatedByUser.Email
                })
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tasks = await _context.Tasks.FindAsync(id);

            if (tasks == null)
                return NotFound();

            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTaskDto dto)
        {
            var creatorId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            // Validate assigned user exists
            var assignedUserExists = await _context.Users
                .AnyAsync(u => u.Id == dto.AssignedUserId);

            if (!assignedUserExists)
                return BadRequest("Assigned user does not exist.");

            var task = new TaskItem
            {
                Title = dto.Title,
                IsDone = dto.IsDone,
                UserId = dto.AssignedUserId,
                CreatedByUserId = creatorId
            };

            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTaskDto updated)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            // Allow assigned user OR creator to edir
            if (task.UserId != userId && task.CreatedByUserId != userId) return Forbid();            

            // Validate assigned user existence
            var assignedUserExists = await _context.Users.AnyAsync(u => u.Id == updated.AssignedUserId);

            if (!assignedUserExists) return BadRequest("Assigned user does not exist.");

            task.Title = updated.Title;
            task.IsDone = updated.IsDone;
            task.UserId = updated.AssignedUserId;

            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var task = await _context.Tasks.FindAsync(id);
            if (task == null) return NotFound();

            // Only the creator can delete
            if (task.CreatedByUserId != userId) return Forbid();            

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}