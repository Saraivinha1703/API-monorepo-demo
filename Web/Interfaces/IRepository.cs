namespace Web.Interfaces;

public interface IRepository<T>
    where T : class
{
    IQueryable<T> GetValues();
    Task<T> GetValueAsync(int id);
    Task<bool> CreateAsync(T obj);
    Task<bool> UpdateAsync(T obj);
    Task<bool> DeleteAsync(T obj);
    Task<bool> SaveAsync();
}
