using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UDT.Business.Interfaces;
using UDT.Model.Entities;
using UDT.Model.Enums;
using UDT.Repository;

namespace UDT.Business.Services
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IHashingHelper _hashingHelper;

        public UserService(DataContext context, IHashingHelper authorizationHelper)
        {
            _context = context;
            _hashingHelper = authorizationHelper;
        }

        public async Task<User> AddAsync(User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
            {
                return null;
            }

            user.Password = _hashingHelper.HashPassword(user.Password);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            User existingUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (existingUser != null)
            {
                _context.Users.Remove(existingUser);
                await _context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public IAsyncEnumerable<User> GetAllProfsAsync()
        {
            return _context.Users.Where(user => user.Role == UserRole.Teacher).AsAsyncEnumerable();
        }

        public async Task<User> GetByIDAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<User> UpdateAsync(User user)
        {
            User existingUser = await _context.Users
                .Include(u => u.Subjects)
                .FirstOrDefaultAsync(u => u.Id == user.Id);

            if (existingUser == null) return null;

            user.Password = existingUser.Password;
            _context.Entry(existingUser).CurrentValues.SetValues(user);

            existingUser.Subjects.Clear();
            user.Subjects.ForEach(userSubject =>
                existingUser.Subjects.Add(
                    _context.Subjects.FirstOrDefaultAsync(subject => subject.Id == userSubject.Id).Result
                )
            );

            await _context.SaveChangesAsync();

            return existingUser;
        }

        public async Task<User> getByIdWithSubject(int id)
        {
            return await _context.Users.Include(u => u.Subjects).FirstOrDefaultAsync(user => user.Id == id);
        }
    }
}