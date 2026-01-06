using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.DTOs
{
    public class TaskResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public bool IsDone { get; set; }
        public int AssignedUserId { get; set; }
        public string AssignedUserEmail { get; set; } = "";
        public int CreatedByUserId { get; set; }
        public string CreatedByUserEmail { get; set; } = "";        
    }
}