using FluentValidation;
using WPad.Business.DTOs.ReplyDtos;

namespace WPad.Validators.Reply
{
    public class ReplyCreateValidation : AbstractValidator<ReplyCreateDto>
    {
        public ReplyCreateValidation()
        {
            RuleFor(c => c.Content).NotNull().NotEmpty();
        }
    }
}
