using System.Collections.Generic;
using System.Threading.Tasks;
using UDT.Model.Entities;

namespace UDT.Business.Interfaces
{
    public interface IUserService
    {
        Task<User> GetByIDAsync(int id);

        Task<IEnumerable<User>> GetAllAsync();

        IAsyncEnumerable<User> GetAllProfsAsync();

        Task<User> AddAsync(User user);

        Task<bool> DeleteAsync(int id);

        Task<User> UpdateAsync(User user);

        Task<User> getByIdWithSubject(int id);

    }
}
