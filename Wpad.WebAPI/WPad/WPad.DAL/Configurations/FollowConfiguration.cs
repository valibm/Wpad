using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WPad.Core.Entities;

namespace WPad.DAL.Configurations
{
    public class FollowConfiguration : IEntityTypeConfiguration<Follow>
    {
        public void Configure(EntityTypeBuilder<Follow> builder)
        {
            builder.HasKey(k => new { k.FollowerId, k.FolloweeId });

            builder.HasOne(u => u.Follower)
                   .WithMany(u => u.Followees)
                   .HasForeignKey(u => u.FollowerId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(u => u.Followee)
                   .WithMany(u => u.Followers)
                   .HasForeignKey(u => u.FolloweeId)
                   .OnDelete(DeleteBehavior.Restrict);

            //builder.HasOne(u => u.Followee).WithMany(u => u.Followees).HasForeignKey(u => u.FolloweeId);
        }
    }
}
