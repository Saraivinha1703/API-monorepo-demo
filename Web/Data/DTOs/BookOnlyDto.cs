using Web.Models;

namespace Web.Data.Dto;

public class BookOnlyDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedDate { get; set; }
}
