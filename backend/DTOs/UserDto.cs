using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace task_manager_api.DTOs
{
    public class UserDto
    {
        public required string Id { get; set; }
        public required string Email { get; set; }
        public required string Token { get; set; } 
    }
}