namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsDone { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; } = null!;        
    }
}