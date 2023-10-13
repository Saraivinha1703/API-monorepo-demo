using Microsoft.EntityFrameworkCore;
using Web.Data.Context;
using Web.Interfaces;
using Web.Models;

namespace Web.Data.Repositories;

public class AuthorRepository : IAuthorRepository
{
    private readonly DataContext _context;

    public AuthorRepository(DataContext context)
    {
        _context = context;
    }

    public IQueryable<Author> GetValues()
    {
        return _context.Authors.OrderBy(a => a.Id).AsQueryable();
    }

    public async Task<Author> GetValueAsync(int id)
    {
        return await _context.Authors.Where(a => a.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> CreateAsync(Author obj)
    {
        _context.Authors.Add(obj);
        return await SaveAsync();
    }

    public async Task<bool> UpdateAsync(Author obj)
    {
        _context.Authors.Update(obj);
        return await SaveAsync();
    }

    public async Task<bool> DeleteAsync(Author obj)
    {
        _context.Authors.Remove(obj);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
