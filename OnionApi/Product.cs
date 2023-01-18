using System.ComponentModel.DataAnnotations;

internal class Product
{
    public int Id { get; set; }
    [Key]
    public string? name { get; set; }
    public double price { get; set; }
    public int DeliveryTime {get; set; }
}
