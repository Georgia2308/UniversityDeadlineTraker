using System.Collections.Generic;
using UDT.Model.ViewModels;
using System.Threading.Tasks;

namespace UDT.Business.Task
{
    public interface IServiceTask
    {
        public IAsyncEnumerable<UDT.Model.Entities.Task> GetAll();
        public Task<UDT.Model.Entities.Task> GetById(int taskId);
        public Task<UDT.Model.Entities.Task> AddTask(TaskCreationViewModel taskDto);
        public System.Threading.Tasks.Task DeleteTask(int taskId);
        public Task<UDT.Model.Entities.Task> EditTask(TaskUpdateViewModel taskDto);

        public IAsyncEnumerable<UDT.Model.Entities.Task> GetTaskFromGivenSubject(int subject);
    }
}
