using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Base;
using WPad.Core.Entities;

namespace WPad.DAL.Configurations
{
    public class ReplyConfiguration : IEntityTypeConfiguration<Reply>
    {
        public void Configure(EntityTypeBuilder<Reply> builder)
        {
            builder.Property(r => r.Content).IsRequired();
            builder.Property(c => c.CreatedDate).HasDefaultValueSql("GETDATE()");
        }
    }
}
