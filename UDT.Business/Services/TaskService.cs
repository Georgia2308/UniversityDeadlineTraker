using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using UDT.Business.Task;
using UDT.Model.Mappers;
using UDT.Model.ViewModels;
using UDT.Repository;

namespace UDT.Business.Services
{
    public class ServiceTask : IServiceTask
    {
        private readonly DataContext _dbContext;

        public ServiceTask(DataContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Model.Entities.Task> AddTask(TaskCreationViewModel taskDto)
        {
            var task = TaskMappers.toEntity(taskDto);
            await _dbContext.Tasks.AddAsync(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public async System.Threading.Tasks.Task DeleteTask(int taskId)
        {
            var task = _dbContext.Tasks.Where(task => task.Id == taskId).Single();
            _dbContext.Tasks.Remove(task);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<UDT.Model.Entities.Task> EditTask(TaskUpdateViewModel taskDto)
        {
            var task = TaskMappers.toEntity(taskDto);
            _dbContext.Tasks.Update(task);
            await _dbContext.SaveChangesAsync();
            return task;
        }

        public IAsyncEnumerable<Model.Entities.Task> GetAll()
        {
            return _dbContext.Tasks.AsAsyncEnumerable();
        }

        public async Task<Model.Entities.Task> GetById(int taskId)
        {
            return await _dbContext.Tasks.FirstOrDefaultAsync(task => task.Id == taskId);
        }

        public IAsyncEnumerable<Model.Entities.Task> GetTaskFromGivenSubject(int subject)
        {
            return  _dbContext.Tasks.Where(task => task.SubjectId == subject).AsAsyncEnumerable();
        }
    }
}
