using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UDT.Model.Entities;

namespace UDT.Business.Interfaces
{
    public interface ITaskCommentService
    {
        Task<TaskComment> AddAsync(TaskComment comment);
        Task<TaskComment> GetByIdAsync(int id);
        Task<IEnumerable<TaskComment>> GetByTaskAndUserAsync(int taskId, int userId);
        Task<bool> DeleteAsync(int id);
        Task<TaskComment> UpdateAsync(TaskComment comment);
    }
}
