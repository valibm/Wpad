using System.Threading.Tasks;
using WPad.Core.Entities;

namespace WPad.Core.Interfaces
{
    public interface IMailService
    {
        Task SendEmail(string htmlTag, string userMail, string subject);
        Task EmailConfirmation(AppUser user);
    }
}
