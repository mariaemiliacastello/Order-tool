using Microsoft.EntityFrameworkCore;

class ClientDb : DbContext
{
    public ClientDb(DbContextOptions<ClientDb> options)
        : base(options) { }

    public DbSet<Client> Clients => Set<Client>();
}