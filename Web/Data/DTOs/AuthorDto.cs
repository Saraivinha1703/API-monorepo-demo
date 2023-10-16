namespace Web.Data.Dto;

public class AuthorDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public virtual List<BookOnlyDto> Books { get; set; }
}
