using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Models;

namespace task_manager_api.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}