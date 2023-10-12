namespace Web.Models;

public class Author
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public List<Book> Books { get; set; }
}
