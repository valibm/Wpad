using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WPad.Business.DTOs.Authentication;

namespace WPad.Business.Validators.Auth
{
    public class RegisterValidation : AbstractValidator<RegisterDto>
    {
        public RegisterValidation()
        {
            RuleFor(u => u.Firstname).NotNull()
                                     .NotEmpty()
                                     .WithMessage("Firstname is required");

            RuleFor(u => u.Lastname).NotNull()
                                    .NotEmpty()
                                    .WithMessage("Lastname is required");

            RuleFor(u => u.Username).NotNull()
                                    .NotEmpty()
                                    .WithMessage("Username is required");

            RuleFor(u => u.Password).NotNull()
                                    .NotEmpty()
                                    .WithMessage("Password is required");

            RuleFor(u => u.ConfirmPassword).Equal(u => u.Password)
                                           .WithMessage("Passwords do not match");

            RuleFor(u => u.Birthday).NotNull()  
                                    .NotEmpty()
                                    .WithMessage("Birth date is required")
                                    .Must(ValidAge)
                                    .WithMessage("Date of birth is not valid");

            RuleFor(x => x.Email).NotEmpty()
                                 .WithMessage("Email is required")
                                 .EmailAddress()
                                 .WithMessage("Email is invalid");
        }

        protected bool ValidAge(DateTime date)
        {
            int currentYear = DateTime.Now.Year;
            int dobYear = date.Year;

            if (dobYear <= (currentYear-13) && dobYear > (currentYear - 110))
            {
                return true;
            }

            return false;
        }
    }
}
