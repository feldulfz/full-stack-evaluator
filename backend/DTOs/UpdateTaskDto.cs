using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.DTOs
{
    public class UpdateTaskDto
    {
        public string Title { get; set; } = "";
        public bool IsDone { get; set; }
        public int UserId { get; set; }
    }
}