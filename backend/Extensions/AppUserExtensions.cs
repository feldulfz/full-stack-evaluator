using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using task_manager_api.DTOs;
using task_manager_api.Interfaces;
using TaskManager.Models;

namespace task_manager_api.Extensions
{
    public static class AppUserExtensions
    {
        public static UserDto ToDto(this User user, ITokenService tokenService)
        {
            return new UserDto
            {
                Id = user.Id.ToString(),
                Email = user.Email,
                Token = tokenService.CreateToken(user)
            };
        }
    }
}