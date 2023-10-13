using System.IO.Compression;
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

    public IQueryable<Book> GetValues()
    {
        return _context.Books.Include(b => b.Author).OrderBy(b => b.Id).AsQueryable();
    }

    public async Task<Book> GetValueAsync(int id)
    {
        return await _context.Books.Where(b => b.Id == id).FirstOrDefaultAsync();
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
