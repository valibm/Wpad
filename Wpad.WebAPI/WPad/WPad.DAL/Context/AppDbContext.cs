using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WPad.Core.Entities;
using WPad.DAL.Configurations;

namespace WPad.DAL.Context
{
    public class AppDbContext : IdentityDbContext<AppUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Heading> Headings { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reply> Replies { get; set; }
        public DbSet<Follow> Follows { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ChannelConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserConfiguration());
            modelBuilder.ApplyConfiguration(new HeadingConfiguration()); 
            modelBuilder.ApplyConfiguration(new CommentConfiguration());
            modelBuilder.ApplyConfiguration(new ReplyConfiguration());
            modelBuilder.ApplyConfiguration(new FollowConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }
    }
}
