using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WPad.Business.DTOs;
using WPad.Business.DTOs.User;

namespace WPad.Validators
{
    public class CommentCreateValidation : AbstractValidator<CommentCreateDto>
    {
        public CommentCreateValidation()
        {
            RuleFor(c => c.Content).NotNull().NotEmpty();
        }
    }
}
