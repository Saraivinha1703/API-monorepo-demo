namespace Web.Models;

public class Book
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedDate { get; set; }
    public Author Author { get; set; }
}
