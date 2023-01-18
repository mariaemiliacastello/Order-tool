using Microsoft.EntityFrameworkCore;
var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<OrderDb>(opt => opt.UseInMemoryDatabase("OrderList"));
builder.Services.AddDbContext<ProductDb>(opt => opt.UseInMemoryDatabase("ProductList"));
builder.Services.AddDbContext<ClientDb>(opt => opt.UseInMemoryDatabase("ClientList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200",
                          "localhost:5249").AllowAnyHeader()
                                                  .AllowAnyMethod();;
                      });
});
var app = builder.Build();

app.MapGet("/orders", async (OrderDb db) =>
    await db.Orders.ToListAsync());

app.MapGet("/products", async (ProductDb db) =>
    await db.Products.ToListAsync());

app.MapGet("/products/name/{name}", async (string name, ProductDb db) =>
    await db.Products.Where(t => t.name == name).ToListAsync());

app.MapGet("/clients", async (ClientDb db) =>
    await db.Clients.ToListAsync());

app.MapGet("/orders/{id}", async (int id, OrderDb db) =>
    await db.Orders.FindAsync(id)
        is Order order
            ? Results.Ok(order)
            : Results.NotFound());
app.MapGet("/orders/cpforcnpj/{cpforcnpj}", async (string cpforcnpj, OrderDb db) =>
    await db.Orders.Where(t => t.cpforcnpj == cpforcnpj).ToListAsync());

app.MapGet("/orders/products/{product}", async (string product, OrderDb db) =>
    await db.Orders.Where(t => t.product == product).ToListAsync());

app.MapGet("/products/{id}", async (int id, ProductDb db) =>
    await db.Products.FindAsync(id)
        is Product product
            ? Results.Ok(product)
            : Results.NotFound());

app.MapGet("/clients/{id}", async (int id, ClientDb db) =>
    await db.Clients.FindAsync(id)
        is Client client
            ? Results.Ok(client)
            : Results.NotFound());

app.MapPost("/orders", async (Order order, OrderDb db) =>
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();

    return Results.Created($"/orders/{order.Id}", order);
});

app.MapPost("/products", async (Product product, ProductDb db) =>
{
    db.Products.Add(product);
    await db.SaveChangesAsync();

    return Results.Created($"/products/{product.Id}", product);
});

app.MapPost("/clients", async (Client client, ClientDb db) =>
{
    db.Clients.Add(client);
    await db.SaveChangesAsync();

    return Results.Created($"/clients/{client.Id}", client);
});

app.MapPut("/orders/{id}", async (int id, Order inputOrder, OrderDb db) =>
{
    var order = await db.Orders.FindAsync(id);

    if (order is null) return Results.NotFound();

    order.name = inputOrder.name;
    order.cpforcnpj = inputOrder.cpforcnpj;
    order.CEP = inputOrder.CEP;
    order.product = inputOrder.product;
    order.orderNumber = inputOrder.orderNumber;
    order.orderDate = inputOrder.orderDate;
    order.price = inputOrder.price;
    order.deliveryDate = inputOrder.deliveryDate;
    order.deliveryFee = inputOrder.deliveryFee;
    order.pricewithoutdiscount = inputOrder.pricewithoutdiscount;
    order.finalPrice = inputOrder.finalPrice;
    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapPut("/products/{id}", async (int id, Product inputProduct, ProductDb db) =>
{
    var product = await db.Products.FindAsync(id);

    if (product is null) return Results.NotFound();

    product.name = inputProduct.name;
    product.price = inputProduct.price;
    product.DeliveryTime = inputProduct.DeliveryTime;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapPut("/clients/{id}", async (int id, Client inputClient, ClientDb db) =>
{
    var client = await db.Clients.FindAsync(id);

    if (client is null) return Results.NotFound();

    client.Name = inputClient.Name;
    client.cpforCnpj = inputClient.cpforCnpj;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("/orders/{id}", async (int id, OrderDb db) =>
{
    if (await db.Orders.FindAsync(id) is Order order)
    {
        db.Orders.Remove(order);
        await db.SaveChangesAsync();
        return Results.Ok(order);
    }

    return Results.NotFound();
});

app.MapDelete("/products/{id}", async (int id, ProductDb db) =>
{
    if (await db.Products.FindAsync(id) is Product product)
    {
        db.Products.Remove(product);
        await db.SaveChangesAsync();
        return Results.Ok(product);
    }

    return Results.NotFound();
});

app.MapDelete("/clients/{id}", async (int id, ClientDb db) =>
{
    if (await db.Clients.FindAsync(id) is Client client)
    {
        db.Clients.Remove(client);
        await db.SaveChangesAsync();
        return Results.Ok(client);
    }

    return Results.NotFound();
});

app.UseCors(MyAllowSpecificOrigins);

app.Run();