using FluentValidation;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;
using WPad.Business.DTOs.User;
using WPad.Core.Entities;

namespace WPad.Validators.User
{
    public class UserDetailsValidations : AbstractValidator<UserDetailsDto>
    {
        public UserDetailsValidations()
        {
            RuleFor(x => x.Firstname).NotNull().NotEmpty().MaximumLength(30).MinimumLength(3);
            RuleFor(x => x.Lastname).NotNull().NotEmpty().MaximumLength(30).MinimumLength(3);
            RuleFor(x => x.Gender).NotNull().NotEmpty();
            RuleFor(x => x.FacebookLink).Must(LinkMustBeAUri).WithMessage("Facebook link must be a valid URI.");
            RuleFor(x => x.TwitterLink).Must(LinkMustBeAUri).WithMessage("Twitter link must be a valid URI.");
            RuleFor(x => x.InstagramLink).Must(LinkMustBeAUri).WithMessage("Instagram link must be a valid URI.");
        }

        private static bool LinkMustBeAUri(string link)
        {
            if (string.IsNullOrWhiteSpace(link))
            {
                return true;
            }
            if (Uri.TryCreate(link, UriKind.Absolute, out Uri outUri)
                   && (outUri.Scheme == Uri.UriSchemeHttp || outUri.Scheme == Uri.UriSchemeHttps))
            {
                return true;
            }

            return false;
        }
    }
}
