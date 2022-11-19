using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;
using WPad.Core.Interfaces;
using WPad.DAL.Context;

namespace WPad.DAL.Implementations
{
    public class UserRepository : Repository<AppUser>, IUserRepository
    {
        private AppDbContext _context { get; }
        public UserRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}
