using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WPad.Core.Entities;

namespace WPad.DAL.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.Property(c => c.Content).IsRequired();
            builder.Property(c => c.CreatedDate).HasDefaultValueSql("GETDATE()");
        }
    }
}
