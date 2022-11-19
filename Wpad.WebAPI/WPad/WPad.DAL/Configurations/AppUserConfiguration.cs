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
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.Property(u => u.RegisterDate).HasDefaultValueSql("GETDATE()");
            builder.Property(u => u.Firstname).HasMaxLength(128);
            builder.Property(u => u.Lastname).HasMaxLength(128);
            builder.Property(u => u.Bio).HasMaxLength(255);
        }
    }
}
