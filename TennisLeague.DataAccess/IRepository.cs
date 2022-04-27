using TennisLeague.Data;

namespace TennisLeague.DataAccess
{
    public interface IRepository<T> where T : class, IEntity
    {
        Task<IEnumerable<T>> GetAll();
        Task<T?> GetById(int id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<T?> Delete(int id);
    }
}
