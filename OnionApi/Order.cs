using System.ComponentModel.DataAnnotations;

internal class Order
{
    public int Id { get; set; }
    public string? cpforcnpj { get; set; }
    public string? name { get; set; }
    public string? CEP { get; set; }
    public string? product { get; set; }
    [Key]
    public int orderNumber { get; set; }
    public string? orderDate { get; set; }
    public double price { get; set; }
    public string? deliveryDate { get; set; }
    public double deliveryFee { get; set; }
    public double pricewithoutdiscount { get; set; }
    public double finalPrice { get; set; }
}
