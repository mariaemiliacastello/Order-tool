using System.ComponentModel.DataAnnotations;

internal class Client
{
    public int Id { get; set; }
    [Key]
    public string? cpforCnpj { get; set; }
    public string? Name { get; set; }
}
