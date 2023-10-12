using Web.Data.Context;
using Web.Models;

namespace Web.Data;

public class Seed
{
    private readonly DataContext _context;

    public Seed(DataContext context)
    {
        _context = context;
    }

    public void SeedDataContext()
    {
        Author georgeOrwell = new Author() { Name = "George Orwell", Age = 47, };
        Author charlesDickens = new Author() { Name = "Charles Dickens", Age = 58, };
        Author franzKafka = new Author() { Name = "Franz Kafka", Age = 41, };
        if (!_context.Authors.Any())
        {
            List<Book> books = new List<Book>()
            {
                new Book()
                {
                    Name = "Animal Farm",
                    Price = 10.5m,
                    CreatedDate = new DateTime(1924, 2, 21),
                    Rating = 5,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Nineteen Eighty-Four",
                    Price = 20.55m,
                    CreatedDate = new DateTime(1947, 8, 3),
                    Rating = 3,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Burmese Days",
                    Price = 2.82m,
                    CreatedDate = new DateTime(1932, 10, 30),
                    Rating = 4,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "Homage to Catalonia",
                    Price = 34.21m,
                    CreatedDate = new DateTime(1938, 5, 18),
                    Rating = 4,
                    Author = georgeOrwell
                },
                new Book()
                {
                    Name = "The Pickwick Papers",
                    Price = 23.64m,
                    CreatedDate = new DateTime(1848, 1, 18),
                    Rating = 4,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "Oliver Twist",
                    Price = 12.14m,
                    CreatedDate = new DateTime(1837, 6, 23),
                    Rating = 2,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "Our Mutual Friend",
                    Price = 4.45m,
                    CreatedDate = new DateTime(1838, 1, 8),
                    Rating = 1,
                    Author = charlesDickens
                },
                new Book()
                {
                    Name = "The Trial",
                    Price = 9.92m,
                    Rating = 3,
                    CreatedDate = new DateTime(1911, 4, 7),
                    Author = franzKafka
                },
                new Book()
                {
                    Name = "Metamorphosis",
                    CreatedDate = new DateTime(1914, 8, 22),
                    Price = 9.80m,
                    Rating = 4,
                    Author = franzKafka
                },
            };
            _context.AddRange(books);
            _context.SaveChanges();
        }
    }
}
