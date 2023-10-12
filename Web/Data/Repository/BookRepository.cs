using Microsoft.EntityFrameworkCore;
using Web.Data.Context;
using Web.Interfaces;
using Web.Models;

namespace Web.Data.Repositories;

public class BookRepository : IBookRepository
{
    private readonly DataContext _context;

    public BookRepository(DataContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Book>> GetValuesAsync()
    {
        return await _context.Books.OrderBy(a => a.Id).ToListAsync();
    }

    public async Task<Book> GetValueAsync(int id)
    {
        return await _context.Books.Where(a => a.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> CreateAsync(Book obj)
    {
        _context.Books.Add(obj);
        return await SaveAsync();
    }

    public async Task<bool> UpdateAsync(Book obj)
    {
        _context.Books.Update(obj);
        return await SaveAsync();
    }

    public async Task<bool> DeleteAsync(Book obj)
    {
        _context.Books.Remove(obj);
        return await SaveAsync();
    }

    public async Task<bool> SaveAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
