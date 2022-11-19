using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs.Authentication;

namespace WPad.Business.Validators.Auth
{
    public class LoginValidation : AbstractValidator<LoginDto>
    {
        public LoginValidation()
        {
            //RuleFor(x => x.Email).NotEmpty().WithMessage("Email is required").EmailAddress().WithMessage("Email is wrong");

            RuleFor(u => u.Username).NotNull();

            RuleFor(u => u.Password).NotNull();
                //NotEmpty().WithMessage("Password is required");
        }
    }
}
