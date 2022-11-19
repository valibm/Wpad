using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.DAL.Configurations
{
    public class HeadingConfiguration : IEntityTypeConfiguration<Heading>
    {
        public void Configure(EntityTypeBuilder<Heading> builder)
        {
            builder.Property(x => x.Title).IsRequired();
            builder.Property(x => x.ChannelId).IsRequired();
            builder.Property(x => x.AppUserId).IsRequired();
            builder.Property(x => x.CreatedDate).HasDefaultValueSql("GETDATE()");
            builder.Property(x => x.LikeCount).HasDefaultValue(0);
        }
    }
}
