using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UDT.Business.Interfaces;
using UDT.Model.Entities;
using UDT.Repository;

namespace UDT.Business.Implementation
{
    public class TaskCommentService : ITaskCommentService
    {
        private readonly DataContext _context;

        public TaskCommentService(DataContext context)
        {
            _context = context;
        }

        public async Task<TaskComment> AddAsync(TaskComment comment)
        {
            await _context.TaskComments.AddAsync(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existingComment = await _context.TaskComments.FirstOrDefaultAsync(comment => comment.Id == id);

            if (existingComment != null)
            {
                _context.TaskComments.Remove(existingComment);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<TaskComment> GetByIdAsync(int id)
        {
            return await _context.TaskComments
                .FirstOrDefaultAsync(comment => comment.Id == id);
        }

        public async Task<IEnumerable<TaskComment>> GetByTaskAndUserAsync(int taskId, int userId)
        {
            return await _context.TaskComments
                .Where(comment => comment.TaskId == taskId &&
                    (comment.SenderId == userId || comment.ReceiverId == userId))
                .ToListAsync();
        }

        public async Task<TaskComment> UpdateAsync(TaskComment comment)
        {
            var existingComment = await _context.TaskComments
                            .FirstOrDefaultAsync(c => c.Id == comment.Id);

            if (existingComment == null)
                return null;

            existingComment.Message = comment.Message;
            await _context.SaveChangesAsync();

            return existingComment;
        }
    }
}
