

namespace TaskManager.Models
{
    public class User
{
    public int Id { get; set; }
    public required string Email { get; set; } = "";
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }    
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
}