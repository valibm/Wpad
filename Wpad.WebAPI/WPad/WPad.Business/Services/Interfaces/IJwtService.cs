using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Business.Services.Interfaces
{
    public interface IJwtService
    {
        public string GetToken(AppUser user, IList<string> roles);
    }
}
